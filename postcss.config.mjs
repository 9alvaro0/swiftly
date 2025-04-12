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
            },
            textColor: {
                primary: "var(--color-text-primary)",
                secondary: "var(--color-text-secondary)",
            },
            backgroundColor: {
                primary: "var(--color-primary)",
                secondary: "var(--color-secondary)",
                surface: "var(--color-surface)",
            },
            borderRadius: {
                sm: "var(--border-radius-sm)",
                md: "var(--border-radius-md)",
                lg: "var(--border-radius-lg)",
            },
            boxShadow: {
                "apple-sm": "var(--shadow-sm)",
                "apple-md": "var(--shadow-md)",
                "apple-lg": "var(--shadow-lg)",
            },
            fontFamily: {
                sans: ["var(--font-sans)"],
                mono: ["var(--font-mono)"],
            },
        },
    },
};

export default config;
