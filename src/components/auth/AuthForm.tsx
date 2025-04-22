// src/components/auth/AuthForm.tsx

import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import RecoverForm from "@/components/auth/RecoverForm";

interface AuthFormProps {
    activePage: "login" | "register" | "recover";
}

export default function AuthForm({ activePage }: AuthFormProps) {
    return (
        <>
            {activePage === "login" && <LoginForm />}

            {activePage === "register" && <RegisterForm />}

            {activePage === "recover" && <RecoverForm />}
        </>
    );
}
