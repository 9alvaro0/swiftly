/**
 * Utility functions for tag formatting and conversion
 */

/**
 * Converts a tag to a URL-friendly slug format
 * Example: "Swift UI" -> "swift-ui"
 */
export const tagToSlug = (tag: string): string => {
    return tag
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]/g, ""); // Remove special characters except hyphens
};

/**
 * Converts a slug back to tag format
 * Example: "swift-ui" -> "Swift UI"
 * Note: This is a best-effort conversion. For exact tag names, 
 * consider storing a mapping or using tag IDs
 */
export const slugToTag = (slug: string): string => {
    // Special cases for common Swift/iOS related tags
    const specialCases: Record<string, string> = {
        "swiftui": "SwiftUI",
        "swift-ui": "SwiftUI",
        "ios": "iOS",
        "macos": "macOS",
        "watchos": "watchOS",
        "tvos": "tvOS",
        "ipados": "iPadOS",
        "xcode": "Xcode",
        "uikit": "UIKit",
        "api": "API",
        "url": "URL",
        "json": "JSON",
        "rest": "REST",
        "mvvm": "MVVM",
        "mvc": "MVC",
        "tdd": "TDD",
        "ci-cd": "CI/CD",
        "arkit": "ARKit",
        "coreml": "CoreML",
        "core-ml": "CoreML",
        "core-data": "Core Data",
        "coredata": "Core Data",
    };

    // Check if we have a special case
    const lowerSlug = slug.toLowerCase();
    if (specialCases[lowerSlug]) {
        return specialCases[lowerSlug];
    }

    // Default conversion: capitalize each word
    return slug
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
};

/**
 * Normalizes a tag for consistent storage and comparison
 */
export const normalizeTag = (tag: string): string => {
    return tag.trim();
};