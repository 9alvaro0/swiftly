// src/components/ui/Spinner.tsx

import { FiLoader } from "react-icons/fi";

export default function Spinner() {
    return (
        <span role="status" aria-label="Cargando">
            <FiLoader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" aria-hidden="true" />
        </span>
    );
}
