import type React from "react";
export function BarChartIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <line
                x1="12"
                y1="20"
                x2="12"
                y2="10"
            ></line>
            <line
                x1="18"
                y1="20"
                x2="18"
                y2="4"
            ></line>
            <line
                x1="6"
                y1="20"
                x2="6"
                y2="16"
            ></line>
        </svg>
    );
}

export function FileTextIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line
                x1="16"
                y1="13"
                x2="8"
                y2="13"
            ></line>
            <line
                x1="16"
                y1="17"
                x2="8"
                y2="17"
            ></line>
            <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
    );
}

export function FilePenLineIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"></path>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
            <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"></path>
        </svg>
    );
}
