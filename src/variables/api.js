import ky from 'ky';

export const API_BASE = 'http://localhost:5000';

export const api = ky.create({
    prefixUrl: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
    hooks: {
        beforeRequest: [
            (request) => {
                const token = localStorage.getItem('token');
                if (token) {
                    request.headers.set('Authorization', `Bearer ${token}`);
                }
            },
        ],
    },
    retry: {
        limit: 3,
        methods: ['get', 'post'],
        statusCodes: [500],
    },
})
