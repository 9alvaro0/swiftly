// src/components/auth/SocialLoginButtons.tsx

import { Github, Mail, AppleIcon } from "lucide-react";

export default function SocialLoginButtons() {
    return (
        <div className="space-y-3">
            <button
                type="button"
                className="flex items-center justify-center w-full py-3 px-4 border border-white/10 rounded-lg text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
                <Mail className="h-5 w-5 mr-2" />
                Continuar con Google
            </button>

            <button
                type="button"
                className="flex items-center justify-center w-full py-3 px-4 border border-white/10 rounded-lg text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
                <Github className="h-5 w-5 mr-2" />
                Continuar con GitHub
            </button>

            <button
                type="button"
                className="flex items-center justify-center w-full py-3 px-4 border border-white/10 rounded-lg text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
                <AppleIcon className="h-5 w-5 mr-2" />
                Continuar con Apple
            </button>
        </div>
    );
}
