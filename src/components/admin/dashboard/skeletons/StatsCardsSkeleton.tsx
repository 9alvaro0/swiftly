import Card, { CardBody } from "@/components/ui/Card";

/**
 * Un componente de skeleton loader para las tarjetas de estadísticas
 */
export default function StatsCardsSkeleton() {
    // Función ayudante para crear tarjetas de skeleton
    const renderSkeletonCards = (count: number) => {
        return Array(count)
            .fill(0)
            .map((_, index) => (
                <Card
                    key={index}
                    className="overflow-hidden animate-pulse"
                >
                    <CardBody>
                        <div className="flex items-start gap-4">
                            <div className="rounded-full bg-neutral-200 dark:bg-neutral-800 h-12 w-12"></div>
                            <div className="flex-1">
                                <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800 rounded mb-2"></div>
                                <div className="h-8 w-16 bg-neutral-300 dark:bg-neutral-800 rounded mb-3"></div>
                                <div className="h-3 w-32 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
                                <div className="h-3 w-20 bg-neutral-200 dark:bg-neutral-800 rounded mt-3"></div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            ));
    };

    return (
        <div className="space-y-8">
            {/* Skeleton para sección general */}
            <div>
                <div className="h-6 w-40 bg-neutral-200 dark:bg-neutral-800 rounded mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{renderSkeletonCards(3)}</div>
            </div>

            {/* Skeleton para sección de engagement */}
            <div>
                <div className="h-6 w-48 bg-neutral-200 dark:bg-neutral-800 rounded mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{renderSkeletonCards(3)}</div>
            </div>

            {/* Skeleton para sección de categorías */}
            <div>
                <div className="h-6 w-32 bg-neutral-200 dark:bg-neutral-800 rounded mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {renderSkeletonCards(3).map((card, i) => (
                        <div key={i}>
                            {card}
                            {i === 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {[1, 2, 3].map((n) => (
                                        <div
                                            key={n}
                                            className="h-6 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-full"
                                        ></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
