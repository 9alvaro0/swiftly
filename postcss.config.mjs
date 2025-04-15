const config = {
    plugins: ["@tailwindcss/postcss"],
    theme: {
        extend: {
            colors: {
                primary: "var(--color-primary)",
                "primary-dark": "var(--color-primary-dark)",
                "primary-light": "var(--color-primary-light)",
                secondary: "var(--color-secondary)",
                "secondary-dark": "var(--color-secondary-dark)",
                "secondary-light": "var(--color-secondary-light)",
                success: "var(--color-success)",
                warning: "var(--color-warning)",
                error: "var(--color-error)",
                info: "var(--color-info)",
                surface: "var(--color-surface)",
                card: "var(--color-card)",
                background: "var(--color-background)",
                // Apple-inspired grays
                "apple-gray": {
                    50: "#f5f5f7",
                    100: "#ebebed",
                    200: "#d2d2d7",
                    300: "#bcbcc0",
                    400: "#86868b",
                    500: "#6e6e73",
                    600: "#515154",
                    700: "#3a3a3c",
                    800: "#1d1d1f",
                    900: "#121214",
                },
                // Colores para el fondo gradiente
                "bg-gradient": {
                    blue: "#2563eb", // blue-600
                    purple: "#8b5cf6", // purple-500
                    dark: "#000000",
                },
            },
            backgroundImage: {
                "app-gradient":
                    "radial-gradient(circle at top left, var(--gradient-blue-opacity) 0%, transparent 50%), radial-gradient(circle at bottom right, var(--gradient-purple-opacity) 0%, transparent 50%), linear-gradient(to bottom, var(--gradient-dark) 0%, var(--gradient-dark) 100%)",
            },
            textColor: {
                primary: "var(--color-text-primary)",
                secondary: "var(--color-text-secondary)",
            },
            backgroundColor: {
                primary: "var(--color-primary)",
                secondary: "var(--color-secondary)",
                surface: "var(--color-surface)",
                card: "var(--color-card)",
                background: "var(--color-background)",
            },
            borderRadius: {
                sm: "var(--border-radius-sm)",
                md: "var(--border-radius-md)",
                lg: "var(--border-radius-lg)",
                full: "var(--border-radius-full)",
            },
            boxShadow: {
                "apple-sm": "var(--shadow-sm)",
                "apple-md": "var(--shadow-md)",
                "apple-lg": "var(--shadow-lg)",
            },
            fontFamily: {
                sans: [
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"SF Pro Text"',
                    '"SF Pro Display"',
                    '"Helvetica Neue"',
                    "Arial",
                    "sans-serif",
                ],
                mono: [
                    '"SF Mono"',
                    "SFMono-Regular",
                    "ui-monospace",
                    "Menlo",
                    "Monaco",
                    "Consolas",
                    '"Liberation Mono"',
                    '"Courier New"',
                    "monospace",
                ],
            },
        },
    },
};

export default config;
