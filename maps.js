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

function setMarker() {
	
	let rows = [];
	
	rows.push({
		lat: 52.51532544959014,
		lng: 13.398213534545903,
		userID: '01',
		score: '6'
	}, {
		lat: 52.50916161808097,
		lng: 13.38193431352829,
		userID: '02',
		score: '2'
	});
	
	/*var domElement = document.createElement('img');
	domElement.style.width = '30px';
	domElement.style.height = '30px';
	domElement.src = 'if_package_toys_1443.png';*/
	

	

	
	rows.forEach(row => {
		function hover_comment(evt) {
		  evt.target.style.opacity = 0.8;
		  $("#comment_details-" + row.userID).show();
		};
		
		function leafe_comment(evt) {
			evt.target.style.opacity = 1;
			$("#comment_details-" + row.userID).hide();
		}

		var domIcon = new H.map.DomIcon(createMapEntry(row.userID, row.score), {
		  onAttach: function(clonedElement, domIcon, domMarker) {
			  clonedElement.addEventListener('mouseover', hover_comment);
			  //clonedElement.addEventListener('mouseout', leafe_comment);
		  },
		  onDetach: function(clonedElement, domIcon, domMarker) {
			clonedElement.removeEventListener('mouseover', hover_comment);
			clonedElement.removeEventListener('mouseout', leafe_comment);
		  }
		});
		
		map.addObject(new H.map.DomMarker(row, {icon: domIcon}));
	});
	
	
}
function createMapEntry(userID, score){
	return `
		<div class="row" style="width: 150px">
			<div class="col-sm-2">
				<img class="map-images" src="user_pic-${userID}.png"></img>
			</div>
			<div class="col-sm-8">
				<table class="btn btn-light table-votes" style="display: none;" id="comment_details-${userID}">
					<tr>
						<td class="table-votes" style="border: 0 0 1px 0 solid black;">
							<table>
								<tr>
									<td>
										<button id="thumbs_up_button" type="button" class="button-only-image map-images" style="background-image: url('if_thumbs-o-up_1608724.png')" onClick="upvote()" data-toggle="tooltip" data-placement="top" title="Upvote" />
									</td>
									<td>
										<button id="thumbs_down_button" type="button" class="button-only-image map-images" style="background-image: url('if_thumbs-o-down_1608725.png')" onClick="downvote()" data-toggle="tooltip" data-placement="top" title="Downvote" />
									</td>
								<tr>
							</table>
						</td>
						<td>
							<p style="padding-left: 5px; padding-right: 5px; display: table-cell; heigth: 100%;" data-toggle="tooltip" data-placement="top" title="Score">${score}</p>
						</td>
					</tr>
				</table>
			</div>
		</div>
	`;
}

function upvote() {
	console.log('upvote');
}

function downvote() {
	console.log('downvote');
}