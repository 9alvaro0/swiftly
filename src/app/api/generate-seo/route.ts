// src/app/api/generate-seo/route.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { verifyAdminToken, AuthError } from "@/lib/auth";
import { generateSEO } from "./seoServer";

const seoRequestSchema = z.object({
    title: z.string().min(1).max(500),
    content: z.string().min(1).max(50000),
    type: z.string().min(1).max(50),
    tags: z.array(z.string()).max(20).optional(),
    level: z.string().max(50).optional(),
});

export async function POST(request: NextRequest) {
    try {
        await verifyAdminToken();

        const body = await request.json();
        const parseResult = seoRequestSchema.safeParse(body);

        if (!parseResult.success) {
            return NextResponse.json(
                { error: "Invalid request data", details: parseResult.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const seoData = await generateSEO(parseResult.data);
        return NextResponse.json(seoData);
    } catch (error) {
        if (error instanceof AuthError) {
            return NextResponse.json({ error: error.message }, { status: error.statusCode });
        }
        console.error("[/api/generate-seo] Error general:", error);
        return NextResponse.json({ error: "Error al generar SEO" }, { status: 500 });
    }
}
