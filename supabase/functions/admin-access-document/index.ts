
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize service role client for admin operations
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get auth token from request
    const authHeader = req.headers.get('Authorization');
    console.log("Auth header received:", authHeader ? "Present" : "Missing");
    
    if (!authHeader) {
      console.error("No authorization header provided");
      return new Response(
        JSON.stringify({ error: 'No authorization header provided' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    console.log("User token length:", token.length);
    
    // Create an authenticated client with the user's JWT
    const userClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    
    try {
      // Verify the JWT token
      const { data: { user }, error: userError } = await userClient.auth.getUser(token);
      
      if (userError || !user) {
        console.error("Error getting user:", userError);
        return new Response(
          JSON.stringify({ error: 'Unauthorized: Invalid user token', details: userError?.message }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      console.log("User authenticated:", user.email);
      
      // Check if user is admin using the service role client
      const { data: adminData, error: adminError } = await adminClient
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (adminError) {
        console.error("Error checking admin status:", adminError);
        return new Response(
          JSON.stringify({ error: 'Error checking admin status', details: adminError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (!adminData) {
        console.error("User is not an admin:", user.email);
        return new Response(
          JSON.stringify({ error: 'Unauthorized: Not an admin' }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      console.log("Admin status confirmed for user:", user.email);
      
      // Get the document path from request body
      let requestBody;
      try {
        requestBody = await req.json();
      } catch (error) {
        console.error("Error parsing request body:", error);
        return new Response(
          JSON.stringify({ error: 'Invalid request body' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const { documentPath } = requestBody;
      if (!documentPath) {
        console.error("No document path provided in request");
        return new Response(
          JSON.stringify({ error: 'No document path provided' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log("Document path requested:", documentPath);

      // Parse the document path to identify bucket and path
      const pathParts = documentPath.split('/');
      let bucketName = 'verification-documents';
      let filePath = documentPath;
      
      // If the path includes the bucket name as a prefix, remove it
      if (documentPath.startsWith('verification-documents/')) {
        filePath = documentPath.substring('verification-documents/'.length);
      }

      console.log(`Admin accessing document - Bucket: ${bucketName}, Path: ${filePath}`);

      // Use service role client to bypass RLS and generate signed URL
      const { data: signedUrlData, error: urlError } = await adminClient
        .storage
        .from(bucketName)
        .createSignedUrl(filePath, 1800); // 30 minutes expiration
      
      if (urlError) {
        console.error("Error generating signed URL:", urlError);
        return new Response(
          JSON.stringify({ error: `Failed to generate URL: ${urlError.message}` }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (!signedUrlData || !signedUrlData.signedUrl) {
        console.error("No signed URL generated");
        return new Response(
          JSON.stringify({ error: "No signed URL could be generated" }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log("Successfully generated signed URL");
      
      // Return the signed URL
      return new Response(
        JSON.stringify({ signedUrl: signedUrlData.signedUrl }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (error: any) {
      console.error("Unhandled error in admin-access-document function:", error);
      return new Response(
        JSON.stringify({ error: `Internal server error: ${error.message}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error: any) {
    console.error("Critical error:", error);
    return new Response(
      JSON.stringify({ error: `Server error: ${error.message}` }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
