import React from "react";

interface TutorialContentProps {
    content: string;
}

const TutorialContent = ({ content }: TutorialContentProps) => {
    return (
        <div className="prose prose-blue max-w-none mb-10">
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export default TutorialContent;
