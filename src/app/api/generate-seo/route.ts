// src/app/api/generate-seo/route.ts

"use server";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SEORequest } from "@/types/SEO";
import { generateSEO } from "./seoServer";

export async function POST(request: NextRequest) {
    try {
        const postData: SEORequest = await request.json();
        const seoData = await generateSEO(postData);
        return NextResponse.json(seoData);
    } catch (error) {
        console.error("[/api/generate-seo] Error general:", error);
        return NextResponse.json({ error: "Error al generar SEO" }, { status: 500 });
    }
}
