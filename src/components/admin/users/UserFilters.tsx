// src/components/admin/users/UserFilters.tsx

"use client";

import { FiSearch } from "react-icons/fi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function UserFilters() {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    // Obtener valores actuales de los parámetros
    const query = searchParams.get("query") || "";
    const role = searchParams.get("role") || "";
    const status = searchParams.get("status") || "";

    // Manejar la búsqueda con debounce
    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        params.set("page", "1");
        replace(`${pathName}?${params.toString()}`);
    }, 300);

    // Actualizar parámetros de rol
    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams);
        const newRole = e.target.value;

        if (newRole && newRole !== "all") {
            params.set("role", newRole);
        } else {
            params.delete("role");
        }

        params.set("page", "1");
        replace(`${pathName}?${params.toString()}`);
    };

    // Actualizar parámetros de estado
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams);
        const newStatus = e.target.value;

        if (newStatus && newStatus !== "all") {
            params.set("status", newStatus);
        } else {
            params.delete("status");
        }

        params.set("page", "1");
        replace(`${pathName}?${params.toString()}`);
    };

    const handleClearFilters = async () => {
        const params = new URLSearchParams(searchParams);
        params.delete("query");
        params.delete("role");
        params.delete("status");
        params.set("page", "1");
        replace(`${pathName}?${params.toString()}`);
    };

    // Opciones para el selector de roles
    const roleOptions = [
        { value: "all", label: "All Roles" },
        { value: "admin", label: "Admin" },
        { value: "editor", label: "Editor" },
        { value: "author", label: "Author" },
        { value: "user", label: "User" },
    ];

    // Opciones para el selector de estados
    const statusOptions = [
        { value: "all", label: "All Status" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "banned", label: "Banned" },
    ];

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
                <Input
                    id="search-users"
                    label="Buscar usuarios"
                    placeholder="Buscar por nombre, email o username"
                    defaultValue={query}
                    icon={<FiSearch />}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
                <Select
                    id="role-filter"
                    label="Rol"
                    value={role}
                    options={roleOptions}
                    onChange={handleRoleChange}
                    className="sm:w-40"
                />

                <Select
                    id="status-filter"
                    label="Estado"
                    value={status}
                    options={statusOptions}
                    onChange={handleStatusChange}
                    className="sm:w-40"
                />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0 w-full md:w-auto">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearFilters}
                >
                    Limpiar Filtros
                </Button>
            </div>
        </div>
    );
}
