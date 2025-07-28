import { Cookie } from "lucide-react";

export default function WhatWeStoreSection() {
    return (
        <section>
            <div className="flex items-center gap-3 mb-4">
                <Cookie className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-semibold text-white">¿Qué almacenamos?</h2>
            </div>
            <p className="mb-4">
                En aprendeSwift utilizamos principalmente <strong>localStorage</strong> en lugar de cookies tradicionales. 
                Esto significa que tus datos se almacenan de forma segura en tu navegador y no se envían 
                automáticamente en cada petición al servidor.
            </p>
        </section>
    );
}