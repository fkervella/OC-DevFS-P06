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

const login = useCallback(async (email, password) => {
    dispatch({ type: 'LOGIN_START' });
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'aplication/json' },
            body: JSON.stringify({email, password });
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const { token } = await response.json();
        localStorage.setItem('token', token);

        const payload = decodeJWT(token);
        const user = {
            id: payload.userId,
            email: payload.email,
            roles: payload.roles,
            permission: [],
            name: payload.email.split('@')[0],
        };

        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
        dispatch({
            type: 'LOGIN_ERROR',
            peyload: error.message || 'Unknown error',
        });
        trhow error;
    }
}, []);

