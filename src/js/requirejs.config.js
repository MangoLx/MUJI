require.config({
    baseUrl: '/',
    paths: {
        'jquery': 'libs/jquery/jquery-1.11.3.min',
        'cookie': 'libs/jquery/jquery-plugins/jquery.cookie',
        'header': 'js/component/header',
        'footer': 'js/component/footer',
        'section': 'js/component/section',
        'url': 'js/component/url'
    },
    shim: {
        'cookie': {
            deps: ['jquery']
        }
    }
})