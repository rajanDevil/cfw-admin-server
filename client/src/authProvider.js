import inMemoryJWT from './inMemoryJWT';
const authProvider = {
    // called when the user attempts to log in
    login: ({ username, password }) => {
        const email = username;

        const request = new Request('http://52.200.24.125:8080/users/loginMe', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
                
            })
            .then(response => {
                localStorage.setItem('token', response.result.token);
                inMemoryJWT.setToken(response.result.token);
                console.log(localStorage.getItem('token'));
            });

        // accept all username/password combinations
       
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },

    checkAuth: () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },

    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getPermissions: () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },
};

export default authProvider;