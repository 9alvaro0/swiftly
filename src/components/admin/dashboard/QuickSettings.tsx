// components/admin/dashboard/QuickSettings.tsx
import Link from "next/link";

export default function QuickSettings() {
    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold">Configuraciones</h2>
            <ul className="space-y-1 text-sm">
                <li>
                    <Link
                        href="/admin/settings"
                        className="text-primary hover:underline"
                    >
                        Configuración general
                    </Link>
                </li>
                <li>
                    <Link
                        href="/admin/categories"
                        className="text-primary hover:underline"
                    >
                        Categorías
                    </Link>
                </li>
                <li>
                    <Link
                        href="/admin/tags"
                        className="text-primary hover:underline"
                    >
                        Etiquetas
                    </Link>
                </li>
            </ul>
        </div>
    );
}
