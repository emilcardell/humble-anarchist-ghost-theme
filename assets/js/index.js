/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, sr, undefined) {
    "use strict";

    var $document = $(document),

        // debouncing function from John Hann
        // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
        debounce = function (func, threshold, execAsap) {
            var timeout;

            return function debounced () {
                var obj = this, args = arguments;
                function delayed () {
                    if (!execAsap) {
                        func.apply(obj, args);
                    }
                    timeout = null;
                }

                if (timeout) {
                    clearTimeout(timeout);
                } else if (execAsap) {
                    func.apply(obj, args);
                }

                timeout = setTimeout(delayed, threshold || 100);
            };
        };

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        function updateImageWidth() {
            var $this = $(this),
                contentWidth = $postContent.outerWidth(), // Width of the content
                imageWidth = this.naturalWidth; // Original image resolution

            if (imageWidth >= contentWidth) {
                $this.addClass('full-img');
            } else {
                $this.removeClass('full-img');
            }
        }

        var $img = $("img").on('load', updateImageWidth);
        function casperFullImg() {
            $img.each(updateImageWidth);
        }

        casperFullImg();
        $(window).smartresize(casperFullImg);

        $(".scroll-down").arctic_scroll();


        $('#hamburger').click(function(e){
            $('#hamburger').toggleClass('menu-button--open');
            $('#post-nav').toggle();
        });


    });

    // smartresize
    jQuery.fn[sr] = function(fn) { return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery, 'smartresize');

(function() {

				function SVGHamburger( el, options ) {
					this.el = el;
					this.init();
				}

				SVGHamburger.prototype.init = function() {
					this.shapeEl = this.el.querySelector( 'span.morph-shape' );

					var s = Snap( this.shapeEl.querySelector( 'svg' ) );
					this.pathEl1 = s.select( 'path:nth-of-type(1)' );
					this.pathEl2 = s.select( 'path:nth-of-type(2)' );
					this.paths = {
						reset : {
							path1 : this.pathEl1.attr( 'd' ),
							path2 : this.pathEl2.attr( 'd' )
						},
						open : this.shapeEl.getAttribute( 'data-morph-open' ).split( ';' ),
						close : this.shapeEl.getAttribute( 'data-morph-close' ).split( ';' )
					};

					this.isOpen = false;

					this.initEvents();
				};

				SVGHamburger.prototype.initEvents = function() {
					this.el.addEventListener( 'click', this.toggle.bind(this) );
				};

				SVGHamburger.prototype.toggle = function() {
					var self = this,
						paths = this.isOpen ? this.paths.close : this.paths.open;

					if( self.isOpen ) {
						setTimeout( function() { classie.remove( self.el, 'menu-button--open' ); }, 200 );
					}
					else {
						setTimeout( function() { classie.add( self.el, 'menu-button--open' ); }, 200 );
					}

					this.pathEl1.stop().animate( { 'path' : paths[0] }, 300, mina.easeout, function() {
						self.pathEl1.stop().animate( { 'path' : self.paths.reset.path1 }, 800, mina.elastic );
					} );
					this.pathEl2.stop().animate( { 'path' : paths[1] }, 300, mina.easeout, function() {
						self.pathEl2.stop().animate( { 'path' : self.paths.reset.path2 }, 800, mina.elastic );
					} );

					this.isOpen = !this.isOpen;
				};

				new SVGHamburger( document.getElementById( 'hamburger' ) );

			})();
