export default function ({ $axios, redirect, store, $cookies, route }) {
    const jwt = $cookies.get('access_token');

    if (!jwt) {
       redirect(`/?redirect=${route.path}`);
    }
}