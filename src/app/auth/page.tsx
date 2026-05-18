// src/app/auth/page.tsx

"use client";

import { useState } from "react";
import AuthForm from "@/components/auth/AuthForm";
import AuthFooter from "@/components/auth/AuthFooter";
import SocialAuth from "@/components/auth/SocialAuth";

export default function AuthPage() {
    const [activePage, setActivePage] = useState<"login" | "register" | "recover">("login");

    return (
        <div className="p-6 rounded-xl">
            <SocialAuth />
            <AuthForm
                activePage={activePage}
            />
            <AuthFooter
                activePage={activePage}
                setActivePage={setActivePage}
            />
        </div>
    );
}
