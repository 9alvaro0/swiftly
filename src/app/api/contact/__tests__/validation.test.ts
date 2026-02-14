import { describe, it, expect } from 'vitest';

// Extract validation logic inline since it's not exported from route.ts
// This tests the same patterns used in the contact API route
const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

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

    if (!typedData.email || typeof typedData.email !== 'string' || !validateEmail(typedData.email)) {
        throw new Error('Email inválido');
    }
    if (typedData.email.length > 254) {
        throw new Error('Email demasiado largo');
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

describe('validateEmail', () => {
    it('accepts valid emails', () => {
        expect(validateEmail('test@example.com')).toBe(true);
        expect(validateEmail('user.name@domain.org')).toBe(true);
        expect(validateEmail('user+tag@sub.domain.com')).toBe(true);
    });

    it('rejects emails without @', () => {
        expect(validateEmail('testexample.com')).toBe(false);
    });

    it('rejects emails without domain', () => {
        expect(validateEmail('test@')).toBe(false);
    });

    it('rejects emails without TLD', () => {
        expect(validateEmail('test@example')).toBe(false);
    });

    it('rejects emails with single char TLD', () => {
        expect(validateEmail('test@example.a')).toBe(false);
    });

    it('rejects empty string', () => {
        expect(validateEmail('')).toBe(false);
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
            .toThrow('Email demasiado largo');
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
