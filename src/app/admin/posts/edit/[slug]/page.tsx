// src/app/admin/tutorials/edit/[slug]/page.tsx

import EditTutorialClient from "./EditTutorialClient";

export async function generateStaticParams() {
    return [];
}

export default function EditTutorialPage() {
    return <EditTutorialClient />;
}
