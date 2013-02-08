/*
	Copyright (c) 2013 
	Maier, Tobias (http://tobi-maier.de)
	Willmer, Jens (http://jwillmer.de)	
	
	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:
	
	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	
	smarTiles: A jQuery Plugin that creates colorfull tiles similar to Windows 8 tiles.
	@author: Willmer, Jens & Maier, Tobias
	@url: https://github.com/jwillmer/smarTiles
	@documentation: https://github.com/jwillmer/smarTiles/wiki
*/
; (function ($) {
    $.fn.extend({
        smarTiles: function (options) {

            this.defaultColorSchemes = {
                blue: {
                    backgroundContent: '#3F9AC9',
                    backgroundTitle: '#182B45',
                    textContent: 'black',
                    textLabel: 'white'
                },
                yellow: {
                    backgroundContent: '#E3B949',
                    backgroundTitle: '#606061',
                    textContent: 'black',
                    textLabel: 'white'
                },
                red: {
                    backgroundContent: '#AF0837',
                    backgroundTitle: '#6B0F24',
                    textContent: 'black',
                    textLabel: 'white'
                },
                green: {
                    backgroundContent: '#BECD1A',
                    backgroundTitle: '#193725',
                    textContent: 'black',
                    textLabel: 'white'
                }
            };

            this.defaultOptions = {
                label: {
                    text: '',
                    sub: '',
                    animation: 'transparent',
                    icon: 'jens',
                    iconUrl: '',
                    iconPosition: '0px 0px'
                },
                content: '',
                format: {
                    resizeImages: true,
                    switchContent: false

                },
				toolTip: '',
				colorScheme: 'blue',
				colors: {
                    backgroundContent: '',
                    backgroundTitle: '',
                    textContent: '',
                    textLabel: ''
                },
				baseWidth: 250,
				baseHeight: 250,
				basePadding: 10,
				baseMargin: 5,
				xSize: 1,
				ySize: 1,
				size: 0
				// isContentScrollable: 
				
                // titleIcon: 
                // 	create 10 base icons and let the user insert a sprite to extend the icon collection
                // 	add a plugin constructor for this purpose?
            };

            var settings = $.extend(true, {}, this.defaultOptions, options);
            if (settings.colorScheme != '') {
                if (this.defaultColorSchemes[settings.colorScheme]) {
                    var scheme = this.defaultColorSchemes[settings.colorScheme];
                    for (var i in scheme) {
                        if (typeof settings.colors[i] != 'undefined' && settings.colors[i] == '') {
                            settings.colors[i] = scheme[i];
                        }
                    }
                }
            }

            // config size
            if (settings.size != 0) {
                settings.xSize = settings.size;
                settings.ySize = settings.size;
            }
            settings.computedWidth = (settings.baseWidth * settings.xSize) + (settings.baseMargin * (settings.xSize - 1) * 2);
			settings.computedHeight = (settings.baseHeight * settings.ySize) + (settings.baseMargin * (settings.ySize - 1) * 2);
			settings.computedMargin = settings.baseMargin;
			settings.computedPadding = settings.basePadding;
			settings.computedLabelHeight = Math.ceil(settings.baseWidth / 6);
			if (settings.computedLabelHeight < 30) {
			    settings.computedLabelHeight = 30;
			}

            // config label icon
			if (settings.label.icon != '' && settings.label.iconUrl == '') {
			    settings.label.iconUrl = 'data:image/png;base64,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';
			    var labelIconPositions = {
			        'jens': '0px 0px'
			    }
			    if (typeof labelIconPositions[settings.label.icon] != 'undefined') {
			        settings.label.iconPosition = labelIconPositions[settings.label.icon];
			    }
			}

			function changeContent(element, contentArray, oldIndex) {
			    var nextIndex = (oldIndex == contentArray.length - 1) ? 0 : oldIndex + 1;
			    element.html(contentArray[nextIndex]);
			    window.setTimeout(function () { changeContent(element, contentArray, nextIndex); }, 1000);
			}

            return this.each(function () {
                var $this = $(this);
                var thisSettings = $.extend({}, settings);

				//var width = 250;
				//var height = 250;
				//$('<style>').text('.st_tile .st_tileContent img { width: ' + width + 'px; height: ' + height + 'px; }')
				//			.appendTo('head');
							
				//$('<style>').text('.st_one { width: ' + width + 'px; height: ' + height + 'px; }')
				//			.appendTo('head');

				
                // config label
                if (thisSettings.label.text == '') {
                    if (typeof $this.data('label') != 'undefined') {
                        thisSettings.label.text = $this.data('label');
                    }
                }
                if (thisSettings.label.sub == '') {
                    if (typeof $this.data('sublabel') != 'undefined') {
                        thisSettings.label.sub = $this.data('sublabel');
                    }
                }
				// config tooltip
				if(thisSettings.toolTip != '') {
					$this.attr('title', thisSettings.toolTip)
				}
				
		
                // config content
				if (thisSettings.content == '') {
                    thisSettings.content = $this.html();
                }
				if (/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(thisSettings.content)){
					thisSettings.content = '<img src="' + thisSettings.content + '" />';
				}
				thisSettings.computedContent = [];
				if (thisSettings.format.switchContent) {
				    var i = 0;
				    $this.children().each(function () {
				        thisSettings.computedContent[i] = $(this).html();
				        i++;
				    });
				} else {
				    thisSettings.computedContent[0] = thisSettings.content;
				}

                // modify cursor
                var cursor = 'default';
                if (typeof $this.attr('onclick') != 'undefined') {
                    cursor = 'pointer';
                }

                // prepare label
                var labelIcon = '';
                if (thisSettings.label.iconUrl != '') {
                    labelIcon = '<div style="background-image: url(' + thisSettings.label.iconUrl + '); '
                                +'background-position: ' + thisSettings.label.iconPosition + '; '
                                +'background-repeat: no-repeat; '
                                +'width: ' + thisSettings.computedLabelHeight + 'px; '
                                +'height: ' + thisSettings.computedLabelHeight + 'px; '
                                +'float: left; margin: -5px 5px -5px -12px;"></div>';
                }
                var labelCss = {
                    'position': 'absolute',
                    'overflow': 'hidden',
                    'height': thisSettings.computedLabelHeight + 'px',
                    'bottom': 0,
                    'left': 0,
                    'right': 0
                };
                var labelCssMinimized = {
                    'height': '10px'
                };
                var labelCssForeground = {
                    'position': 'absolute',
                    'top': 0,
                    'bottom' : 0,
                    'left': 0,
                    'right': 0,
                    'white-space' : 'nowrap',
                    'padding': '5px 12px',
                    'text-align': 'left',
                    'font-size': (thisSettings.computedLabelHeight - 10) + 'px',
                    'line-height': (thisSettings.computedLabelHeight - 10) + 'px',
                    'color': thisSettings.colors.textLabel
                };
                var labelCssTransparent = {
                    'opacity': '.5',
                    '-ms-filter': 'progid:DXImageTransform.st_Microsoft.st_Alpha(opacity=50)',
                    'filter': 'progid:DXImageTransform.st_Microsoft.st_Alpha(opacity=50)',
                    'background-color': thisSettings.colors.backgroundTitle
                };

                // create tile
                $this.addClass('st_tile')
					 .css('background-color', thisSettings.colors.backgroundContent)
					 .css('cursor', cursor)
                     .css('width', thisSettings.computedWidth+'px')
                     .css('height', thisSettings.computedHeight + 'px')
                     .css('margin', thisSettings.computedMargin + 'px')
					 .html('')
                     .append($("<div>")
                                .attr('class', 'st_tileContent')
                                .css('padding', thisSettings.computedPadding + 'px')
                                .css('overflow', 'hidden')
                                .css('width', (thisSettings.computedWidth - 2 * thisSettings.computedPadding) + 'px')
							    .css('color', thisSettings.colors.textContent + 'px')
								.html(thisSettings.computedContent[0]));
                if (thisSettings.label.animation == 'slideup') {
                    var $label = $('<div/>')
                               .css(labelCss)
                               .css(labelCssMinimized)
                               .append($('<div/>')
                                       .css(labelCssForeground)
                                       .css(labelCssTransparent)
                                       .html(labelIcon + thisSettings.label.text))
                               .append($('<div/>')
                                       .css(labelCssForeground)
                                       .html(labelIcon + thisSettings.label.text));
                    $this.append($label).hover(function () {
                        $label.animate({ 'height': thisSettings.computedLabelHeight + 'px' });
                    }, function () {
                        $label.animate({ 'height': '10px' });
                    });
                } else if (thisSettings.label.animation == 'slidesub') {
                    var labelHeight = (thisSettings.label.text == '') ? 0 : thisSettings.computedLabelHeight;
                    var subLabel = '<p style="white-space:normal; '
                                    +'font-size: ' + (thisSettings.computedLabelHeight - 24) + 'px; '
                                    +'line-height: ' + (thisSettings.computedLabelHeight - 20) + 'px;">' + thisSettings.label.sub + '</p>';
                    var $label = $('<div/>')
                               .css(labelCss)
                               .css('height', labelHeight + 'px')
                               .append($('<div/>')
                                       .css(labelCssForeground)
                                       .css(labelCssTransparent)
                                       .html(labelIcon + thisSettings.label.text + subLabel))
                               .append($('<div/>')
                                       .css(labelCssForeground)
                                       .html(labelIcon + thisSettings.label.text + subLabel));
                    $this.append($label).hover(function () {
                        $label.animate({ 'height': thisSettings.computedHeight + 'px' });
                    }, function () {
                        $label.animate({ 'height': labelHeight + 'px' });
                    });
                } else if (thisSettings.label.animation == 'transparent') {
                    var $label = $('<div/>')
                               .css(labelCss)
                               .append($('<div/>')
                                       .css(labelCssForeground)
                                       .css(labelCssTransparent)
                                       .html(labelIcon + thisSettings.label.text))
                               .append($('<div/>')
                                       .css(labelCssForeground)
                                       .html(labelIcon + thisSettings.label.text));
                    $this.append($label);
                }

                if (thisSettings.format.resizeImages) {
                    $this.find('img')
                                .css('border-width', '0px')
                                .css('margin', '-'+thisSettings.computedPadding+'px')
                                .css('width', thisSettings.computedWidth + 'px')
                                .css('height', thisSettings.computedHeight + 'px');
                }
                if (thisSettings.format.switchContent) {
                    window.setTimeout(function () { changeContent($this.children(':first'), thisSettings.computedContent, 0); }, 1000);
                }
            });
        }
    });
})(jQuery);
