
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the request body
    const body = await req.json()
    const { 
      sessionId,
      userId,
      funnelStep,
      deviceType,
      trafficSource,
      ipAddress,
      userAgent,
      timeSpentSeconds,
      referrer
    } = body

    console.log(`Tracking funnel event: ${funnelStep} for session ${sessionId}`);
    console.log('Event details:', { deviceType, trafficSource, userId });
    console.log('Traffic source details:', { trafficSource, referrer });

    // Validate required fields
    if (!sessionId || !funnelStep || !deviceType || !trafficSource) {
      console.error('Missing required fields', { sessionId, funnelStep, deviceType, trafficSource });
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Insert the funnel event
    const { data, error } = await supabaseClient
      .from('user_funnel_events')
      .insert({
        session_id: sessionId,
        user_id: userId || null,
        funnel_step: funnelStep,
        device_type: deviceType,
        traffic_source: trafficSource,
        ip_address: ipAddress,
        user_agent: userAgent,
        time_spent_seconds: timeSpentSeconds,
        referrer: referrer || null
      })
      .select()

    if (error) {
      console.error('Error tracking funnel event:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Successfully tracked funnel event', data);
    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
