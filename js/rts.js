jThree( function( j3 ) {//j3 === jThree
    var milkcocoa = new MilkCocoa("https://io-fi0i1mtqo.mlkcca.com:443");

    var selected = null;

    j3("#unit1").click(function() {
    	selected = j3(this);
    	j3("#cursor").position(j3(this).position());
    });


    $(window).mousedown(function(e) {
    	if(selected) {
	    	var pos = translateDisplay2World(e.pageX, e.pageY);
	    	console.log(pos);
		    selected.animate({positionX : pos.x, positionY : "+=0", positionZ : pos.z}, 1000);
		    selected = null;
	    	j3("#cursor").position([100, 0, 100]);
	    }
    });

    var width = document.body.clientWidth;
    var height = document.body.clientHeight;
    function translateDisplay2World(x, y) {
    	return {
    		z : -(x - width/2) / 10,
    		x : (y - height/2) / 10
    	}
    }

},function() {//WebGL非対応ブラウザ向け
	alert( "Your browser does not support WebGL." );
} );
