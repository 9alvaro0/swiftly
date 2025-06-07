"use client";

import { Post } from "@/types/Post";
import RelatedPosts from "@/components/post/RelatedPosts";
import PostAuthorBio from "@/components/post/PostAuthorBio";
import PostBreadcrumbs from "@/components/post/PostBreadcrumbs";
import PostFeaturedImage from "@/components/post/PostFeaturedImage";
import PostHeader from "@/components/post/PostHeader";
import PostTags from "@/components/post/PostTags";
import CommentsSection from "@/components/post/CommentsSection";
import FloatingSocialShare from "@/components/post/FloatingSocialShare";
import { usePostViews } from "@/hooks/usePostViews";
import PostContent from "@/components/post/PostContent";

interface PostDetailProps {
    post: Post;
    branch: string;
}

export default function PostDetail({ post, branch }: PostDetailProps) {
    const relatedPosts = post.relatedPosts || [];
    const { views } = usePostViews(post.id, post.views || 0);
    const postWithUpdatedViews = {
        ...post,
        views: views,
    };

    // Generate full URL for sharing
    const currentUrl = typeof window !== 'undefined' 
        ? window.location.href 
        : `https://aprendeswift.dev/${branch}/${post.slug}`;

    return (
        <>
            <div className="py-12 px-4 md:px-6 max-w-4xl mx-auto">
                <PostBreadcrumbs branch={branch} />
                <PostHeader post={postWithUpdatedViews} />
                <PostFeaturedImage
                    image={post.coverImage || post.imageUrl}
                    title={post.title}
                />
                <PostContent content={post.content} />
                <PostTags tags={post.tags || []} />
                <PostAuthorBio author={post.author} />
                
                {/* Sección de comentarios */}
                <div className="mt-12">
                    <CommentsSection postId={post.id} />
                </div>
                
                {relatedPosts.length > 0 && (
                    <div className="mt-12">
                        <RelatedPosts posts={relatedPosts} />
                    </div>
                )}
            </div>

            {/* Floating social share button */}
            <FloatingSocialShare
                url={currentUrl}
                title={post.title}
                description={post.description}
                threshold={400}
                postId={post.id}
            />
        </>
    );
}
