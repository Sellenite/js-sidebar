requirejs.config({
    paths: {
        jquery: 'jquery-3.2.1.min'
    }
})

requirejs(['jquery', 'scrollTo'], function ($, scrollTo) {
	var scroll = new scrollTo.ScrollTo({
		pos: 100,
		delay: 500
	})
    var backTop = $('#backTop')
    // 节流函数
    function debounce(fn, delay) {
        let timer
        return function (...args) {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, delay)
        }
    }

    // 检测显示
    function checkPosition() {
        var clientHeight = $(window).height()
        if ($(window).scrollTop() > clientHeight) {
            backTop.fadeIn()
        } else {
            backTop.fadeOut()
        }
    }
    checkPosition()

    // $.proxy代替bind，兼容ie8
    // backTop.on('click', scroll.move.bind(scroll))
    backTop.on('click', $.proxy(scroll.move, scroll))

    // 监听滚动
    $(window).on('scroll', debounce(checkPosition, 300))
})