"use client";

import React, { RefObject } from "react";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import PostContent from "@/components/post/PostContent";
import { CODE_SNIPPETS } from "@/constants/post";

interface PostContentEditorProps {
    content: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    isPreview: boolean;
    setIsPreview: (isPreview: boolean) => void;
    handleQuickInsert: (snippet: string) => void;
    contentRef: RefObject<HTMLTextAreaElement | null>;
    error?: string;
}

const PostContentEditor: React.FC<PostContentEditorProps> = ({
    content,
    onChange,
    isPreview,
    setIsPreview,
    handleQuickInsert,
    contentRef,
    error,
}) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Contenido</h3>

            <div>
                <label className="block text-primary font-medium mb-2">Snippets Rápidos</label>
                <div className="flex flex-wrap gap-2 mb-4">
                    {CODE_SNIPPETS.map((snippet) => (
                        <Button
                            key={snippet.label}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickInsert(snippet.snippet)}
                        >
                            {snippet.label}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="flex items-center mb-2">
                <Checkbox
                    id="preview"
                    label="Vista Previa"
                    checked={isPreview}
                    onChange={() => setIsPreview(!isPreview)}
                />
            </div>

            {!isPreview ? (
                <Textarea
                    id="content"
                    label="Contenido (Markdown)"
                    ref={contentRef}
                    name="content"
                    value={content}
                    onChange={onChange}
                    error={error}
                    height={500}
                />
            ) : (
                <div className="border rounded-md p-4 h-[30rem] overflow-auto">
                    <PostContent content={content || "Vista previa de tu contenido..."} />
                </div>
            )}

            {!isPreview && (
                <div className="text-sm text-gray-500 mt-2">
                    <p>
                        Usa Markdown para dar formato al contenido. Los snippets rápidos te ayudarán a insertar
                        elementos comunes.
                    </p>
                </div>
            )}
        </div>
    );
};

export default PostContentEditor;
