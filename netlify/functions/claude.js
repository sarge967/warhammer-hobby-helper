// Netlify Function — proxies to OpenRouter API (free tier, no credit card needed)
// 1. Create a free account at https://openrouter.ai
// 2. Go to https://openrouter.ai/keys and click "Create Key"
// 3. Copy the key (starts with sk-or-...)
// 4. In Netlify: Site configuration → Environment variables
//    Add: OPENROUTER_API_KEY = your key
// 5. Redeploy

exports.handler = async function(event) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const apiKey = (process.env.OPENROUTER_API_KEY || "").trim();
  if (!apiKey) {
    return {
      statusCode: 500, headers,
      body: JSON.stringify({ error: "OPENROUTER_API_KEY not set. Create a free account at openrouter.ai, get a key from openrouter.ai/keys, add it in Netlify → Site configuration → Environment variables, then redeploy." })
    };
  }

  try {
    const { systemPrompt, userMessage } = JSON.parse(event.body);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://warhammer-hobby-helper.netlify.app",
        "X-Title": "Warhammer Hobby Helper",
      },
      body: JSON.stringify({
        // meta-llama/llama-3.1-8b-instruct:free — genuinely free, no credits needed
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user",   content: userMessage  },
        ],
        max_tokens: 1000,
        temperature: 0.3,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const msg = data.error?.message || JSON.stringify(data);
      return {
        statusCode: 500, headers,
        body: JSON.stringify({ error: `OpenRouter error (HTTP ${response.status}): ${msg}` })
      };
    }

    const text = data.choices?.[0]?.message?.content || "";
    if (!text) {
      return {
        statusCode: 500, headers,
        body: JSON.stringify({ error: "Empty response from AI. Please try again." })
      };
    }

    return {
      statusCode: 200, headers,
      body: JSON.stringify({ text })
    };

  } catch (err) {
    return {
      statusCode: 500, headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
