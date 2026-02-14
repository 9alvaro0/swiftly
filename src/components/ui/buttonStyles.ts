// src/components/ui/buttonStyles.ts

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const baseStyles = `
    font-semibold tracking-wide inline-flex items-center justify-center
    transition-all duration-300 ease-in-out focus:outline-none focus:ring-2
    focus:ring-offset-0 focus:ring-blue-500 shadow-md
`;

const variantStyles: Record<ButtonVariant, string> = {
    primary: `
        bg-blue-600 text-white
        hover:bg-blue-700
        hover:shadow-blue-500/40
        shadow-blue-500/20
    `,
    secondary: `
        bg-purple-600 text-white
        hover:bg-purple-700
        hover:shadow-purple-500/40
        shadow-purple-500/20
    `,
    outline: `
        border border-white/20 text-white bg-white/5
        hover:bg-white/10 hover:shadow-white/30
        shadow-white/10
    `,
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 text-sm rounded-md",
    md: "px-5 py-2 text-base rounded-lg",
    lg: "px-6 py-3 text-lg rounded-xl",
};

export function getButtonStyles(
    variant: ButtonVariant = "primary",
    size: ButtonSize = "md",
    fullWidth: boolean = false,
    className: string = ""
): string {
    const widthStyle = fullWidth ? "w-full" : "";
    return `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className} backdrop-blur-lg`;
}
