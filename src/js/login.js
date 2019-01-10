// 登录页业务逻辑
require(['./requirejs.config'], () => {
    require(['url', 'jquery', 'header', 'footer', 'cookie'], (url) => {
        // 得到标签
        let inputs = $('input');
        let username = $('#username');
        let password = $('#password');
        let btn = $('#btn');

        let ok = false;

        inputs.on('blur', function () {  
            if(username.val() !== '' && password.val() !== ''){
                btn.addClass('ok');
                ok = true;
            }else{
                btn.removeClass('ok');
                ok = false;
            }  
        })
        // 登录按钮监听
        btn.on('click', function () {  
            if(ok){
                // 可以提交
                new Promise((resolve, reject) => {
                    $.ajax({
                        url: url.baseUrlPhp + 'v1/login.php',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            username : username.val(),
                            password : password.val()
                        },
                        success: function (res) {  
                            resolve(res);
                        }
                    })
                }).then((res) => {
                    console.log(res.res_body);
                    warning(res.res_msg);
                    if(res.res_code){
                        // 添加到cookie
                        $.cookie('user', JSON.stringify(res.res_body), {path: '/', expires: 3})
                        // 跳转
                        setTimeout(() => {
                            window.location.href = '/index.html'
                        }, 1500);
                    }
                })
            }
        })

        // 设置warning方法
        function warning(str) {  
            let warning = $('.warning');
            warning.text(str);
            warning.fadeIn(1000, function () {  
                warning.fadeOut(2000);
            })
        }
    })
})