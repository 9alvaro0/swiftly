// src/services/ai/openai.ts

"use server";

import OpenAI from "openai";
import { getOpenAIConfig } from "../config";

/**
 * Interfaz para las solicitudes a OpenAI
 */
export interface OpenAIRequest {
    prompt: string;
    systemPrompt: string;
}

/**
 * Obtiene una instancia del cliente OpenAI con la configuración
 * @returns Cliente de OpenAI configurado
 * @throws Error si no se encuentra una clave API válida
 */
async function getOpenAIClient(): Promise<OpenAI> {
    const config = await getOpenAIConfig();

    if (!config.apiKey) {
        throw new Error("No se encontró una clave API de OpenAI");
    }

    return new OpenAI({
        apiKey: config.apiKey,
    });
}

/**
 * Genera una completación de texto usando OpenAI
 * @param request La solicitud con el prompt principal y de sistema
 * @returns El texto de respuesta generado
 */
export async function generateCompletion(request: OpenAIRequest): Promise<string> {
    try {
        const client = await getOpenAIClient();
        const config = await getOpenAIConfig();

        const completion = await client.chat.completions.create({
            model: config.model,
            messages: [
                {
                    role: "system",
                    content: request.systemPrompt,
                },
                {
                    role: "user",
                    content: request.prompt,
                },
            ],
            max_tokens: config.maxTokens,
            temperature: config.temperature,
        });

        return completion.choices[0]?.message?.content || "";
    } catch (error) {
        console.error("[OpenAI Service] Error generando completado:", error);
        throw new Error(
            `Error al generar la respuesta: ${error instanceof Error ? error.message : "Error desconocido"}`
        );
    }
}

/**
 * Genera una respuesta en formato JSON usando OpenAI
 * @param request La solicitud con el prompt principal y de sistema
 * @returns El objeto JSON parseado del tipo especificado
 * @throws Error si hay problemas con la generación o el parseo del JSON
 */
export async function generateJSON<T>(request: OpenAIRequest): Promise<T> {
    try {
        // Mejoramos los prompts para asegurar respuestas JSON válidas
        const jsonPrompt = `${request.prompt}\n\nResponde SOLO con un objeto JSON válido sin explicaciones adicionales.`;
        const systemPrompt = `${request.systemPrompt} Debes responder únicamente con un objeto JSON válido y bien formateado.`;

        const response = await generateCompletion({
            prompt: jsonPrompt,
            systemPrompt: systemPrompt,
        });

        try {
            return JSON.parse(response.trim()) as T;
        } catch (parseError) {
            console.error("[OpenAI Service] Error parseando JSON:", parseError);

            // Intento de recuperación: buscar un objeto JSON en la respuesta
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                try {
                    return JSON.parse(jsonMatch[0]) as T;
                } catch {
                    throw new Error("No se pudo extraer un JSON válido de la respuesta");
                }
            }

            throw new Error("No se pudo parsear la respuesta como JSON");
        }
    } catch (error) {
        console.error("[OpenAI Service] Error generando JSON:", error);
        throw new Error(
            `Error al generar respuesta JSON: ${error instanceof Error ? error.message : "Error desconocido"}`
        );
    }
}
