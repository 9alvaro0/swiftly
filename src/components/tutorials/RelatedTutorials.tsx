import React from "react";
import Link from "next/link";

interface RelatedTutorial {
    id: string;
    title: string;
}

interface RelatedTutorialsProps {
    tutorials: RelatedTutorial[];
}

const RelatedTutorials = ({ tutorials }: RelatedTutorialsProps) => {
    if (!tutorials || tutorials.length === 0) return null;

    return (
        <div className="border-t pt-8">
            <h2 className="text-xl font-bold mb-4">Tutoriales relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tutorials.map((tutorial) => (
                    <Link
                        key={tutorial.id}
                        href={`/tutoriales/${tutorial.id}`}
                        className="p-4 border rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        <h3 className="font-medium">{tutorial.title}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedTutorials;
