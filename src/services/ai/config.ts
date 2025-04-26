// src/services/ai/config.ts

"use server";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { defaultConfig } from "./openaiConfig";

export async function getAppConfig() {
    try {
        const configDoc = await getDoc(doc(db, "config", "app"));

        if (configDoc.exists()) {
            const firebaseConfig = configDoc.data();

            return {
                openai: {
                    ...defaultConfig.openai,
                    ...(firebaseConfig.openai || {}),
                },
            };
        }

        return defaultConfig;
    } catch (error) {
        console.error("Error al obtener la configuración:", error);
        return defaultConfig;
    }
}

export async function getOpenAIConfig() {
    "use server";

    const config = await getAppConfig();
    return config.openai;
}
