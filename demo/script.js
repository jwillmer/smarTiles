$(document).ready(function() {
    $('#tile1').smarTiles({ ySize: 2 });
	
	$('#tile2').smarTiles({
	    label: { text: 'Set via jquery', icon: '' },
        size: 2,
        content : 'Content set via jquery',
        colors : {
    		backgroundContent: 'green',
    		backgroundTitle: 'darkgreen',
    		textContent: 'black',
    		textTitle: 'white'
    	}
	});
	
	$('#tile3').smarTiles({ colorScheme: 'red'});
	$('#tile4').smarTiles({ colorScheme: 'green', content: '../test.png', label: { icon: '' } });
	$('#tile5').smarTiles({ colorScheme: 'yellow', toolTip: 'Hello World!', xSize: 2, ySize: 1, format: { switchContent: true } });

	$('.test').smarTiles({ label: { animation: 'slideup' } });
	$('#tile6').smarTiles({ label: { animation: 'hidden' } });
	$('#tile7').smarTiles({ label: { animation: 'slidesub' } });
	$('#tile8').smarTiles({ content:'http://www.wandtattoos.org/images/wandtattoo-baum.jpg', label: { animation: 'slidesub', icon: '' } });
	
});