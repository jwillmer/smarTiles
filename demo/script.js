$(document).ready(function() {
	$('#tile1').smarTiles();
	
	$('#tile2').smarTiles({
		title : 'Title set via jquery',
        content : 'Content set via jquery',
        colors : {
    		backgroundContent: 'green',
    		backgroundTitle: 'darkgreen',
    		textContent: 'black',
    		textTitle: 'white'
    	}
	});
	
	$('#tile3').smarTiles({colorScheme : 'red'});
	$('#tile4').smarTiles({colorScheme : 'green'});
	$('#tile5').smarTiles({colorScheme : 'yellow'});
	
	$('.test').smarTiles();
	
});