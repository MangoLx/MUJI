// 注册页面的业务逻辑
require(['./requirejs.config'], () => {
    require(['url', 'jquery', 'header', 'footer'], (url) => {
        let inputs = $('input');
        let btn = $('#btn');
        let userName = $('#username'),
            passWord = $('#password'),
            rePwd = $('#repwd'),
            tel = $('#tel'),
            addr = $('#addr');
        let ok = false;
        // input失去焦点事件
        inputs.on('blur', function () {  
            if(userName.val() !== '' && passWord.val() !== '' 
            && rePwd.val() !== '' && tel.val() !== '' 
            && addr.val() !== ''){
                btn.addClass('ok');
                ok = true;
            }else{
                btn.removeClass('ok');
                ok = false;
            }  
        })

        // 提交按钮设置事件
        btn.on('click', function () {
            if(ok){
                if(judge()){
                    // 可以提交
                    new Promise((resolve, reject) => {
                        $.ajax({
                            url: url.baseUrlPhp + 'v1/register.php',
                            type: 'post',
                            dataType: 'json',
                            data: {
                                username : userName.val(),
                                password : passWord.val(),
                                tel : tel.val(),
                                addr : addr.val()
                            },
                            success: function (res) {  
                                resolve(res);
                            }
                        })
                    }).then((res) => {
                        if(res.res_code){
                            warning(res.res_msg);
                            setTimeout(() => {
                                window.location.href = '/html/login.html';
                            }, 2000);
                        }else{
                            warning(res.res_msg);
                        }
                    })
                }
            }
        })
        // 1. 正则判断输入是否合法
        function judge() {
            // 获取需要的输入项
            let uReg = /^\w{6,15}$/,
                pReg = /^.{6,}$/,
                tReg = /^1\d{10}$/,
                aReg = /^.+$/;

            // 判断是否合法
            if(!uReg.test(userName.val())){
                warning('用户名不规范');
                return false;
            }else if(!pReg.test(passWord.val())){
                warning('密码6位以上');
                return false;
            }else if(passWord.val() !== rePwd.val()){
                warning('密码输入不一致');
                return false;
            }else if(!tReg.test(tel.val())){
                warning('手机号码不规范')
                return false;
            }else if(!aReg.test(addr.val())){
                warning('地址不规范')
                return false;
            }
            return true;
        }
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