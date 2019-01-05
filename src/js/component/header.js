define(['jquery'], () => {
    class Header{
        constructor(){
            this.init();
        }
        init(){
            // 加载header.html
            new Promise((resolve, reject) => {
                $('header').load('/html/component/header.html', () => {
                    resolve();
                })
            }).then(() => {
                console.log('header');
            })
        }
    }
    return new Header();
});