var loader = document.getElementById('la-anim-6-loader')
	, border = document.getElementById('la-anim-6-border')
	, α = 0
	, π = Math.PI
	, t = 15
	, tdraw;

function PieDraw() {
	α++;
	α %= 360;
	var r = ( α * π / 180 )
	, x = Math.sin( r ) * 250
	, y = Math.cos( r ) * - 250
	, mid = ( α > 180 ) ? 1 : 0
	, anim = 'M 0 0 v -250 A 250 250 1 ' 
	       + mid + ' 1 ' 
	       +  x  + ' ' 
	       +  y  + ' z';

	loader.setAttribute( 'd', anim );
	border.setAttribute( 'd', anim );
	if( α != 0 )
	tdraw = setTimeout(PieDraw, t); // Redraw
}

function PieReset() {
	clearTimeout(tdraw);
	var anim = 'M 0 0 v -250 A 250 250 1 0 1 0 -250 z';
	loader.setAttribute( 'd', anim );
	border.setAttribute( 'd', anim );
}