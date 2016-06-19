/*jslint browser: true, newcap: false */
/*global $, jQuery, escape, console, tmpl, $JssorBulletNavigator$, $JssorSlider$ */
$(function () {
    'use strict';
    // Pictures
    var addSlider,
        masonryInitialized = false,
        activityTemplate = $("#activity_template").html(),
        makeActivity = function (img, title, url) {
            return activityTemplate
                .replace("%img%", img)
                .replace("%title%", title)
                .replace("%url%", url);
        },
        normalizeImages = function () {
            var col_width = $('.discover__sizer').outerWidth();
            $('.discover__img').each(function () {
                var height = $(this).outerHeight(),
                    width = $(this).outerWidth(),
                    ratio = width / height;
                if (ratio > 2) {
                    $(this).width((col_width - 10) * 2 + 10);
                } else {
                    $(this).width(col_width - 10);
                }
            });
        },
        applyMasonry = function () {
            var $grid = $('.discover__activities').imagesLoaded().progress(function () {
                normalizeImages();
                if (masonryInitialized) {
                    $grid.masonry('destroy');
                }
                $grid.masonry({
                    transitionDuration: '0.8s',
                    itemSelector: '.discover__activity',
                    columnWidth: '.discover__sizer',
                    percentPosition: false
                });
                masonryInitialized = true;
            });
        },
        search = function (query) {
            var API_key = '2677792-fb45a0b5e6baefa2301258208',
                searchQuery = escape(query.replace(' ', '+')),
                URL = 'https://pixabay.com/api/?key=' + API_key + '&q=' + searchQuery + '&image_type=photo';
            $.ajax({
                method: 'get',
                url: URL,
                dataType: 'jsonp',
                crossDomain: true,
                success: function searchResult(data) {
                    var i,
                        html = '';
                    for (i = 0; i < data.hits.length; i = i + 1) {
                        html += makeActivity(data.hits[i].webformatURL, data.hits[i].user, data.hits[i].pageURL);
                    }
                    $('.discover__activity').remove();
                    $('.discover__activities').append(html);
                    applyMasonry();
                }
            });
        };

    $('form').submit(function (e) {
        search($('.discover__input').val());
        e.preventDefault();
    });
    $(window).on('resize', function () {
        normalizeImages();
        $('.discover__activities').masonry('layout');
    });

    // Slider
    addSlider = function (sliderId) {
        var elWrap = $('#' + sliderId),
            el =  elWrap.find('.howto__slide'),
            indexImg = 1,
            indexMax = el.length,
            phase = 3000,
            interval,
            btnNext,
            btnPrev;

        function change() {
            el.fadeOut(1000);
            el.filter(':nth-child(' + indexImg + ')').fadeIn(1000);
        }

        function autoChange() {
            indexImg = indexImg + 1;
            if (indexImg > indexMax) {
                indexImg = 1;
            }
            change();
        }
        interval = setInterval(autoChange, phase);

        elWrap.mouseover(function () {
            clearInterval(interval);
        });
        elWrap.mouseout(function () {
            interval = setInterval(autoChange, phase);
        });

        btnNext = $('.howto__next', elWrap);
        btnPrev = $('.howto__prev', elWrap);

        btnNext.click(function () {
            indexImg = indexImg + 1;
            if (indexImg > indexMax) {
                indexImg = 1;
            }
            change();
        });
        btnPrev.click(function () {
            indexImg = indexImg - 1;
            if (indexImg < 1) {
                indexImg = indexMax;
            }
            change();
        });
    };

    // Start
    addSlider('slider1');
    addSlider('slider2');
    addSlider('slider3');
    search('');

});
