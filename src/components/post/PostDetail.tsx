import { PostWithAuthor } from "@/types/Post";
import RelatedPosts from "@/components/post/RelatedPosts";
import PostAuthorBio from "@/components/post/PostAuthorBio";
import PostBreadcrumbs from "@/components/post/PostBreadcrumbs";
import PostFeaturedImage from "@/components/post/PostFeaturedImage";
import PostHeader from "@/components/post/PostHeader";
import PostTags from "@/components/post/PostTags";
import CommentsSection from "@/components/post/CommentsSection";
import FloatingSocialShare from "@/components/post/FloatingSocialShare";
import PostViewTracker from "@/components/post/PostViewTracker";
import PostContent from "@/components/post/PostContent";
import { SITE_URL } from "@/lib/constants";

interface PostDetailProps {
    post: PostWithAuthor;
    branch: string;
}

export default function PostDetail({ post, branch }: PostDetailProps) {
    const relatedPosts = post.relatedPosts || [];
    const postUrl = `${SITE_URL}/${branch === "articles" ? "posts" : "tutorials"}/${post.slug}`;

    return (
        <>
            {/* Client-side view tracking (renders nothing) */}
            <PostViewTracker postId={post.id} initialViews={post.views || 0} />

            <div className="py-2 md:py-12 px-4 md:px-6 max-w-4xl mx-auto">
                <PostBreadcrumbs branch={branch} />
                <PostHeader post={post} />
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
                url={postUrl}
                title={post.title}
                description={post.description}
                threshold={400}
                postId={post.id}
            />
        </>
    );
}
