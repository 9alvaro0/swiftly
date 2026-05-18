import { describe, it, expect } from 'vitest';
import { isValidEmail } from '@/utils/validation';

// Mirrors the validation logic in contact API route
const validateInput = (data: unknown) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Datos inválidos');
    }

    const typedData = data as Record<string, unknown>;

    if (!typedData.name || typeof typedData.name !== 'string' || typedData.name.trim().length === 0) {
        throw new Error('El nombre es obligatorio');
    }
    if (typedData.name.trim().length > 100) {
        throw new Error('El nombre debe tener máximo 100 caracteres');
    }

    if (!typedData.email || typeof typedData.email !== 'string' || !isValidEmail(typedData.email)) {
        throw new Error('Email inválido');
    }

    if (!typedData.message || typeof typedData.message !== 'string' || typedData.message.trim().length === 0) {
        throw new Error('El mensaje es obligatorio');
    }
    if (typedData.message.trim().length > 5000) {
        throw new Error('El mensaje debe tener máximo 5000 caracteres');
    }

    return {
        name: typedData.name.trim(),
        email: typedData.email.trim().toLowerCase(),
        message: typedData.message.trim()
    };
};

describe('isValidEmail', () => {
    it('accepts valid emails', () => {
        expect(isValidEmail('test@example.com')).toBe(true);
        expect(isValidEmail('user.name@domain.org')).toBe(true);
        expect(isValidEmail('user+tag@sub.domain.com')).toBe(true);
    });

    it('rejects emails without @', () => {
        expect(isValidEmail('testexample.com')).toBe(false);
    });

    it('rejects emails without domain', () => {
        expect(isValidEmail('test@')).toBe(false);
    });

    it('rejects emails without TLD', () => {
        expect(isValidEmail('test@example')).toBe(false);
    });

    it('rejects emails with single char TLD', () => {
        expect(isValidEmail('test@example.a')).toBe(false);
    });

    it('rejects empty string', () => {
        expect(isValidEmail('')).toBe(false);
    });

    it('rejects emails longer than 254 chars', () => {
        const longEmail = 'a'.repeat(246) + '@test.com'; // 255 chars
        expect(isValidEmail(longEmail)).toBe(false);
    });
});

describe('validateInput', () => {
    const validData = {
        name: 'Test User',
        email: 'test@example.com',
        message: 'Hello, this is a test message.',
    };

    it('accepts valid input', () => {
        const result = validateInput(validData);
        expect(result.name).toBe('Test User');
        expect(result.email).toBe('test@example.com');
        expect(result.message).toBe('Hello, this is a test message.');
    });

    it('trims name and message', () => {
        const result = validateInput({
            ...validData,
            name: '  Padded Name  ',
            message: '  Padded message  ',
        });
        expect(result.name).toBe('Padded Name');
        expect(result.message).toBe('Padded message');
    });

    it('lowercases email', () => {
        const result = validateInput({
            ...validData,
            email: 'Test@EXAMPLE.COM',
        });
        expect(result.email).toBe('test@example.com');
    });

    it('throws for null data', () => {
        expect(() => validateInput(null)).toThrow('Datos inválidos');
    });

    it('throws for non-object data', () => {
        expect(() => validateInput('string')).toThrow('Datos inválidos');
    });

    it('throws for missing name', () => {
        expect(() => validateInput({ ...validData, name: '' })).toThrow('El nombre es obligatorio');
    });

    it('throws for name > 100 chars', () => {
        expect(() => validateInput({ ...validData, name: 'a'.repeat(101) }))
            .toThrow('El nombre debe tener máximo 100 caracteres');
    });

    it('throws for invalid email', () => {
        expect(() => validateInput({ ...validData, email: 'not-an-email' }))
            .toThrow('Email inválido');
    });

    it('throws for email > 254 chars', () => {
        const longEmail = 'a'.repeat(246) + '@test.com'; // 255 chars > 254 limit
        expect(() => validateInput({ ...validData, email: longEmail }))
            .toThrow('Email inválido');
    });

    it('throws for missing message', () => {
        expect(() => validateInput({ ...validData, message: '' })).toThrow('El mensaje es obligatorio');
    });

    it('throws for message > 5000 chars', () => {
        expect(() => validateInput({ ...validData, message: 'a'.repeat(5001) }))
            .toThrow('El mensaje debe tener máximo 5000 caracteres');
    });

    it('throws for whitespace-only name', () => {
        expect(() => validateInput({ ...validData, name: '   ' })).toThrow('El nombre es obligatorio');
    });

    it('throws for whitespace-only message', () => {
        expect(() => validateInput({ ...validData, message: '   ' })).toThrow('El mensaje es obligatorio');
    });
});
