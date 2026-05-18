import { describe, it, expect } from 'vitest';
import { escapeXml, createExcerpt } from '../dateUtils';

describe('escapeXml', () => {
    it('escapes ampersands', () => {
        expect(escapeXml('A & B')).toBe('A &amp; B');
    });

    it('escapes angle brackets', () => {
        expect(escapeXml('<div>')).toBe('&lt;div&gt;');
    });

    it('escapes quotes', () => {
        expect(escapeXml('"hello"')).toBe('&quot;hello&quot;');
    });

    it('escapes single quotes', () => {
        expect(escapeXml("it's")).toBe("it&#39;s");
    });

    it('handles all special chars together', () => {
        expect(escapeXml('<a href="test">&</a>')).toBe(
            '&lt;a href=&quot;test&quot;&gt;&amp;&lt;/a&gt;'
        );
    });

    it('passes through normal text unchanged', () => {
        expect(escapeXml('Hello World 123')).toBe('Hello World 123');
    });
});

describe('createExcerpt', () => {
    it('returns short content as-is', () => {
        expect(createExcerpt('Hello world')).toBe('Hello world');
    });

    it('truncates at word boundary', () => {
        const long = 'word '.repeat(100); // 500 chars
        const excerpt = createExcerpt(long, 50);
        expect(excerpt.length).toBeLessThanOrEqual(54); // 50 + '...'
        expect(excerpt).toMatch(/\.\.\.$/);
    });

    it('strips HTML tags', () => {
        expect(createExcerpt('<p>Hello <strong>world</strong></p>')).toBe('Hello world');
    });

    it('respects custom maxLength', () => {
        const text = 'Hello wonderful beautiful amazing world of code';
        const excerpt = createExcerpt(text, 20);
        expect(excerpt.length).toBeLessThanOrEqual(24); // 20 + '...'
    });

    it('handles empty content', () => {
        expect(createExcerpt('')).toBe('');
    });

    it('handles content with only HTML tags', () => {
        expect(createExcerpt('<br/><hr/>')).toBe('');
    });
});
