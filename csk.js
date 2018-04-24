(function($) {
    $.fn.transferItem = function(options) {
        function transferItem($this, options) {
            this.init($this, options)
        }
        transferItem.prototype = {
            init: function($this, options) {
                this.el = $this;
                this.ul = this.el.find('ul.ty-tree-select')
                this.addBtn = this.el.find('.add')
                this.allAddBtn = this.el.find('.allAdd')
                this.removeBtn = this.el.find('.remove')
                this.allRemBtn = this.el.find('.allRem')
                this.qxBtn = this.el.find('.qx')
                this.syBtn = this.el.find('.sy')
                this.xyBtn = this.el.find('.xy')
                this.xz();
                this.addClick();
                this.addAllClick();
                this.removeClick();
                this.allRemClick();
                this.qx();
                this.syClick();
                this.xyClick();
            },
            //选中事件
            xz: function() {
                var me = this,
                    timer = null;
                //单机选中事件 大于100毫秒点击的算双击
                this.ul.on('click', 'li', function(e) {
                        var _this = $(this);
                        clearTimeout(timer);
                        timer = setTimeout(function() {
                            if (_this.hasClass('active')) {
                                _this.removeClass('active')
                            } else {
                                _this.addClass('active')
                            }
                        }, 100);
                    })
                    //双击添加事件
                this.ul.on('dblclick', 'li', function(e) {
                    var _this = $(this);
                    clearTimeout(timer);
                    _this.addClass('active')
                    if ($(this).parent().hasClass('ty-tree-select-left')) {
                        me.add()
                    } else {
                        me.remove()
                    }

                })
            },
            //取消
            qx: function() {
                var me = this;
                this.qxBtn.on('click', function() {
                    me.rightLis.filter(function(index, item) {
                        var $this = $(this);
                        $this.remove()
                        me.right.append($this.removeClass('active'))
                    })
                    me.leftLis.filter(function(index, item) {
                        var $this = $(this);
                        $this.remove()
                        me.left.append($this.removeClass('active'))
                    })
                })
            },
            //点击添加触发
            addClick: function() {
                var me = this;
                this.addBtn.on('click', function() {
                    me.add()
                })
            },
            //全部添加触发
            addAllClick: function() {
                var me = this;
                this.allAddBtn.on('click', function() {
                    me.add('all')
                })
            },
            //点击移除触发
            removeClick: function() {
                var me = this;
                this.removeBtn.on('click', function() {
                    me.remove(this)
                })
            },
            //全部移除触发
            allRemClick: function() {
                var me = this;
                this.allRemBtn.on('click', function() {
                    me.remove(this, 'all')
                })
            },
            //上移事件触发
            syClick: function() {
                var me = this;
                this.syBtn.on('click', function() {
                    me.sy()
                })
            },
            //下移事件触发
            xyClick: function() {
                var me = this;
                this.xyBtn.on('click', function() {
                    me.xy()
                })
            },
            //添加事件
            add: function(type) {
                var me = this;
                $('.transfer-list-left ul.ty-tree-select li').filter(function(index, item) {
                    var $this = $(this)
                    if (type == 'all') {
                        $this.remove()
                        me.right.append($this.removeClass('active'))
                        return
                    }
                    if ($(item).hasClass('active')) {
                        $this.remove();
                        me.right.append($this.removeClass('active'))
                    }
                })
            },
            //移除事件
            remove: function($this, type) {
                var me = this;
                $('.transfer-list-right ul.ty-tree-select li').filter(function(index, item) {
                    var $this = $(this)
                    if (type == 'all') {
                        $this.remove()
                        me.left.append($this.removeClass('active'))
                        return
                    }
                    if ($(item).hasClass('active')) {
                        $this.remove();
                        me.left.append($this.removeClass('active'))
                    }
                })
            },
            //上移
            sy: function() {
                var me = this;
                $('.transfer-list-right ul.ty-tree-select li').filter(function(index, item) {
                    if ($(item).hasClass('active')) {
                        if (index) {
                            var s = $(item).prev();
                            $(item).remove();
                            $(s).before(item);
                        }
                    }
                })
            },
            //下移
            xy: function() {
                var me = this;
                var len = $('.transfer-list-right ul.ty-tree-select li').length;
                $('.transfer-list-right ul.ty-tree-select li').filter(function(index, item) {
                    if ($(item).hasClass('active')) {
                        if (index < len - 1) {
                            var next = $(item).next();
                            $(item).remove();
                            $(next).after(item);
                        }
                    }
                })
            }
        }

        new transferItem(this, options)
    }
})(jQuery)