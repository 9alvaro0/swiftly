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
        <div className="relative shadow-xl overflow-hidden transition-all">
            <div className="flex items-center justify-evenly">
                <div className="flex items-start relative space-x-6">
                    <ProfileAvatar
                        user={user}
                        onEditClick={() => handleOpenModal("photo")}
                    />

                    <ProfileInfo
                        user={user}
                        onEdit={handleOpenModal}
                    />
                </div>
                <ProfileStats user={user} />
            </div>

            <ProfileBio
                bio={user?.bio}
                onEditClick={() => handleOpenModal("bio")}
            />

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
