jThree( function( j3 ) {//j3 === jThree
    var milkcocoa = new MilkCocoa("https://io-fi0i1mtqo.mlkcca.com:443");
    var dataStore = milkcocoa.dataStore("rts");

    var selected = null;
    var manager = new PlayerManager(dataStore);
    var myself_id = manager.create_player();
    var myunit_id = manager.create_unit();


    manager.on("create-unit", function(e) {
	    j3("#unit"+e.unit_id).click(function() {
	    	selected = e.unit_id;
	    	j3("#cursor").position(j3(this).position());
	    });
    });

    $(window).mousedown(function(e) {
    	if(selected) {
	    	var pos = translateDisplay2World(e.pageX, e.pageY);

	    	manager.move_unit(selected, pos);

		    selected = null;
	    	j3("#cursor").position([100, 0, 100]);
	    }
    });

    var width = document.body.clientWidth;
    var height = document.body.clientHeight;
    function translateDisplay2World(x, y) {
    	return {
    		z : -(x - width/2) / 12,
    		x : (y - height/2) / 12
    	}
    }

},function() {//WebGL非対応ブラウザ向け
	alert( "Your browser does not support WebGL." );
} );
