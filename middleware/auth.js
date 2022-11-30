export default function ({ $axios, redirect, store, $cookies, route }) {
    const jwt = $cookies.get('access_token');

    setInterval(() => {
        store.dispatch('session/refreshToken', jwt);
    }, 500000);
    

    if (!jwt) {
       redirect(`/?redirect=${route.path}`);
    }
}