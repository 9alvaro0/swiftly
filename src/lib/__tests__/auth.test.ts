import { describe, it, expect, vi, beforeEach } from 'vitest';
import { verifyAdminToken, AuthError } from '../auth';

// Mock next/headers
vi.mock('next/headers', () => ({
    headers: vi.fn(),
}));

// Mock firebase-admin
vi.mock('../firebase-admin', () => ({
    getAdminAuth: vi.fn(),
    getAdminDb: vi.fn(),
}));

// Mock claims (non-blocking, just needs to exist)
vi.mock('../claims', () => ({
    syncCustomClaims: vi.fn().mockResolvedValue(undefined),
}));

import { headers } from 'next/headers';
import { getAdminAuth, getAdminDb } from '../firebase-admin';

const mockHeaders = headers as unknown as ReturnType<typeof vi.fn>;
const mockGetAdminAuth = getAdminAuth as unknown as ReturnType<typeof vi.fn>;
const mockGetAdminDb = getAdminDb as unknown as ReturnType<typeof vi.fn>;

// Helpers
function mockHeadersWith(authHeader: string | null) {
    mockHeaders.mockResolvedValue({
        get: (name: string) => name === 'authorization' ? authHeader : null,
    });
}

function mockAdminAuth(decodedToken: Record<string, unknown> | null) {
    if (decodedToken) {
        mockGetAdminAuth.mockResolvedValue({
            verifyIdToken: vi.fn().mockResolvedValue(decodedToken),
        });
    } else {
        mockGetAdminAuth.mockResolvedValue({
            verifyIdToken: vi.fn().mockRejectedValue(new Error('Invalid token')),
        });
    }
}

function mockAdminDb(userData: Record<string, unknown> | null) {
    const mockDoc = userData
        ? { exists: true, data: () => userData }
        : { exists: false, data: () => null };

    mockGetAdminDb.mockResolvedValue({
        collection: () => ({
            doc: () => ({
                get: vi.fn().mockResolvedValue(mockDoc),
            }),
        }),
    });
}

beforeEach(() => {
    vi.clearAllMocks();
});

describe('verifyAdminToken', () => {
    it('throws 401 when no Authorization header', async () => {
        mockHeadersWith(null);

        await expect(verifyAdminToken()).rejects.toThrow(AuthError);
        await expect(verifyAdminToken()).rejects.toMatchObject({
            statusCode: 401,
            message: 'Missing or invalid authorization header',
        });
    });

    it('throws 401 when Authorization header is not Bearer', async () => {
        mockHeadersWith('Basic abc123');

        await expect(verifyAdminToken()).rejects.toMatchObject({
            statusCode: 401,
        });
    });

    it('throws 401 when Bearer token is empty', async () => {
        mockHeadersWith('Bearer ');

        await expect(verifyAdminToken()).rejects.toMatchObject({
            statusCode: 401,
            message: 'Missing token',
        });
    });

    it('throws 503 when Admin Auth is unavailable', async () => {
        mockHeadersWith('Bearer valid-token');
        mockGetAdminAuth.mockResolvedValue(null);

        await expect(verifyAdminToken()).rejects.toMatchObject({
            statusCode: 503,
            message: 'Auth service unavailable',
        });
    });

    it('throws 401 when token verification fails', async () => {
        mockHeadersWith('Bearer invalid-token');
        mockAdminAuth(null); // verifyIdToken rejects

        await expect(verifyAdminToken()).rejects.toMatchObject({
            statusCode: 401,
            message: 'Invalid or expired token',
        });
    });

    it('throws 503 when Admin DB is unavailable', async () => {
        mockHeadersWith('Bearer valid-token');
        mockAdminAuth({ uid: 'user-1', email: 'test@test.com' });
        mockGetAdminDb.mockResolvedValue(null);

        await expect(verifyAdminToken()).rejects.toMatchObject({
            statusCode: 503,
            message: 'Database service unavailable',
        });
    });

    it('throws 403 when user not found in Firestore', async () => {
        mockHeadersWith('Bearer valid-token');
        mockAdminAuth({ uid: 'user-1', email: 'test@test.com' });
        mockAdminDb(null); // doc doesn't exist

        await expect(verifyAdminToken()).rejects.toMatchObject({
            statusCode: 403,
            message: 'User not found',
        });
    });

    it('throws 403 when user is not admin', async () => {
        mockHeadersWith('Bearer valid-token');
        mockAdminAuth({ uid: 'user-1', email: 'test@test.com' });
        mockAdminDb({ role: 'user' });

        await expect(verifyAdminToken()).rejects.toMatchObject({
            statusCode: 403,
            message: 'Insufficient permissions',
        });
    });

    it('returns verified result for admin user', async () => {
        mockHeadersWith('Bearer valid-token');
        mockAdminAuth({ uid: 'admin-1', email: 'admin@test.com', role: 'admin' });
        mockAdminDb({ role: 'admin' });

        const result = await verifyAdminToken();

        expect(result).toEqual({
            decodedToken: { uid: 'admin-1', email: 'admin@test.com' },
            uid: 'admin-1',
            email: 'admin@test.com',
            role: 'admin',
        });
    });

    it('returns empty email string when token has no email', async () => {
        mockHeadersWith('Bearer valid-token');
        mockAdminAuth({ uid: 'admin-1', role: 'admin' }); // no email
        mockAdminDb({ role: 'admin' });

        const result = await verifyAdminToken();
        expect(result.email).toBe('');
    });
});
