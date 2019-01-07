define(['jquery', 'template', 'url'], function($, template, url) {
    class ListItem{
        constructor(){

        }
        init(){
            // 先把ul添加到index上
            new Promise((resolve, reject) => {
                // 加载
                $('#list-item').load('/html/component/index_comm_item.html', () => {
                    resolve()
                })
            }).then(() => {
                // 请求数据
                new Promise((resolve, reject) => {
                    $.ajax({
                        url: url.baseUrlRap + 'list_item',
                        type: 'get',
                        dataType: 'json',
                        success: function (res) {  
                            resolve(res);
                        }
                    })
                }).then((res) => {
                    if(res.res_code === 1){
                        console.log(res);
                        let list = res.res_body;
                        // template渲染
                        let html = template('index_comm_template', {list});
                        $('#list-item').html(html);
                    }
                })
            })
        }
        addItem(){
            new Promise((resolve, reject) => {
                $.ajax({
                    url: url.baseUrlRap + 'list_item',
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
                    $('#list-item').html($('#list-item').html() + html);
                }
            })
        }
    }

    return new ListItem();
    
});