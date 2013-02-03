$(document).ready(function() {
	$('#tile1').smarTiles();
	
	$('#tile2').smarTiles({
		title : 'Set via jquery',
        content : 'Content set via jquery',
        colors : {
    		backgroundContent: 'green',
    		backgroundTitle: 'darkgreen',
    		textContent: 'black',
    		textTitle: 'white'
    	},
		backgroundImage : '../test.png'
	});
	
	$('#tile3').smarTiles({colorScheme : 'red'});
	$('#tile4').smarTiles({colorScheme : 'green'});
	$('#tile5').smarTiles({colorScheme : 'yellow'});
	
	$('.test').smarTiles();
	
});