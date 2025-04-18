// src/app/register/page.tsx

import AuthLayout from "@/components/auth/AuthLayout";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import AuthDivider from "@/components/auth/AuthDivider";
import PublicRoute from "@/components/auth/PublicRoute";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <PublicRoute>
            <AuthLayout
                title="Crear una cuenta"
                subtitle="Únete a nuestra comunidad de desarrolladores de Swift"
            >
                <SocialLoginButtons />
                <AuthDivider text="o regístrate con email" />
                <RegisterForm />
                <p className="text-center text-white/60 mt-6">
                    ¿Ya tienes una cuenta?{" "}
                    <a
                        href="/login"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        Inicia sesión aquí
                    </a>
                </p>
            </AuthLayout>
        </PublicRoute>
    );
}
