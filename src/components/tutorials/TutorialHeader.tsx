import React from "react";
import Link from "next/link";

interface TutorialHeaderProps {
    title: string;
    description: string;
    category: string;
    level: string;
    date: string;
    author: {
        name: string;
        avatar?: string;
        bio?: string;
    };
}

const TutorialHeader = ({ title, description, category, level, date, author }: TutorialHeaderProps) => {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
                <span
                    className={`
          px-2 py-1 text-xs rounded text-white
          ${category === "SwiftUI" ? "bg-blue-600" : "bg-green-600"}
        `}
                >
                    {category}
                </span>
                <span className="text-sm text-gray-500">{level}</span>
            </div>

            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <p className="text-lg text-gray-600 mb-6">{description}</p>

            <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3">
                    {/* Aquí iría la imagen del autor si existe */}
                </div>
                <div>
                    <p className="font-medium">{author.name}</p>
                    <p className="text-sm text-gray-500">
                        {author.role} · {date}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TutorialHeader;
