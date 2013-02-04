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
;(function($){
    $.fn.extend({
        smarTiles: function(options) {
        	
        	this.defaultColorSchemes = {
        		blue : { 
            		backgroundContent: '#3F9AC9',
        			backgroundTitle: '#182B45',
            		textContent: 'black',
            		textTitle: 'white'
        		},
        		yellow : { 
            		backgroundContent: '#E3B949',
        			backgroundTitle: '#606061',
            		textContent: 'black',
            		textTitle: 'white'
        		},
        		red : { 
            		backgroundContent: '#AF0837',
        			backgroundTitle: '#6B0F24',
            		textContent: 'black',
            		textTitle: 'white'
        		},
        		green : { 
            		backgroundContent: '#BECD1A',
        			backgroundTitle: '#193725',
            		textContent: 'black',
            		textTitle: 'white'
        		}
        	};
        	
            this.defaultOptions = {
            	title : '',
            	content : '',
            	colorScheme : 'blue',
            	colors : {
            		backgroundContent: '',
            		backgroundTitle: '',
            		textContent: '',
            		textTitle: ''
            	},
				backgroundImage : ''
				// new var for title icon
				// create 10 base icons and let the user insert a sprite to extend the icon collection
				// add a plugin constructor for this purpose?
            };

            var settings = $.extend({}, this.defaultOptions, options);
            if(settings.colorScheme != '') {
            	if(this.defaultColorSchemes[settings.colorScheme]) {
            		var scheme = this.defaultColorSchemes[settings.colorScheme];
	            	for(var i in scheme) {
	            		if(typeof settings.colors[i] != 'undefined' && settings.colors[i] == '') {
	            			settings.colors[i] = scheme[i];
	            		}
	            	}
	            }
	        }

            return this.each(function() {
                var $this = $(this);
                var thisSettings = $.extend({},settings);
                
				// modify title
                if(thisSettings.title == '') {
                	thisSettings.title = $this.attr('title');
                }
				
				// modify content
				// ToDo: bg-image override content, find better solution!
                if(thisSettings.content == '') {
                	thisSettings.content = $this.html();
                }
				var contentHtml = '<ul><li>' + thisSettings.content + '</li></ul>'
				if(thisSettings.backgroundImage) {
					contentHtml = '<img src="' + thisSettings.backgroundImage + '" />';
				}
				
				// modify cursor
				var cursor = 'default';
				if(typeof $this.attr('onclick') != 'undefined') {
					cursor = 'pointer';
				}
				
				// create container	 
                $divContent = $('<div/>')
							    .attr('class','st_tileContent')
							    .css('color', thisSettings.colors.textContent)
								.html(contentHtml);
				
                $divTitleBg = $('<div/>')
								.attr('class','st_textBg')
								.css('background-color', thisSettings.colors.backgroundTitle)
								.html('<div class="icon icon-cloud"></div>' + thisSettings.title);
                
                $divTitleFg = $('<div/>')
								.attr('class','st_textFg')
								.css('color', thisSettings.colors.textTitle)
								.html('<div class="icon icon-cloud"></div>' + thisSettings.title);
                
				// create tile
                $this.addClass('st_tile st_one st_bgRed')
					 .css('background-color', thisSettings.colors.backgroundContent)
					 .css('cursor', cursor)
					 .html('')
					 .append($divContent)
					 .append($divTitleBg)
					 .append($divTitleFg);
            });
        }
    });
})(jQuery);
