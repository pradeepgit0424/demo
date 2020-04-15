var map;
var centercordinatesdiv;
var drawingcordinatesdiv;
var bondsdiv;
var zoomdiv;
var radiusdiv;
var seltype;
var drawingManager;
var selectedShape;
var searchedplace;
var input;
var colors = ['#1E90FF', '#FF1493', '#32CD32', '#FF8C00', '#4B0082'];
var selectedColor;
var colorButtons = {};


function initAutocomplete() {
    centercordinatesdiv = document.getElementById('centercordinatesdiv');
    zoomdiv = document.getElementById('zoomdiv');
    seltype = document.getElementById('seltype');
    searchedplace = document.getElementById('searchedplace');
    radiusdiv = document.getElementById('radiusdiv');
    drawingcordinatesdiv = document.getElementById('drawingcordinatesdiv');
    bondsdiv = document.getElementById('bondsdiv');

    var polyOptions = {
        strokeWeight: 0,
        fillOpacity: 0.45,
        editable: true
    };

    map = new google.maps.Map(
        document.getElementById('map'), { zoom: 3, center: new google.maps.LatLng(12.97159, 77.59456), mapTypeId: 'roadmap', mapTypeControl: false });

    drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT,
            drawingModes: ['marker', 'circle', 'polygon', 'rectangle']
        },
        markerOptions: {
            draggable: true,
            editable: true,
            icon: './location.png'
        },
        rectangleOptions: polyOptions,
        circleOptions: {
            fillColor: '#ffff00',
            fillOpacity: 1,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            zIndex: 1
        },
        polygonOptions: polyOptions,

    });


    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (e) {
        //~ if (e.type != google.maps.drawing.OverlayType.MARKER) {
        var isNotMarker = (e.type != google.maps.drawing.OverlayType.MARKER);
        // Switch back to non-drawing mode after drawing a shape.
        drawingManager.setDrawingMode(null);

        // Add an event listener that selects the newly-drawn shape when the user
        // mouses down on it.
        var newShape = e.overlay;
        newShape.type = e.type;
        google.maps.event.addListener(newShape, 'click', function () {
            setSelection(newShape, isNotMarker);
        });
        google.maps.event.addListener(newShape, 'drag', function () {
            updateCurSelText(newShape);
        });
        google.maps.event.addListener(newShape, 'dragend', function () {
            updateCurSelText(newShape);
        });
        setSelection(newShape, isNotMarker);
        //~ }// end if
    });

    // Clear the current selection when the drawing mode is changed, or when the
    // map is clicked.
    google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection);
    google.maps.event.addListener(map, 'click', clearSelection);
    google.maps.event.addDomListener(document.getElementById('delete-button'), 'click', deleteSelectedShape);

    // buildColorPalette();

    drawingManager.setMap(map);

    // // Create the search box and link it to the UI element.
    input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
        centercordinatesdiv.innerHTML = map.getCenter().toUrlValue();
        zoomdiv.innerHTML = map.getZoom();
        deletePlacesSearchResults();
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }
        searchedplace.innerHTML = places[0].name;
        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: './green_point.png',
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}


function clearSelection() {
    if (selectedShape) {
        if (typeof selectedShape.setEditable == 'function') {
            selectedShape.setEditable(false);
        }
        selectedShape = null;
    }
}


function updateCurSelText(shape) {

    if (selectedShape) {
        var drawingType = selectedShape.type;
        seltype.innerHTML = drawingType;
        zoomdiv.innerHTML=map.getZoom();
        centercordinatesdiv.innerHTML = map.getCenter().toUrlValue();
        switch (drawingType) {
            case 'marker':
                drawingcordinatesdiv.innerHTML =  selectedShape.getPosition().toUrlValue();
                break;
            case 'circle':{
                drawingcordinatesdiv.innerHTML =  selectedShape.getCenter().toUrlValue();
                radiusdiv.innerHTML = selectedShape.getRadius();
            }
                break;
            case 'polygon':{
                var pathstr = "[ ";
                for (var i = 0; i < selectedShape.getPath().getLength(); i++) {
                  // .toUrlValue(5) limits number of decimals, default is 6 but can do more
                  pathstr += selectedShape.getPath().getAt(i).toUrlValue() + " , ";
                }
                pathstr += "]";
                bondsdiv.innerHTML = pathstr
            }
                
                break;
            case 'rectangle':
                bondsdiv.innerHTML = selectedShape.getBounds().toUrlValue();
                break;
        }
    }

  
}

var placeMarkers = [];
var centercordinatesdiv;
var zoomdiv;

function deletePlacesSearchResults() {
    for (var i = 0, marker; marker = placeMarkers[i]; i++) {
        marker.setMap(null);
    }
    placeMarkers = [];
    input.value = ''; // clear the box too
}

function deleteSelectedShape() {
    if (selectedShape) {
        selectedShape.setMap(null);
    }
}

function setSelection(shape, isNotMarker) {
    clearSelection();
    selectedShape = shape;
    if (isNotMarker)
        shape.setEditable(true);
    updateCurSelText(shape);
}

function deleteSelectedShape() {
    if (selectedShape) {
        selectedShape.setMap(null);
    }
}

