// 首页业务逻辑
require(['./requirejs.config'], () => {
    require(['jquery', 'header', 'footer', 'section', 'cookie', 'index_comm_item', 'index_new_item'], () => {
        (function () {  
            // 轮播图
            carousel();
            // 新商品滑动
            newProductsControl();
            // 监听商品点击
            toDetail();
        })()


        // 轮播图函数
        function carousel() {  
            // 获得标签
            let box = $('#banner'),
                ul = box.find('ul'),
                ol = box.find('ol'),
                aLis = ul.children();

            let btns = [];

            let timer = null;
            let liWidth = aLis.eq(0).width();
            let len = aLis.length;
            let index = 0;

            let flag = true;

            // 创建控制按钮
            for(let i = 1; i <= len; i++){
                btns.push($('<li>').addClass(i === 1 ? 'cur' : '').appendTo(ol))
            }

            // 添加第一张图片到最后
            ul.append(aLis.eq(0).clone(true));
            ul.width((len + 1) * liWidth);

            for(let i = 0; i < len; i++){
                btns[i].on('click', function () {  
                    btns[index].removeClass('cur');
                    index = $(this).addClass('cur').index();
                    // 移动
                    ul.stop().animate({left: -liWidth * index}, 'slow', function () {  

                    })
                })
            }

            // 下一张
            $('#goNext').on('click', function () {  
                if(flag){
                    flag = false;
                    btns[index].removeClass('cur');
                    if(++index >= len){
                        ul.stop().animate({left: -liWidth * index}, 'slow', function () {  
                            ul.css({left: 0});
                            flag = true;
                        })
                        index = 0;
                    }else{
                        ul.stop().animate({left: -liWidth * index}, 'slow', function () {  
                            flag = true;
                        })
                    }
                    btns[index].addClass('cur');
                }
            });

            // 下一张
            $('#goPrev').on('click', function () { 
                if(flag){
                    flag = false;
                    btns[index].removeClass('cur');
                    if(--index < 0){
                        ul.css({left: -liWidth * len});
                        index = len - 1;
                    }
                    btns[index].addClass('cur');
                    ul.stop().animate({left: -index * liWidth}, 'slow', function () {  
                        flag = true;
                    })
                } 
            });

            // 自动轮播
            box.hover(function () {  
                clearInterval(timer);
                $('#goNext').animate({opacity: 1}, 800);
                $('#goPrev').animate({opacity: 1}, 800);
            }, (function autoPlay() { 
                $('#goNext').animate({opacity: 0}, 800);
                $('#goPrev').animate({opacity: 0}, 800); 
                timer = setInterval(() => {
                    $('#goNext').trigger('click');
                }, 2000);
                return autoPlay;
            })());

            
        }
        // 新商品函数
        function newProductsControl() {  
            let dis = 0;
            let newProducts = $('#index_new_item');
            // 向前滑动
            $('#goNewPrev').on('click', function () {  
                dis -= 50;
                if(dis < -260){
                    dis = -260;
                }
                newProducts.stop().animate({left: dis});
            })

            // 向后滑动
            $('#goNewNext').on('click', function () {  
                dis += 50;
                if(dis > 0){
                    dis = 0;
                }
                newProducts.stop().animate({left: dis});
            })
        }
        // 主页点击跳转详情函数
        function toDetail() {  
            // 事件委托
            $('#index_comm_item').on('click', 'li', function () { 
                location.href = '/html/detail.html?=' + $(this).data('id');
            })
        }
    })
})