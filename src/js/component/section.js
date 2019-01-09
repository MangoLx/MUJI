define(['jquery', 'cookie'], function($) {
    class Section{
        constructor(){
            this.init().search();
        }
        init(){
            new Promise(function (resolve, reject) {  
                $('section').load('/html/component/section.html', function () {  
                    resolve();
                })
            }).then(function () { 
                // 搜搜按钮监听
                $('.search').on('submit', function (e) {
                    e.preventDefault();
                    // 表单元素序列化  
                    let str = $('.search').serialize();
                    $.getJSON("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&"+str, function (res) {
                        let data = res.s;
                        $('.search-result').empty().show();
                        data.forEach((item, i) => {
                            $('<li>').html(item).appendTo($('.search-result'))
                        });       
                    });
                    $('.search-result').on('click', 'li', function () {  
                        $("input[type=text]").val($(this).text());
                        $('.search-result').hide();
                    });
                })
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
            });
            return this;
        }
        search(){
            
        }
    }
    return new Section();
});