// src/constants/posts.ts

import { PostType, PostLevel } from "@/types/Post";

export const LEVEL_OPTIONS: { value: PostLevel | ""; label: string }[] = [
    { value: "", label: "Sin nivel" },
    { value: "Principiante", label: "Principiante" },
    { value: "Intermedio", label: "Intermedio" },
    { value: "Avanzado", label: "Avanzado" },
];

export const LEVEL_COLORS = {
    Principiante: {
        color: "from-green-600 to-emerald-600",
        hoverBorder: "hover:border-green-500/50",
        hoverText: "group-hover:text-green-400",
        badge: "bg-green-700/50",
        textColor: "text-green-300",
    },
    Intermedio: {
        color: "from-blue-600 to-indigo-600",
        hoverBorder: "hover:border-blue-500/50",
        hoverText: "group-hover:text-blue-400",
        badge: "bg-blue-700/50",
        textColor: "text-blue-300",
    },
    Avanzado: {
        color: "from-purple-600 to-pink-600",
        hoverBorder: "hover:border-purple-500/50",
        hoverText: "group-hover:text-purple-400",
        badge: "bg-purple-700/50",
        textColor: "text-purple-300",
    },
};

export const POST_TYPE_OPTIONS: { value: PostType; label: string }[] = [
    { value: "article", label: "Articulo" },
    { value: "tutorial", label: "Tutorial" },
];

export const CODE_SNIPPETS = [
    {
        label: "Estructura SwiftUI",
        snippet: `\n\`\`\`swift
struct ContentView: View {
    var body: some View {
        VStack {
            Text("Hola SwiftUI")
                .font(.title)
        }
    }
}
\`\`\`\n`,
    },
    {
        label: "Función con Estado",
        snippet: `\n\`\`\`swift
struct CounterView: View {
    @State private var count = 0
    
    var body: some View {
        VStack {
            Text("Contador: \\(count)")
            Button("Incrementar") {
                count += 1
            }
        }
    }
}
\`\`\`\n`,
    },
    {
        label: "Navegación",
        snippet: `\n\`\`\`swift
struct NavigationExample: View {
    var body: some View {
        NavigationView {
            NavigationLink(destination: DetailView()) {
                Text("Ir a Detalle")
            }
            .navigationTitle("Navegación")
        }
    }
}
\`\`\`\n`,
    },
    {
        label: "Sección Markdown",
        snippet: `\n## Nuevo Encabezado de Sección

Escribe tu contenido aquí. Puedes usar **negrita**, *cursiva* y \`código inline\`.\n`,
    },
    {
        label: "Lista de Pasos",
        snippet: `\n### Pasos a Seguir

1. Primer paso
2. Segundo paso
3. Tercer paso

- Punto adicional
- Otro punto\n`,
    },
];

export const TAGS_SUGGESTIONS = [
    "Swift",
    "SwiftUI",
    "iOS",
    "Desarrollo",
    "Programación",
    "Tutorial",
    "Código",
    "Framework",
];
