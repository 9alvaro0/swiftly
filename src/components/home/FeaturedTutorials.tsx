// src/components/home/FeaturedTutorials.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { useTutorials } from "@/hooks/useTutorials";
import FeaturedTutorialsSkeleton from "./skeletons/FeaturedTutorialsSkeleton";
import SectionHeader from "../ui/SectionHeader";
import TutorialCard from "../tutorials/TutorialCard";

export default function FeaturedTutorials() {
    const { tutorials, isLoading, error } = useTutorials();

    if (isLoading) {
        return (
            <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
                <div className="container mx-auto px-4">
                    <FeaturedTutorialsSkeleton />
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
                <div className="container mx-auto px-4">
                    <div className="text-center py-12 text-red-500">
                        Error al cargar los tutoriales: {error.message}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
            <div className="container mx-auto px-4">
                <SectionHeader
                    title="Tutoriales destacados"
                    link="/tutorials"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tutorials.map((tutorial) => (
                        <TutorialCard
                            key={tutorial.id}
                            tutorial={tutorial}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
