// components/admin/dashboard/PerformanceChart.tsx

"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { name: "Enero", views: 400 },
    { name: "Febrero", views: 300 },
    { name: "Marzo", views: 500 },
];

export default function PerformanceChart() {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Rendimiento Mensual</h2>
            <div className="h-64">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <BarChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                            dataKey="views"
                            fill="#4f46e5"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
