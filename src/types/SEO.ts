export interface SEORequest {
    title: string;
    content: string;
    type: string;
    tags?: string[];
    level?: string;
}

export interface SEOResponse {
    keywords: string[];
    metaDescription: string;
}
