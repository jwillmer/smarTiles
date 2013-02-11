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
	@version: 0.0.1
*/
; (function ($) {
    $.fn.extend({
        smarTiles: function (options) {

			// color schemes
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
                },
                white: {
                    backgroundContent: '#FFFFF',
                    backgroundTitle: '#193725',
                    textContent: 'black',
                    textLabel: 'white'
                }
            };

			// default options
            this.defaultOptions = {
                label: { // bottom (label) bar settings
                    text: '', // title/label
                    sub: '', // subtitle
                    animation: 'transparent', // animation effect
                    icon: 'info', // displayed title icon
                    iconUrl: '', // icon (sprite) url
                    iconPosition: '0px 0px' // icon position
                },
                content: '', // tile content
                format: {
                    resizeImages: true, // auto resize images to fit the tile
                    switchContent: false, // switch between multiple tile content
					//switchContentRandom: false, // if switchContent is true switch random between multiple tile content
					hoverEffect: true // set transparency on tiles that lost focus (on mouseleave)
                },
				toolTip: '', // tool tip of the tile
				colorScheme: 'blue', // color schema 
				colors: { 
                    backgroundContent: '', // color of the tile background 
                    backgroundTitle: '', // color of the label/title background
                    textContent: '', // font color of the tile content
                    textLabel: '' // font color of the label/title & subtitle
                },
				baseWidth: 250, // basic tile width
				baseHeight: 250, // basic tile height
				basePadding: 10, // basic tile padding
				baseMargin: 5, // basic tile margin
				xSize: 1, // basic x-size multiplier
				ySize: 1, // basic y-size multiplier
				size: 0 // basic x-/y-size multiplier
            };

			// config color scheme
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

            // config basic label icon set
			if (settings.label.icon != '' && settings.label.iconUrl == '') {
			    var labelIconUrls = {
				'info': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAImSURBVGhD7ZgxSyNBGIaTYGGZ7oQTtBC8QtDCQtDCH2BhoXCNYJFOf4KFhb2FhaXVcaWFVwgKChZRVHJWHtwdKmhloWAjKPGeN/uJIZAzuzth1jAPvLzfTmY27+7O7mySCwQCgUAg4JG8uTOq1WovNo2G0SjqQj/RaT6f30a/qLMJ4RfRw0sT+OwJW0Y6qOxAoCLh9hRSUO+gJcpp/DhqfYO2CtZvw/1DoA0LdotmrG0IldBvfdYI7Xu1wb4hyJQF0vSYRD3UW2p7D/ot2m78QYhzC7OKdeFlbbcCfXW/+Lsf+PJiLUnEBIG+Wh2HEdtdIgrmieDLJ6wUelSOR2XrNOwjNqkOAL6YK8g8pud/XAbNE5HqAFiU/lipeg1pEYvLX/NEpL0Cmjap4KBPrPQDN+6m7sQkMLZiu/EHOUYIojUgNoybst34hSx6v4kF4TdsuH/IowWspdVX0FfvR902PBsQqhfdRRGbQ58nNGTDsgXB1i1nU+izZd2dkPYx2siZ+f84Ms8enF1No/eeSJPW3Qnt+ElZwhZQsdbwxiP6VigUVqLNQGfQjik0humlTvpUV+s3cA+aZRr9wJ3g9AAIP4Cdo3t0bbrkhe2Gm/cav2T7EH/GndCu/4Xq1Ve/Tfg5tE/tBNdXYIxwZdWccZ1t6fVKXMn5fBfpieQE51eA4JrnQq8LOuv9tH3Grz7MI5Qr8fo/0QU6QN+R1odAIBAIBAIdRC73D0FqGJwRITyAAAAAAElFTkSuQmCC',
				
				'settings': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKWSURBVGhD7ZavbxRREMfvLidOVFRUVFQ0oeIEogJRgShJBQKBqEAgKk5UICorECQIxImKCuSJCkJOVlRUlASB4A+A5EgQR1LTpKIkFU1u+Xzn5ja715ZeyC5swnySyfx48/bN2903u7UgCIIgCIIg+H9IkmQB2R2NRvvuz2N/Qb9CWpZUZSh2jUInbOF3ZaBPPaX6UOx3Kz8DsSONYeoJzVvi34DFWsi6S9vD16DA18gnpEeegX0pcVf+Z+QK6fq08mGx+76+Cuh5+BqMDT3NwO+jmkgLe8+CDv6JTyserr/IAnpv7cChdecN4seWBNiPkU135a8g7zzvCtX0IYPYqcZgF8mNFQYXVvHqGCpCr8MaciBfYA+RJ8gOoldBkm6ClKfjzCTxUAp5di7Qb1DldCMuruJ092aG/L7P7WbnYu/ZRQF7x8MG/sCHioeLd3ydOyH3I2rO5+17LHto9cTSjoStp3qBvLXFyoB1dOguxkvaojoPan2K673PFvTCp2neMv4mWnnaWA5iQ89TV1uwSUWiYhC1wiNbEbAPfTiFWPqhwtYdVofRl3fFU5Qz8PFD5KVsZ9VTiscXyMHiz3w4B3E76FNsaQytJ9BDzhHbFPoYUYdall8KVsIULPrch3MQtzs8hW1gAn4hnabu+k68gEX0vXq93vHYh0aj8Uj2BGLrKPsQYX8l9z36B65yvyn+T6GYJnc4e4j7yAPMNnobOR+P2Ni2T6sO1KUv5UywAZ0Fa6OVgGI2KOqPPmSVgHrmKMh6OPoEpd5u//MCe4Do96KD6DdCr9pDn14NKEibUO+2Hy70jT9zuBtItYq/CYpsq3jBBm79nS6LmdvobVC3nsTS2Kv9pG2euR0EQRAEQRAEv6NW+wUlnjQ5hk8jlwAAAABJRU5ErkJggg==',
				
				'vcard': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHASURBVGhD7ZetTsNQFIBbMjFRMTGBRPAACAQSiUBM4EBMIHAoPA6BmCJIHmC8wx6AB0COBMHEEgRLcCvfuT1r2NLRdtsta3K+5Oz83b/Te9uugWEYhmEYhlFfQtW5xHF8q2YlhGFYaL4yBcRqVgIFFFpbqQJggvmcRPzAuruqC6+tELL66XQ6VNcb7jKBurnsqK4tGymAnTlF+sgA6XEB25raHmRbs44QsSvJ/YbYB2qlIpIRPDwwZNAlBXy5GRcg3tMmpdDu1dwDLHKfh0Wk7iIHqr2yVgEsfqRmFmPVXlm3gAm7nfleIPegZgo7dibHcIkcaTM/yLmUidRNIdwi3pe8gP2JXGh6DtLdpFUmx9rG4TpsEhl0SQFNpIVEyJ7GdkVcg5LQz6FuLisfIeZoUNAd+h23gzSwrzV3iQyRSv8A/gmLmdsB7EeJCWJLDFMKkdwgybhcqcepdvN7hDA74s8g/opqol/QEfrbJRT8QzdIAbSL3yPE+OfI20wIyX1wj26jZTdGC/kT5H9hIekO+ETmEdTNZa33wDZQ9oNmzAvqRkO+eJIf5tn8F5maleCjgK38qDcMwzAMwzBqSxD8AK1n46QLCKsDAAAAAElFTkSuQmCC',
				
				'date': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAInSURBVGhD7ZevTyNBFMfbBnGiAoGoIAGSS7BIBAIcfwYEe/ISkOcR9ydwCIImwSEwSP4ABAkVCMQJBMldAmn5fGff9vpjtt3tbimXvE/y8t585+3Mzu6b2bbmOI7jOI4zZzqdznfspzUnQu4ydtLtdrdMmh/cxBI384rv4jdNHosWa/lXJk1Nw3wZmvV6fUEB/ktQJrNoPlxXhtwL4IGtRiy9kR5ozaGcAbO0AdBbefJKwaAxfmCaMGUb20vCOBrL6l8ldG3t69DZh/Q8lC4h5nqzsAjTXBOl1AK4+ZVGo/GIv8TukG7xI2XVD/2r7JUz/CPNi0StVV8ywzDhCLz6P7gNS0mPx4ekNw7957je5qX9LekZxLonUjc/kaxBkf/iLjGVxS5Pd+wbEFxzj7vBvpIf/Rag57q3wgvA/QrCbGhx37sKZrYADUzYIuw/858xvYGl0PpHlq5x2io5fFpOylU5hpNJ88hXhhYgFDPx8LGn4zR2fGbp6TgP1hTK1TEcUH8eqvgSz5VpS+gIWw8dgKTj8DfaQaIkZOmC43efN3BMGMrLclVGhUqosj2ArMlHILeJ+/x7ICRFoM/3wDh8AfPmv9/EUy2AifX/t/cjDumU7ifCw0RJyNIFx+gO45wT6mGEXFwb8y9xHp6Yo91nz9jLkDZO15MW+i+RatESrAwmCFhzJjB84TdQeA98FHn3QO4FqF4t/BDY5GsWOo7jOI7jzIZa7R0v/zxux0qcsAAAAABJRU5ErkJggg==',
				
				'chart': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIMSURBVGhD7ZchTwNBEIV7DQKBQCKRFRUIJAKJQCAqkEhk8TgEAgEJAsFP4AcgEUhkBRISSCBBgmjSpOV7e3Pb60HTnqC7JPslk5l9u82+aXevbSORSCQSiURizHA43CRObDiTpuWgjEajFUwfEg9Zlj0gLeczkWPv9hXxSRNlWrYkPjDn3+3c6yTod7Y0TvC4hMmb3O5PmNu3pfGCTzVxn1seg/ZBiv/8Y7RDDHLbY9DObEm8VM1T90rjeC+vwOhOxbyOkS51l4j+8m5h0j8uqR9Jazat+XUr4wNzU82TV9yikMgEpm7JWyZ50NsV808kZ566S33gFoYCAzLvHolm1DdB3UJ705yw2l1U6uIyh2uAzb35AsauCWKqebKOVHGZwzTAxlO/UdVExbzGbXvdhsb5jGPxDbDpD/OMTwlvusDM+mPFuJfPeBbbABv+Zr5rc9Vj482Ti4urS1xmcQ2w2a/mSboL7k8ItWuCGBC70sjn6M4odZgG2Giaeel6hGrcsbUtYk81msyLsA2wcdX8semXJkl7Ia26FwDjwrwI/gl4ZMzkCd3Yls6aMxsX/EkDtf8Ts+FFs9k8Is/6CeCO019Tq4GSeZ3xa5ODMncDFfP66et/SYZk7gbK5rMsi8K8qPMJRGde1GkgOvOiziXu08RzEYzfJZY1i750eK3oXzP0RCKRSCQS/4xG4xvzQAXtu4TohwAAAABJRU5ErkJggg==',
				}
			    var labelIconPositions = {
			        'info': '0px 0px',
					'settings': '0px 0px',
					'vcard': '0px 0px',
					'date': '0px 0px',
					'chart': '0px 0px'
			    }
				
				// config label icon
			    if (typeof labelIconPositions[settings.label.icon] != 'undefined') {
			        settings.label.iconPosition = labelIconPositions[settings.label.icon];
					settings.label.iconUrl = labelIconUrls[settings.label.icon];
			    }
			}

			// tile content switch for multiple defined content elements
			function changeContent(element, contentArray, oldIndex) {
			    var nextIndex = (oldIndex == contentArray.length - 1) ? 0 : oldIndex + 1;
				var newElement = element.clone();
				element.after(newElement.css({'margin-top' : '-' + settings.computedWidth  + 'px',
											  'height': settings.computedWidth  + 'px', 
											  '-webkit-box-shadow': '0 8px 6px -6px black',
											  '-moz-box-shadow': '0 8px 6px -6px black',
											  'box-shadow': '0 8px 6px -6px black'})
										.html(contentArray[nextIndex])
										.animate({'margin-top' : 0}, 
												 {complete:  function() { element.remove(); }, easing: 'linear' })
							  );
							  
			    window.setTimeout(function () { changeContent(newElement, contentArray, nextIndex); }, Math.floor((Math.random()*10000)+1000));
			}

			// build the tile
            return this.each(function () {
                var $this = $(this);
                var thisSettings = $.extend({}, settings);
				
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
				// make content array
				thisSettings.computedContent = [];
				if (thisSettings.format.switchContent) {
				    var i = 0;
				    $this.children().each(function () {
						// if content is a image path add image tags
						if(/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test($(this).html())) { //ToDo: do the css manipulation somewhere else..
							thisSettings.computedContent[i] =  '<img src="' + $(this).html() + '" style="border-width:0px; margin:-10px;" />';
						} else {
							thisSettings.computedContent[i] = $(this).html();
						}
				        i++;
				    });
				} else {
					// if content is a image path add image tags
					if(/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(thisSettings.content)) {
						thisSettings.computedContent[0] =  '<img src="' + thisSettings.content + '" />';
					} else {
						thisSettings.computedContent[0] = thisSettings.content;
					}
				}

                // modify cursor
                var cursor = 'default';
                if (typeof $this.attr('onclick') != 'undefined') {
                    cursor = 'pointer';
                }

                // prepare label css
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
				
				// config opacity on hover
				var opacity = 1;
				if (thisSettings.format.hoverEffect) {
					opacity = '.75';
					
					$this.hover(function () {
						$this.css('opacity', '1')
							 .css('-ms-filter', 'progid:DXImageTransform.st_Microsoft.st_Alpha(opacity=100)')
							 .css('filter', 'progid:DXImageTransform.st_Microsoft.st_Alpha(opacity=100)');
					}, function () {
						$this.css('opacity', opacity)
							 .css('-ms-filter', 'progid:DXImageTransform.st_Microsoft.st_Alpha(opacity=' + opacity +')')
							 .css('filter', 'progid:DXImageTransform.st_Microsoft.st_Alpha(opacity=' + opacity +')');
					});
				}
				
				// create tile
                $this.css('background-color', thisSettings.colors.backgroundContent)
					 .css('cursor', cursor)
                     .css('width', thisSettings.computedWidth+'px')
                     .css('height', thisSettings.computedHeight + 'px')
                     .css('margin', thisSettings.computedMargin + 'px')
					 .css('opacity', opacity)
					 .css('-ms-filter', 'progid:DXImageTransform.st_Microsoft.st_Alpha(opacity=' + opacity +')')
					 .css('filter', 'progid:DXImageTransform.st_Microsoft.st_Alpha(opacity=' + opacity +')')
					 .css('float', 'left')
					 .css('text-align','left')
					 .css('padding','0px')
					 .css('position','relative')
					 .css('overflow','hidden')	
					 .html('')
                     .append($("<div>") // add tile content
                                .css('padding', thisSettings.computedPadding + 'px')
                                .css('overflow', 'hidden')
                                .css('width', (thisSettings.computedWidth - 2 * thisSettings.computedPadding) + 'px')
							    .css('color', thisSettings.colors.textContent + 'px')
								.css('position', 'absolute') // needed by the switch content (animation) function
								.css('background-color', thisSettings.colors.backgroundContent) // needed by the switch content (animation) function
								.html(thisSettings.computedContent[0]));
								
				// animation == 'slideup' add title area and effect
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
				// animation == 'slidesub' add title area and effect
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
				// animation == 'transparent' add title area and effect
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
				
				// resize image to tile size
                if (thisSettings.format.resizeImages) {
                    $this.find('img')
                                .css('border-width', '0px')
                                .css('margin', '-'+thisSettings.computedPadding+'px')
                                .css('width', thisSettings.computedWidth + 'px')
                                .css('height', thisSettings.computedHeight + 'px');
                }
				
				// start content switch function
                if (thisSettings.format.switchContent) {
                    window.setTimeout(function () { changeContent($this.children(':first'), thisSettings.computedContent, 0); }, Math.floor((Math.random()*10000)+1000));
                }
            });
        }
    });
})(jQuery);
