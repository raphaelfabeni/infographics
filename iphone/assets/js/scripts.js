// Config page
var config = {
    // Element
    graph: $('#graph'),
    steps : $('.step'),
    cover: $('#cover'),

    // Count options
    optionsCount: {
        useEasing : true, 
        useGrouping : true, 
        separator : '.', 
        decimal : '.',
        prefix : '',
        suffix : ''
    }
};

// // Disable info for older browsers
function disableInfo() {
    if( $('html').hasClass('ie9') || $('html').hasClass('ie8') ) {
        var staticInfo = $('<img>', { src:'infografico-apple.png'});
        config.graph.empty().addClass('container-static').append(staticInfo);
    }
}

// Check step elements
function checkElement() {

    // Store the variables
    var windowHeight = window.innerHeight,
        halfHeight   = windowHeight / 2,
        size         = halfHeight / 4,
        distance     = window.scrollY,
        graphHeight  = config.graph.offsetHeight;
    
    // Loop for the steps
    for(var i = 0; i < config.steps.length; i++) {

        // Get information about the current element
        var info = config.steps[i].getBoundingClientRect();

        if( (halfHeight + size) > info.top ) {
            $(config.steps[i]).removeClass('preload');
        }

        if((windowHeight + distance) >= graphHeight) {
            $(config.steps).last().removeClass('preload');
        }
    }
    
}

var tweets01 = new countUp("tweets-01", 0, 25087, 0, 1.5, config.optionsCount),
    tweets02 = new countUp("tweets-02", 0, 2430086, 0, 1.5, config.optionsCount);


function start() {

    $('.graph-intro').removeClass('preload');

    setTimeout(function(){
        tweets01.start();
        tweets02.start();
    }, 1200);
}

jQuery(document).ready(function($) {

    disableInfo();
    
    $(window).on('scroll', function() {
        checkElement();
    });

});

jQuery(window).load(function () {
    config.cover.addClass('loaded');

    setTimeout(start, 600);
});