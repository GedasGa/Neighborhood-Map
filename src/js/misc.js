//Resizing #map height, so it could fill up full window height.
$(window).resize(function () {
    var h = $(window).height(),
        offsetTop = 56; // Calculate the top offset

    $('#map').css('height', (h - offsetTop));
}).resize();

// On #menu-toggle button click add class 'toggled'
// to #wrapper, #menu-toggle and #foursquare-img
$('#menu-toggle').click(function (e) {
    e.preventDefault();
    $('#wrapper').toggleClass('toggled');
    $('#menu-toggle').toggleClass('toggled');
    $('#foursquare-img').toggleClass('toggled');
});
