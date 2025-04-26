import SeeAllButton from "./SeeAllButton";

interface SectionHeaderProps {
    title: string;
    link: string;
    subtitle?: string;
    accentColor?: "blue" | "purple" | "emerald" | "amber";
    hasData?: boolean;
}

export default function SectionHeader({ title, link, subtitle, accentColor = "blue", hasData: hasPosts }: SectionHeaderProps) {
    const accentColors = {
        blue: "from-blue-500/20 to-blue-400/5 border-blue-500/30 text-blue-400 hover:text-blue-300",
        purple: "from-purple-500/20 to-purple-400/5 border-purple-500/30 text-purple-400 hover:text-purple-300",
        emerald: "from-emerald-500/20 to-emerald-400/5 border-emerald-500/30 text-emerald-400 hover:text-emerald-300",
        amber: "from-amber-500/20 to-amber-400/5 border-amber-500/30 text-amber-400 hover:text-amber-300",
    };

    const selectedAccent = accentColors[accentColor];

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-4 mb-8">
            <div className="flex items-center">
                <div className={`h-12 w-1 rounded-full bg-gradient-to-b ${selectedAccent.split(" ")[0]} mr-3`}></div>
                <div>
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                    {subtitle && <p className="text-white/60 mt-1 text-sm md:text-base max-w-2xl">{subtitle}</p>}
                </div>
            </div>

            {hasPosts && (
                <SeeAllButton
                    link={link}
                    selectedAccent={selectedAccent}
                />
            )}
        </div>
    );
}
