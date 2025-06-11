
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

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
    const { insightsData } = await req.json()
    
    // Initialize Hugging Face Inference with the access token
    const hf = new HfInference(Deno.env.get('HUGGINGFACE_ACCESS_TOKEN'))
    
    // Prepare the prompt with the insights data
    const prompt = `
      Analyze the following e-commerce device leasing platform data and provide detailed business intelligence insights.
      
      You must ONLY analyze this specific data - do not reference any external data or make up information.
      
      ## Platform Data:
      
      ### Product Preferences:
      - Device Tier Distribution: ${insightsData.highEndRate.toFixed(1)}% high-end devices, mid-range and budget devices make up the rest
      - Most popular device tier: ${insightsData.deviceTiers[0]?.name || 'N/A'} (${insightsData.deviceTiers[0]?.percentage.toFixed(1) || 0}%)
      - Condition Preferences: ${insightsData.refurbishedRate.toFixed(1)}% chose refurbished devices
      - Most popular condition: ${insightsData.conditions[0]?.name || 'N/A'} (${insightsData.conditions[0]?.percentage.toFixed(1) || 0}%)
      - Brand Preferences: Top brand is ${insightsData.brands[0]?.name || 'N/A'} at ${insightsData.brands[0]?.percentage.toFixed(1) || 0}%
      - Product Type Distribution: Most ordered type is ${insightsData.productTypes[0]?.name || 'N/A'} (${insightsData.productTypes[0]?.percentage.toFixed(1) || 0}%)
      - Device Category Distribution: ${insightsData.deviceCategories.map(cat => `${cat.name}: ${cat.percentage.toFixed(1)}%`).join(', ')}
      
      ### Customer Behavior:
      - Protection Plan Adoption: ${insightsData.protectionPlanRate.toFixed(1)}% of orders include protection plans
      - Business vs Consumer: ${insightsData.businessVsConsumer[0]?.name === "Business" ? 
        insightsData.businessVsConsumer[0]?.percentage.toFixed(1) : 
        insightsData.businessVsConsumer[1]?.percentage.toFixed(1) || 0}% are business customers
      - Lease Term Preferences: Most popular term is "${insightsData.leaseTermPreference[0]?.name || 'N/A'}" (${insightsData.leaseTermPreference[0]?.percentage.toFixed(1) || 0}%)
      - Average Order Value: SAR ${insightsData.avgOrderValue.toFixed(2)}
      - Total Orders: ${insightsData.totalOrderCount}
      
      ## Analysis Instructions:
      
      1. Create a comprehensive business intelligence report that analyzes ONLY this data
      2. Format your output in proper Markdown with clear sections, bullet points, and bold text for emphasis
      3. Include the following sections:
         - Executive Summary (brief overview of key findings)
         - Key Behavioral Patterns (analyze customer preferences and trends)
         - Product Performance Analysis (which products/configurations are performing well)
         - Customer Segmentation Insights (business vs consumer, spending patterns)
         - Strategic Recommendations (3-5 specific, actionable recommendations)
      
      4. Make sure your analysis is logical, specific to this data, and provides actual business value
      5. DO NOT include the prompt in your response
      6. DO NOT make up data that isn't present in the information provided
      7. DO NOT include generic statements that could apply to any business
      8. DO NOT use placeholder text like "Recommendation: Consider offering X"
      9. USE proper markdown formatting for all sections, bullet points and bold text
    `
    
    // Use text generation to analyze the insights
    const response = await hf.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      inputs: prompt,
      parameters: {
        max_new_tokens: 1000,
        temperature: 0.3,
        top_p: 0.95,
      }
    })
    
    // Extract only the generated content, strip any prompt remnants
    let recommendations = response.generated_text.trim()
    
    // Clean up the response to ensure we're not showing the prompt
    if (recommendations.includes('Executive Summary')) {
      // Find the first section header and only keep from that point onwards
      recommendations = recommendations.substring(recommendations.indexOf('Executive Summary'))
    } else if (recommendations.includes('#')) {
      // Find the first markdown header and only keep from that point onwards
      const firstHeaderIndex = recommendations.indexOf('#')
      recommendations = recommendations.substring(firstHeaderIndex)
    }
    
    // Extract a title from the response or generate one
    let title = "E-Commerce Device Leasing Insights"
    
    // Try to find a title in the first few lines
    const lines = recommendations.split('\n')
    for (let i = 0; i < Math.min(5, lines.length); i++) {
      const line = lines[i].trim()
      if (line.startsWith('# ') || line.startsWith('## ')) {
        title = line.replace(/^#+ /, '')
        break
      }
    }
    
    return new Response(
      JSON.stringify({ 
        recommendations,
        title,
        date: new Date().toISOString()  
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'An error occurred while analyzing insights', 
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 500 
      }
    )
  }
})
