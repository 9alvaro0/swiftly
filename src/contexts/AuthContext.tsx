import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
    id: string;
    email: string;
    role: 'user' | 'admin';
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (email: string, password: string) => {
        // In a real app, this would be an API call
        if (email === 'admin@example.com' && password === 'admin123') {
            setUser({
                id: '1',
                email: 'admin@example.com',
                role: 'admin'
            });
        } else if (email === 'user@example.com' && password === 'user123') {
            setUser({
                id: '2',
                email: 'user@example.com',
                role: 'user'
            });
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};