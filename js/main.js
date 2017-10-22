requirejs.config({
    paths: {
        jquery: 'jquery-3.2.1.min'
    }
})

/* 内部提供两种方法，第一种是直接调用，第二种是jq插件调用 */
requirejs(['jquery', 'scrollTo'], function ($, scrollTo) {
    /*var scroll = new scrollTo.ScrollTo({
        button: '#backTop',
        pos: 100,
        delay: 500,
        mode: 'go'
    })*/
    $('#backTop').backTop({
        pos: 0,
        delay: 500,
        mode: 'move'
    })
})