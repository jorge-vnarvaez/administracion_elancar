export default function (context) {
    const jwt = context.$cookies.get('access_token');

    if (!jwt) {
        context.redirect(`/?redirect=${context.route.path}`);
    }
}