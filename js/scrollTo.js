define(['jquery'], function ($) {
    function ScrollTo(opts) {
        this.opts = $.extend({}, ScrollTo.DEFAULTS, opts)
        this.$el = $('html, body')
    }

    ScrollTo.prototype.move = function () {
        this.$el.animate({
            scrollTop: this.opts.pos
        }, this.opts.delay)
    }

    ScrollTo.prototype.go = function () {
        this.$el.scrollTop(this.opts.pos)
    }

    ScrollTo.DEFAULTS = {
        pos: 0,
        delay: 300
    }

    return {
    	ScrollTo: ScrollTo
    }
})