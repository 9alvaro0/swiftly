// src/app/login/page.tsx

import AuthDivider from "@/components/auth/AuthDivider";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import Link from "next/link";

export default function LoginPage() {
    return (
        <AuthLayout
            title="Iniciar sesión"
            subtitle="Accede a tu cuenta para continuar aprendiendo"
        >
            <SocialLoginButtons />
            <AuthDivider text="o continúa con email" />
            <LoginForm />
            <p className="text-center text-white/60 mt-6">
                ¿No tienes una cuenta?{" "}
                <Link
                    href="/register"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                    Regístrate aquí
                </Link>
            </p>
        </AuthLayout>
    );
}
