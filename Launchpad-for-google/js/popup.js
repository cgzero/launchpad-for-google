$(document).ready(function() {
    var $mCSBDragger = $(".mCSB_dragger");
    var $more = $(".more");
    $("#wrapper").mCustomScrollbar({
        scrollInertia:150,
        theme:'dark',
        // autoHideScrollbar: true,
        callbacks: {
            whileScrolling : function() {
                $(".mCSB_dragger").removeClass('hidden').addClass('visible');
                $more.removeClass('visible').addClass('hidden');
                var offsetTop = this.find('#container').offset().top;
                if(offsetTop > -5) {
                    $(".mCSB_dragger").removeClass('visible').addClass('hidden');
                    $more.removeClass('hidden').addClass('visible');                
                }
            },
            onTotalScrollBack : function() {

            }
        }
    });
    $(".mCSB_dragger").removeClass('visible').addClass('hidden');
    $more.on('click', function(e){
        e.preventDefault();
        $("#wrapper").mCustomScrollbar("scrollTo","bottom");
    });
});