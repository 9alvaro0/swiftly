"use client";

import { useEffect } from "react";
import { Post } from "@/types/Post";
import RelatedPosts from "@/components/post/RelatedPosts";
import PostAuthorBio from "@/components/post/PostAuthorBio";
import PostBreadcrumbs from "@/components/post/PostBreadcrumbs";
import PostFeaturedImage from "@/components/post/PostFeaturedImage";
import PostHeader from "@/components/post/PostHeader";
import PostTags from "@/components/post/PostTags";
import PostContent from "@/components/posts/PostContent";
import { usePostViews } from "@/hooks/usePostViews";

interface PostDetailProps {
    post: Post;
    branch: string;
}

export default function PostDetail({ post, branch }: PostDetailProps) {
    const relatedPosts = post.relatedPosts || [];
    
    // Usamos el hook de vistas para registrar automáticamente la vista
    // y pasar el número actualizado de vistas al PostHeader
    const { views } = usePostViews(post.id, post.views || 0);
    
    // Creamos una copia del post con las vistas actualizadas para pasarlo a PostHeader
    const postWithUpdatedViews = {
        ...post,
        views: views
    };

    return (
        <div className="py-12 px-4 md:px-6 max-w-4xl mx-auto">
            <PostBreadcrumbs branch={branch} />
            <PostHeader post={postWithUpdatedViews} />
            <PostFeaturedImage
                imageUrl={post.imageUrl || ""}
                title={post.title}
            />
            <PostContent content={post.content} />
            <PostTags tags={post.tags || []} />
            <PostAuthorBio author={post.author} />
            {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
        </div>
    );
}
