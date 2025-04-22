// src/components/auth/AuthFooter.tsx

interface AuthFooterProps {
    activePage: "login" | "register" | "recover";
    setActivePage: (page: "login" | "register" | "recover") => void;
}

export default function AuthFooter({ activePage, setActivePage }: AuthFooterProps) {
    return (
        <div className="mt-6 text-center">
            {activePage === "login" && (
                <>
                    <p className="text-white/60">
                        ¿No tienes una cuenta?{" "}
                        <button
                            onClick={() => setActivePage("register")}
                            className="text-blue-400 hover:text-blue-300 cursor-pointer"
                        >
                            Regístrate aquí
                        </button>
                    </p>
                    <p className="text-white/60">
                        ¿Olvidaste tu contraseña?{" "}
                        <button
                            onClick={() => setActivePage("recover")}
                            className="text-blue-400 hover:text-blue-300 cursor-pointer"
                        >
                            Recuperar contraseña
                        </button>
                    </p>
                </>
            )}

            {activePage === "register" && (
                <p className="text-white/60">
                    ¿Ya tienes una cuenta?{" "}
                    <button
                        onClick={() => setActivePage("login")}
                        className="text-blue-400 hover:text-blue-300 cursor-pointer"
                    >
                        Inicia sesión aquí
                    </button>
                </p>
            )}

            {activePage === "recover" && (
                <p className="text-white/60">
                    <button
                        onClick={() => setActivePage("login")}
                        className="text-blue-400 hover:text-blue-300 cursor-pointer"
                    >
                        Regresar al login
                    </button>
                </p>
            )}
        </div>
    );
}
