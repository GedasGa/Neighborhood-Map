//Resizing #map height, so it could fill up full window height.
$(window).resize(function () {
    var h = $(window).height(),
        offsetTop = 56; // Calculate the top offset

    $('#map').css('height', (h - offsetTop));
}).resize();