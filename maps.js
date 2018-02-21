/**
 * Moves the map to display over Berlin
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */
function moveMapToBerlin(map){
  map.setCenter({lat:52.5159, lng:13.3777});
  map.setZoom(14);
}

function addDraggableMarker(map, behavior){

  var marker = new H.map.Marker(map.getCenter());
  // Ensure that the marker can receive drag events
  marker.draggable = true;
  map.addObject(marker);

  // disable the default draggability of the underlying map
  // when starting to drag a marker object:
  map.addEventListener('dragstart', function(ev) {
	var target = ev.target;
	if (target instanceof H.map.Marker) {
	  behavior.disable();
	}
  }, false);


  // re-enable the default draggability of the underlying map
  // when dragging has completed
  map.addEventListener('dragend', function(ev) {
	var target = ev.target;
	if (target instanceof mapsjs.map.Marker) {
	  behavior.enable();
	  console.log(`Moved marker to ${JSON.stringify(target.b)}`);
	  currentMarker = target.b;
	}
  }, false);

  // Listen to the drag event and move the position of the marker
  // as necessary
   map.addEventListener('drag', function(ev) {
	var target = ev.target,
		pointer = ev.currentPointer;
	if (target instanceof mapsjs.map.Marker) {
	  target.setPosition(map.screenToGeo(pointer.viewportX, pointer.viewportY));
	}
  }, false);
}

function placeComment(e) {
	console.log('Place comment');
	addDraggableMarker(map, behavior);
	$('#addCommentButton').hide();
	$('#commentPlacedButton').show();
}

function commentPlaced(e) {
	console.log('Comment was placed. Open modal');
	$('#commentModal').modal('show');
}

function addComment(e) {
	var comment = $('#comment-text').val();
	console.log(`Added comment with value ${comment} and longitude ${currentMarker.lng} and latitude ${currentMarker.lat}`);
	return true;
}