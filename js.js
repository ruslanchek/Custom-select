(function ($) {
    'use strict';

    var methods = {
        init: function (options) {
            var settings = $.extend({
                maxLines: 5,
                onSelect: function (key, val) {

                }
            }, options);

            return this.each(function () {
                var $this = $(this),
                    data = $this.data('customSelector');

                if (!data) {
                    $this.data('customSelector', {
                        target: $this
                    });
                }

                $this.addClass('customSelector-select').after('<div class="customSelector"></div>');

                var $container = $this.next('.customSelector'),
                    list = [];

                $this.find('option').each(function () {
                    list.push({
                        key: $(this).val(),
                        val: $(this).html()
                    });
                });

                $this.data('list', list);

                var html = '<div class="customSelector-current"></div>' +
                    '<div class="customSelector-arrow"></div>' +
                    '<div class="customSelector-list">' +
                    '<ul>';

                for (var i = 0, l = list.length; i < l; i++) {
                    var classname = '';

                    if (list[i].key == $this.val()) {
                        classname = 'active';
                    }

                    html += '<li><a class="' + classname + '" href="#" data-key="' + list[i].key + '">' + list[i].val + '</a></li>';
                }

                html += '</ul></div>';

                $container.html(html);

                $container.find('.customSelector-list ul').css({
                    maxHeight: options.maxLines * 27
                });

                $container.find('.customSelector-current').html($this.find('option:selected').html());

                $container.find('ul>li>a').off('click').on('click', function (e) {
                    $container.find('ul>li>a').removeClass('active');
                    $(this).addClass('active');

                    options.onSelect($(this).data('key'), $(this).html());
                    $container.find('.customSelector-current').html($(this).html());

                    $container.find('.customSelector-list').slideUp(150);
                    $container.addClass('customSelectorActive');

                    $this.val($(this).data('key'));

                    e.preventDefault();
                });

                $container.find('.customSelector-current').on('click', function () {
                    if($container.find('.customSelector-list').is(':visible')){
                        $container.find('.customSelector-list').slideUp(150);
                        $container.removeClass('customSelectorActive');
                    }else{
                        $container.find('.customSelector-list').slideDown(150);
                        $container.addClass('customSelectorActive');
                    }

                    $(document).on('click.customSelector', function(e){
                        if($(e.target).closest('.customSelector').length == 0){
                            $container.find('.customSelector-list').slideUp(150);
                            $container.removeClass('customSelectorActive');
                        }
                    });
                });
            });
        },

        destroy: function () {
            return this.each(function () {
                var $this = $(this);
                $this.removeData().removeClass('customSelector-select').next('.customSelector').remove();
            })
        }
    };

    $.fn.customSelector = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.customSelector');
        }
    };
})(jQuery);