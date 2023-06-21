export default function ({ $axios, $config, redirect, $cookies }) {

    const refresh_token = $cookies.get('refresh_token');

    setInterval(async () => {
        // const { data }  = await $axios.post(`${$config.apiUrl}/auth/refresh`, {
        //     refresh_token: refresh_token,
        //     mode: 'json'
        // }).then((res) => res.data)

        // $cookies.remove('access_token') 
        // $cookies.remove('refresh_token')
        // $cookies.set('access_token', data.access_token)
        // $cookies.set('refresh_token', data.refresh_token)

        redirect('/?expired=true')
    }, 900000)
}