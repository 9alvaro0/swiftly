// src/components/profile/ProfileHeader.tsx
import React from "react";
import ProfileActionModals from "./ProfileActionModals";
import { useProfileEditor } from "@/hooks/useProfileEditor";
import ProfileAvatar from "./ProfileAvatar";
import ProfileBio from "./ProfileBio";
import ProfileInfo from "./ProfileInfo";
import ProfileArticlesSection from "../articles/ProfileArticlesSection";
import { useUserLikedArticles, useUserViewedArticles } from "@/hooks/useUserArticles";

export default function ProfileHeader() {
    const {
        user,
        isEditingField,
        editingValue,
        imagePreview,
        uploadProgress,
        isUploading,
        uploadError,
        setEditingValue,
        handleOpenModal,
        handleCloseModal,
        handleSaveField,
        uploadUserImage,
    } = useProfileEditor();

    const { likedPosts, isLoading: isLoadingLiked } = useUserLikedArticles(user?.stats);
    const { viewedPosts, isLoading: isLoadingViewed } = useUserViewedArticles(user?.stats);

    return (
        <div className="space-y-8">
            {/* Header principal - Avatar e Info */}
            <div className="flex flex-col items-center text-center space-y-6 sm:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full">
                    <ProfileAvatar
                        user={user}
                        onEditClick={() => handleOpenModal("photo")}
                    />
                    <div className="flex-1 w-full">
                        <ProfileInfo
                            user={user}
                            onEdit={handleOpenModal}
                        />
                    </div>
                </div>
            </div>

            {/* Bio integrada */}
            <div className="px-2">
                <ProfileBio
                    bio={user?.bio}
                    onEditClick={() => handleOpenModal("bio")}
                />
            </div>

            {/* Secciones de artículos integradas */}
            <div className="space-y-8">
                {/* Favoritos */}
                <div className="pt-6 border-t border-gray-700/50">
                    <ProfileArticlesSection
                        type="liked"
                        posts={likedPosts}
                        isLoading={isLoadingLiked}
                    />
                </div>

                {/* Vistos recientemente */}
                <div className="pt-6 border-t border-gray-700/50">
                    <ProfileArticlesSection
                        type="viewed"
                        posts={viewedPosts}
                        isLoading={isLoadingViewed}
                    />
                </div>
            </div>

            <ProfileActionModals
                isEditingField={isEditingField}
                editingValue={editingValue}
                imagePreview={imagePreview}
                uploadProgress={uploadProgress}
                isUploading={isUploading}
                uploadError={uploadError}
                user={user}
                onEditValueChange={setEditingValue}
                onClose={handleCloseModal}
                onSaveField={handleSaveField}
                onUploadImage={uploadUserImage}
            />
        </div>
    );
}
