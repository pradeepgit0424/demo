import { Component, OnInit, Input } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { } from 'googlemaps';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild('map', { static: false }) mapElement: any;
  map: google.maps.Map;

  // ---------------------------------------------------------------------------------------
  // Angular Map ts part starts

  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = 12.355876;
  lng: number = 76.592042;
  zoomdiv: number;
  seltype: HTMLElement;
  centercordinatesdiv: HTMLElement;
  mapName: any;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
    {
      lat: 12.357188,
      lng: 76.594665,
      label: 'TS3',
      draggable: true
    },
    {
      lat: 12.355876,
      lng: 76.592042,
      label: 'SEZ',
      draggable: false
    },
    {
      lat: 12.356309,
      lng: 76.591231,
      label: 'TS1',
      draggable: true
    }
  ];

  // Angular Map ts part ends (Interface is below)
  // ---------------------------------------------------------------------

  constructor() { }

  ngOnInit() {
    this.initAutocomplete();
  }

  clearSearch() {
    var input = document.getElementById('pac-input') as HTMLInputElement;
    input.value = '';
  }
  displaySearch() {
    var input = document.getElementById('pac-input') as HTMLInputElement;
    // input.value = this.maps.sear
  }

  // method to save map data
  saveClick() {

    this.zoomdiv;
    this.centercordinatesdiv;
    this.mapName;
    alert("data saved");
  }

  initAutocomplete() {

    this.centercordinatesdiv = document.getElementById('centercordinatesdiv');
    //this.zoomdiv = document.getElementById('zoomdiv');
    this.seltype = document.getElementById('seltype');
    var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 22.307817859874035, lng: 73.26230764389038 },
      zoom: 2,
      mapTypeId: 'terrain'
    });

    var mapOptions = {
      center: new google.maps.LatLng(8.7139, 77.7567),
      zoom: 6,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var infoWindow = new google.maps.InfoWindow();
    var latlngbounds = new google.maps.LatLngBounds();
    google.maps.event.addListener(map, 'click', function (e) {
      this.zoomdiv = map.getZoom();
      alert("Latitude: " + e.latLng.lat() + "\r\nLongitude: " + e.latLng.lng() + "\r\nZoom: " + map.getZoom());
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input') as HTMLInputElement;
    var searchBox = new google.maps.places.SearchBox(input);
    var zoomdiv = document.getElementById('zoomdiv');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
      searchBox.setBounds(map.getBounds());
      document.getElementById('centercordinatesdiv').innerHTML = map.getCenter().toUrlValue();
      zoomdiv.innerHTML = map.getZoom().toString();
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

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
          icon: icon,
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

}

//-----------------------------------------------------
// Angular Map Interface starts

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
//-----------------------------------------------------
// Angular Map Interface ends
