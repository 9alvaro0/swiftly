import { describe, it, expect } from 'vitest';
import { validatePost, generateSlug, calculateReadTime, preparePostForSave, getDefaultPost } from '../postUtils';
import type { Post } from '@/types/Post';

// Helper: create a valid post for testing
function validPost(overrides: Partial<Post> = {}): Post {
    return {
        ...getDefaultPost(),
        title: 'Test Post Title',
        description: 'A test description',
        content: 'Some content here for the test post',
        type: 'article',
        level: 'Principiante',
        imageUrl: 'https://example.com/image.jpg',
        authorId: 'author-123',
        ...overrides,
    };
}

describe('validatePost', () => {
    it('accepts a valid post', () => {
        const result = validatePost(validPost());
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it('rejects empty title', () => {
        const result = validatePost(validPost({ title: '' }));
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('El título es obligatorio');
    });

    it('rejects whitespace-only title', () => {
        const result = validatePost(validPost({ title: '   ' }));
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('El título es obligatorio');
    });

    it('rejects empty description', () => {
        const result = validatePost(validPost({ description: '' }));
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('La descripción es obligatoria');
    });

    it('rejects empty content', () => {
        const result = validatePost(validPost({ content: '' }));
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('El contenido es obligatorio');
    });

    it('rejects missing imageUrl', () => {
        const result = validatePost(validPost({ imageUrl: '' }));
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('La URL de la imagen es obligatoria');
    });

    it('rejects missing authorId', () => {
        const result = validatePost(validPost({ authorId: '' }));
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('El ID del autor es obligatorio');
    });

    it('collects multiple errors', () => {
        const result = validatePost(validPost({ title: '', content: '', authorId: '' }));
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThanOrEqual(3);
    });
});

describe('generateSlug', () => {
    it('converts title to lowercase kebab-case', () => {
        expect(generateSlug('Hello World')).toBe('hello-world');
    });

    it('removes accents', () => {
        expect(generateSlug('Introducción a Swift')).toBe('introduccion-a-swift');
    });

    it('removes special characters', () => {
        expect(generateSlug('What is Swift? (2024)')).toBe('what-is-swift-2024');
    });

    it('collapses multiple spaces', () => {
        expect(generateSlug('Hello    World')).toBe('hello-world');
    });

    it('trims whitespace', () => {
        expect(generateSlug('  Hello World  ')).toBe('hello-world');
    });

    it('handles empty string', () => {
        expect(generateSlug('')).toBe('');
    });

    it('handles Spanish characters', () => {
        expect(generateSlug('Cómo usar ñ en código')).toBe('como-usar-n-en-codigo');
    });
});

describe('calculateReadTime', () => {
    it('returns 1 minute for short content', () => {
        expect(calculateReadTime('hello world')).toBe(1);
    });

    it('calculates based on 200 wpm', () => {
        const words = Array(400).fill('word').join(' ');
        expect(calculateReadTime(words)).toBe(2);
    });

    it('rounds up to nearest minute', () => {
        const words = Array(201).fill('word').join(' ');
        expect(calculateReadTime(words)).toBe(2);
    });

    it('handles empty content', () => {
        expect(calculateReadTime('')).toBe(1); // single empty "word"
    });
});

describe('preparePostForSave', () => {
    it('calculates wordCount and readTime', () => {
        const post = validPost({ content: Array(400).fill('word').join(' ') });
        const prepared = preparePostForSave(post);
        expect(prepared.wordCount).toBe(400);
        expect(prepared.readTime).toBe(2);
    });

    it('generates slug from title if slug is empty', () => {
        const post = validPost({ title: 'My Test Post', slug: '' });
        const prepared = preparePostForSave(post);
        expect(prepared.slug).toBe('my-test-post');
    });

    it('preserves existing slug', () => {
        const post = validPost({ title: 'Different Title', slug: 'original-slug' });
        const prepared = preparePostForSave(post);
        expect(prepared.slug).toBe('original-slug');
    });

    it('sets updatedAt', () => {
        const before = new Date();
        const prepared = preparePostForSave(validPost());
        expect(prepared.updatedAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
    });
});
