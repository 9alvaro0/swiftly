import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="py-20 md:py-32 bg-background">
            <div className="container mx-auto px-4 text-center">
                {/* Eyebrow text */}
                <div className="inline-block rounded-full bg-neutral-200 dark:bg-neutral-700 px-4 py-1.5 mb-6 text-sm font-medium text-text-primary">
                    Aprende a tu ritmo
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-text-primary">Aprende Swift y SwiftUI</h1>

                <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-10">
                    Tutoriales, guías y recursos para convertirte en un
                    <span className="font-semibold"> desarrollador de iOS experimentado</span>
                </p>
            </div>
        </section>
    );
}
