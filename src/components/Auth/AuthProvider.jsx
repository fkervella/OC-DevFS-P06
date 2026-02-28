import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';

const AuthContext = createContext(null);

const initialState = {
    user: null,
    isLoading: true,
    error: null,
};

function authReducer(state, action) {

    switch(action.type) {
        case 'LOGIN_START':
            return { ...state, isLoading: true, error: null};
        case 'LOGIN_SUCCESS':
            return { ...state, isLoading: false, user: action.payload };
        case 'LOGIN_ERROR':
            return { ...state, isLoading: false, error: action.payload };
        case 'LOGOUT':
            return { ...state, user: null };
        case 'CHECK_AUTH_START':
            return { ...state, isLoading: true };
        case 'CHECK_AUTH_SUCCESS':
            return { ...state, isLoading: false, user: action.payload };
        case 'CHECK_AUTH_ERROR':
            return { ...state, isLoading: false };
        default:
            return state;
    }
}

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        checkAuth();
    }, []);

    const login = useCallback(async (email, password) => {
        username = email;
        dispatch({ type: 'LOGIN_START' });
        try {
            const response = await fetch('localhost:8000/api/login', {
                method: 'POST', 
                headers: { 'content-type': 'application/json'},
                body: JSON.stringify({ username, password }),
            });

            if(!response.ok) {
                throw new Error('Login failed');
            }

            const user = await response.json();
            localStorage.setItem('authToken', user.id);
            dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } catch (error) {
            dispatch({
                type: 'LOGIN_ERROR',
                payload: error.message || 'Unknown error',
            });
            throw error;
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } finally {
            localStorage.removeItem('authToken');
            dispatch({ type: 'LOGOUT' });
        }
    }, []);

    const checkAuth = useCallback(async () => {
        dispatch({ type: 'CHECK_AUTH_START' });
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                dispatch({ type: 'CHECK_AUTH_ERROR' });
                return;
            }

            const response = await fetch('/api/login', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error('Auth check failed');
            }

            const user = await response.jason();
            dispatch({ type: 'CHECK_AUTH_SUCCESS', payload: user });
        } catch(error) {
            dispatch({ type: 'CHECK_AUTH_ERROR' });
        }
    }, [] );

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isAuthenticated: state.user !== null,
                isLoading: state.isLoading,
                error: state.error,
                login,
                logout,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
