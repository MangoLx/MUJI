define(['jquery', 'template', 'url'], function($, template, url) {
    class CommItem{
        constructor(){
            this.init();
        }
        init(){
            // 先把ul添加到index上
            new Promise((resolve, reject) => {
                // 加载
                $('#index_comm_item').load('/html/component/index_comm_item.html', () => {
                    resolve()
                })
            }).then(() => {
                // 请求数据
                new Promise((resolve, reject) => {
                    $.ajax({
                        url: url.baseUrlRap + 'index_comm',
                        type: 'get',
                        dataType: 'json',
                        success: function (res) {  
                            resolve(res);
                        }
                    })
                }).then((res) => {
                    if(res.res_code === 1){
                        let list = res.res_body;
                        // template渲染
                        let html = template('index_comm_template', {list});
                        $('#index_comm_item').html(html);
                    }
                })
            })
        }
    }

    return new CommItem();
    
});