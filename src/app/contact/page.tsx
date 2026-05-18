// src/app/contact/page.tsx

"use client";

import useContactForm from "@/hooks/useContactForm";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactForm from "@/components/contact/ContactForm";
import SuccessMessage from "@/components/contact/SuccessMessage";
import ErrorMessage from "@/components/contact/ErrorMessage";

export default function ContactPage() {
    const { formState, errors, isSubmitting, isSubmitted, submitError, handleChange, handleSubmit } = useContactForm();

    return (
        <div className="container mx-auto py-4 md:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-12">
                <ContactHeader />

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
            </div>
        </div>
    );
}
