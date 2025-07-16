// src/components/profile/ProfileHeader.tsx
import React from "react";
import ProfileActionModals from "./ProfileActionModals";
import { useProfileEditor } from "@/hooks/useProfileEditor";
import ProfileAvatar from "./ProfileAvatar";
import ProfileStats from "./ProfileStats";
import ProfileBio from "./ProfileBio";
import ProfileInfo from "./ProfileInfo";

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

    return (
        <div className="space-y-8">
            {/* Header principal - Avatar, Info y Stats sin tarjeta */}
            <div className="flex flex-col items-center text-center space-y-6 sm:text-left">
                {/* Avatar e info */}
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
                
                {/* Stats integradas pero con separación visual */}
                <div className="w-full pt-6 border-t border-gray-700/50">
                    <ProfileStats user={user} />
                </div>
            </div>

            {/* Bio sin tarjeta, más integrada */}
            <div className="px-2">
                <ProfileBio
                    bio={user?.bio}
                    onEditClick={() => handleOpenModal("bio")}
                />
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
