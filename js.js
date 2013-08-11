(function ($) {
    var methods = {
        init: function (options) {
            var settings = $.extend({
                onSelect: function (key, val) {

                }
            }, options);

            return this.each(function () {
                var $this = $(this),
                    data = $this.data('flatSelector');

                if (!data) {
                    $this.data('flatSelector', {
                        target: $this
                    });
                }

                $this.addClass('flatSelector-select').after('<div class="flatSelector"></div>');

                var $container = $this.next('.flatSelector'),
                    list = [];

                $this.find('option').each(function () {
                    list.push({
                        key: $(this).val(),
                        val: $(this).html()
                    });
                });

                $this.data('list', list);

                var html = '<div class="flatSelector-current"></div>' +
                    '<div class="flatSelector-list">' +
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

                $container.find('.flatSelector-current').html($this.val());

                $container.find('ul>li>a').off('click').on('click', function (e) {
                    options.onSelect($(this).data('key'), $(this).html());
                    $container.find('.flatSelector-current').html($(this).html());
                    $container.find('.flatSelector-list').slideUp(150);

                    e.preventDefault();
                });

                $container.find('.flatSelector-current').on('click', function () {
                    $container.find('.flatSelector-list').slideDown(150);

                    $(document).on('click.flatSelector', function(e){
                        if($(e.target).closest('.flatSelector').length == 0){
                            $container.find('.flatSelector-list').slideUp(150);
                        }
                    });
                });
            });
        },

        destroy: function () {
            return this.each(function () {
                var $this = $(this);
                $this.removeData().removeClass('flatSelector-select').next('.flatSelector').remove();
            })
        }
    };

    $.fn.flatSelector = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.flatSelector');
        }
    };
})(jQuery);

$(function () {
    $('.s').flatSelector({
        onSelect: function (key, val) {

        }
    });
});