// src/services/ai/openaiConfig.ts

export const defaultConfig = {
    openai: {
        apiKey: process.env.OPENAI_API_KEY || "",
        model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
        temperature: Number(process.env.OPENAI_TEMPERATURE) || 0.7,
        maxTokens: Number(process.env.OPENAI_MAX_TOKENS) || 500,
    },
};
