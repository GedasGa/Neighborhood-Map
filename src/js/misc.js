$(window).resize(function () {
    var h = $(window).height(),
        offsetTop = 56; // Calculate the top offset

    $('#map').css('height', (h - offsetTop));
}).resize();

$('#menu-toggle').click(function (e) {
    e.preventDefault();
    $('#wrapper').toggleClass('toggled');
    $('#menu-toggle').toggleClass('toggled');
});
