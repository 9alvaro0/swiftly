// src/constants/posts.ts

import { PostCategory, PostType, PostLevel } from "@/types/Post";

export const CATEGORY_OPTIONS: { value: PostCategory; label: string }[] = [
    { value: "Swift", label: "Swift" },
    { value: "SwiftUI", label: "SwiftUI" },
    { value: "iOS", label: "iOS" },
    { value: "Xcode", label: "Xcode" },
    { value: "macOS", label: "macOS" },
    { value: "Frameworks", label: "Frameworks" },
    { value: "visionOS", label: "visionOS" },
    { value: "Arquitectura", label: "Arquitectura" },
    { value: "Testing", label: "Testing" },
    { value: "watchOS", label: "watchOS" },
];

export const LEVEL_OPTIONS: { value: PostLevel; label: string }[] = [
    { value: "Principiante", label: "Principiante" },
    { value: "Intermedio", label: "Intermedio" },
    { value: "Avanzado", label: "Avanzado" },
];

export const POST_TYPE_OPTIONS: { value: PostType; label: string }[] = [
    { value: "post", label: "Post General" },
    { value: "tutorial", label: "Tutorial" },
    { value: "course", label: "Curso" },
    { value: "guide", label: "Guía" },
    { value: "snippets", label: "Snippets de Código" },
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
