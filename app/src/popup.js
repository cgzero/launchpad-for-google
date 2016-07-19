/**
 * @file popup js file
 * @author cgzero(cgzero@cgzero.com)
 * @date 2016-07-19
 */

(function () {
    $('#wrapper').mCustomScrollbar({
        scrollInertia: 150,
        theme: 'dark',
        // autoHideScrollbar: true,
        callbacks: {
            whileScrolling: function () {
                var moreBtn = $('.more');
                var container = $('.mCSB_dragger');

                container
                    .removeClass('hidden')
                    .addClass('visible');

                moreBtn
                    .removeClass('visible')
                    .addClass('hidden');

                var offsetTop = this.find('#container').offset().top;
                if (offsetTop > -5) {
                    container
                        .removeClass('visible')
                        .addClass('hidden');

                    moreBtn
                        .removeClass('hidden')
                        .addClass('visible');
                }
            },
            onTotalScrollBack: function () {}
        }
    });

    $('.mCSB_dragger')
        .removeClass('visible')
        .addClass('hidden');

    $('.more').on('click', function (e) {
        e.preventDefault();
        $('#wrapper').mCustomScrollbar('scrollTo', 'bottom');
    });
})();
