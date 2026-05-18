// src/components/ui/Spinner.tsx

import { Loader } from "lucide-react";

export default function Spinner() {
    return (
        <span role="status" aria-label="Cargando">
            <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" aria-hidden="true" />
        </span>
    );
}
