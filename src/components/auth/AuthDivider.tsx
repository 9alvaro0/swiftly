// src/components/auth/AuthDivider.tsx
interface AuthDividerProps {
    text: string;
}

export default function AuthDivider({ text }: AuthDividerProps) {
    return (
        <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center">
                <span className="px-4 bg-black text-sm text-white/50">{text}</span>
            </div>
        </div>
    );
}
