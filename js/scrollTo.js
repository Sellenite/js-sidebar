define(['jquery'], function ($) {
    function ScrollTo(opts, button) {
        this.opts = $.extend({}, ScrollTo.DEFAULTS, opts)
        this.$el = $('html, body')
        button ? this.button = $(button) : this.button = $(this.opts.button)
        this.checkPosition()
        // $.proxy代替bind，兼容ie8
        // backTop.on('click', scroll.move.bind(scroll))
        this.button.on('click', $.proxy(this[this.opts.mode], this))
        // 监听滚动
        $(window).on('scroll', debounce(this.checkPosition.bind(this), this.opts.delay))
    }

    // 节流函数
    function debounce(fn, delay) {
        let timer
        return function (...args) {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                fn.apply(null, args)
            }, delay)
        }
    }

    ScrollTo.prototype.move = function () {
        if (this.judgeAnimate()) {
            this.$el.animate({
                scrollTop: this.opts.pos
            }, this.opts.delay)
        }
    }

    ScrollTo.prototype.go = function () {
        if (this.judgeAnimate()) {
            this.$el.scrollTop(this.opts.pos)
        }
    }

    // 检测显示
    ScrollTo.prototype.checkPosition = function () {
        var clientHeight = $(window).height()
        if ($(window).scrollTop() > clientHeight) {
            this.button.fadeIn()
        } else {
            this.button.fadeOut()
        }
    }

    ScrollTo.prototype.judgeAnimate = function () {
        return $(window).scrollTop() !== this.opts.pos && !this.$el.is(':animated')
    }

    ScrollTo.DEFAULTS = {
        button: null,
        pos: 0,
        delay: 300,
        mode: 'move'
    }

    // jquery插件全局注册
    $.fn.extend({
        backTop: function(opts) {
            // jquery的this.each函数本身的返回值是this，所以可以这么写
            return this.each(function() {
                new ScrollTo(opts, this)
            })
            // return this
        }
    })

    return {
        ScrollTo: ScrollTo
    }
})