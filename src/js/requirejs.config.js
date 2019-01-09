require.config({
    baseUrl: '/',
    paths: {
        'jquery': 'libs/jquery/jquery-1.11.3.min',
        'cookie': 'libs/jquery/jquery-plugins/jquery.cookie',
        'parabola': 'libs/jquery/jquery-plugins/parabola',
        'header': 'js/component/header',
        'footer': 'js/component/footer',
        'section': 'js/component/section',
        'url': 'js/component/url',
        'template': 'libs/template/template-web',
        'index_comm_item': 'js/component/index_comm_item',
        'index_new_item': 'js/component/index_new_item',
        'list_item': 'js/component/list_item'
    },
    shim: {
        'cookie': {
            deps: ['jquery']
        },
        'parabola': {
            deps: ['jquery']
        }
    }
})