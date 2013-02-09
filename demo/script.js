$(document).ready(function() {

	// size demo
    $('#tile1').smarTiles({ ySize: 2 });
	
	// size, custom color demo
	$('#tile2').smarTiles({
	    label: { text: 'Set via jquery' },
        size: 2,
        content : 'Content set via jquery',
        colors : {
    		backgroundContent: 'green',
    		backgroundTitle: 'darkgreen',
    		textContent: 'black',
    		textTitle: 'white'
    	}
	});
	
	// color schema demo
	$('#tile3').smarTiles({ colorScheme: 'red'});
	$('#tile4').smarTiles({ colorScheme: 'green', content: '../test.png', label: { icon: '' } });
	
	// animated content demo
	$('#tile5').smarTiles({ colorScheme: 'yellow', toolTip: 'Hello World!', xSize: 2, ySize: 1, format: { switchContent: true } });

	// class demo & animation demo
	$('.test').smarTiles({ label: { animation: 'slideup' }, colorScheme: 'red' });
	$('#tile6').smarTiles({ label: { animation: 'hidden' } });
	$('#tile7').smarTiles({ label: { animation: 'slidesub'} });
	
	// mixed demo
	$('#tile8').smarTiles({ content:'http://www.wandtattoos.org/images/wandtattoo-baum.jpg', label: { animation: 'slidesub', icon: '' }, format: {hoverEffect: false} });
	
	// icon demo
	$('#tile9').smarTiles({ label: { icon: 'chart' }, colorScheme: 'yellow' });
	$('#tile10').smarTiles({ label: { icon: 'date' } });
	$('#tile11').smarTiles({ label: { icon: 'chart' }, colorScheme: 'green'  });
	$('#tile12').smarTiles({ label: { icon: 'date' }, colorScheme: 'white' });
	
	// sprite demo
	$('#tile13').smarTiles({ label: { iconUrl: './demo_sprite.png', iconPosition: '0px 0px'} });
	$('#tile14').smarTiles({ label: { iconUrl: './demo_sprite.png', iconPosition: '0 -98px'}, colorScheme: 'red' });
	$('#tile15').smarTiles({ label: { iconUrl: './demo_sprite.png', iconPosition: '0 -196px'} });
	$('#tile16').smarTiles({ label: { iconUrl: './demo_sprite.png', iconPosition: '0 -294px'} });
});