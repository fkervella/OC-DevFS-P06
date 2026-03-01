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

function setCookie(name, value, days = 7)  {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 3600000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax;Secure`;
}

/*function getCookie(name){
    const cookies = documents.cookie.split(';');
    for(const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if(cookie.name === name) {
            return cookieValue;
        }
    }
    return null;
}*/

function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        checkAuth();
    }, []);

    const login = useCallback(async (email, password) => {
        let username = email;
        dispatch({ type: 'LOGIN_START' });
        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST', 
                headers: { 'content-type': 'application/json'},
                body: JSON.stringify({ username, password }),
            });

            if(!response.ok) {
                throw new Error('Login failed');
            }

            const {token, user} = await response.json();
            setCookie('authToken', token);
            
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
        deleteCookie('authToken');
        dispatch({ type: 'LOGOUT' });
    }, []);

    const checkAuth = useCallback(async () => {
        dispatch({ type: 'CHECK_AUTH_START' });
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                dispatch({ type: 'CHECK_AUTH_ERROR' });
                return;
            }

            const user = await response.json();
            
            dispatch({ type: 'CHECK_AUTH_SUCCESS', payload: user });
        } catch(error) {
            dispatch({ type: 'CHECK_AUTH_ERROR' });
        }
    }, [] );

    function decodeJWT(token) {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid token format');
        }

        const decoded = JSON.parse(atob(parts[1]));
        return decoded;
    }

    function isTokenExpired(token) {
        try {
            const payload = decodeJWT(token);
            return Date.now() >= payload.exp * 1000;
        } catch {
            return true;
        }
    }

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