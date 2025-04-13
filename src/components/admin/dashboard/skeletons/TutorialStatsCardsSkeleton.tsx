"use client";

import Card, { CardBody } from "@/components/ui/Card";
import { BarChartIcon, FileTextIcon, FilePenLineIcon } from "@/components/icons";

export default function TutorialStatsCards() {
    return (
        <div className="p-6 md:p-8 bg-background">
            <h1 className="text-2xl font-bold mb-6 text-primary">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                    { 
                        icon: BarChartIcon, 
                        color: 'primary', 
                        title: 'Total de Tutoriales' 
                    },
                    { 
                        icon: FileTextIcon, 
                        color: 'secondary', 
                        title: 'Tutoriales Publicados' 
                    },
                    { 
                        icon: FilePenLineIcon, 
                        color: 'warning', 
                        title: 'Borradores' 
                    }
                ].map((item, index) => (
                    <Card 
                        key={index} 
                        className={`border-l-4 border-l-${item.color}`}
                    >
                        <CardBody className="flex items-start gap-4">
                            <div className={`p-3 rounded-full bg-${item.color}/10`}>
                                <item.icon className={`h-6 w-6 text-${item.color}`} />
                            </div>
                            <div className="flex-1">
                                <div className="text-lg font-semibold text-primary mb-1">
                                    {item.title}
                                </div>
                                <div className="h-8 w-16 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded"></div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>

            <Card>
                <CardBody>
                    <div className="h-12 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded"></div>
                </CardBody>
            </Card>
        </div>
    );
}