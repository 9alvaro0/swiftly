// src/services/imageUploadService.ts

export const uploadImage = async (file: File) => {
    return new Promise<string>((resolve) => {
        console.log("Subiendo imagen:", file);

        // Simula subida, pero devuelve una URL falsa y útil
        const fakeUrl = `https://developer.apple.com/news/images/og/swiftui-og.png`;
        setTimeout(() => resolve(fakeUrl), 500); // Simulamos tiempo de subida
    });
};
