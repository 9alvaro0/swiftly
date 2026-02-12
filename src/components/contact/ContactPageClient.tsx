"use client";

import useContactForm from "@/hooks/useContactForm";
import ContactForm from "@/components/contact/ContactForm";
import SuccessMessage from "@/components/contact/SuccessMessage";
import ErrorMessage from "@/components/contact/ErrorMessage";

export default function ContactPageClient() {
    const { formState, errors, isSubmitting, isSubmitted, submitError, handleChange, handleSubmit } = useContactForm();

    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
            {!isSubmitted ? (
                <ContactForm
                    formState={formState}
                    errors={errors}
                    isSubmitting={isSubmitting}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            ) : (
                <SuccessMessage />
            )}

            {submitError && <ErrorMessage error={submitError} />}
        </div>
    );
}
