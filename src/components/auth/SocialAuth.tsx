// src/components/auth/SocialAuth.tsx

import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import AuthDivider from "@/components/auth/AuthDivider";

export default function SocialAuth() {
    return (
        <>
            <SocialLoginButtons />
            <AuthDivider text="o continúa con email" />
        </>
    );
}
