define(['jquery', 'cookie'], function() {
    class Section{
        constructor(){
            this.init();
            this.search();
        }
        init(){
            new Promise(function (resolve, reject) {  
                $('section').load('/html/component/section.html', function () {  
                    resolve();
                })
            }).then(function () {  
                let QR_code = $('#QR_code');
                // 鼠标移入显示二维码
                $('#app').hover(function () {
                        // over
                        QR_code.stop().fadeIn(500);
                    }, function () {
                        // out
                        QR_code.stop().fadeOut(500);
                    }
                );
                // 加载cookie
                let user = $.cookie('user') ? JSON.parse($.cookie('user')) : '';
                if(user){
                    $('#login_register').hide();
                    $('#welcome').text(user.username).show();
                    $('#out').show();
                }

                // 为注销设置监听
                $('#out').on('click', function () {  
                    if(confirm('确定退出？')){
                        // 清除cookie
                        $.cookie('user', '', {expires: -1, path: '/'});
                        location.href = '/html/login.html';
                    }
                })
            })
        }
        search(){
            $('.search').on('submit', function (e) {  
                alert(1);
                e.preventDefault();
            })
        }
    }
    return new Section();
});