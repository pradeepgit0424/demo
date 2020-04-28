import { Component, OnInit, Input } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { } from 'googlemaps';
import { ViewChild } from '@angular/core';
import { MapDetail} from './MapDetail';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild('map', { static: false }) mapElement: any;
  //map: google.maps.Map;
  mapDetail: MapDetail;
  // ---------------------------------------------------------------------------------------
  // Angular Map ts part starts

  // google maps zoom level
  zoom: number = 8;
  zoomValue : string = "";
  // initial center position for the map
  lat: number = 12.355876;
  lng: number = 76.592042;
  zoomdiv: number;
  seltype: HTMLElement;
  centercordinatesdiv: HTMLElement;
  mapName: any;
  mapObj: any;

  constructor() { }

  ngOnInit() {
    
    this.initAutocomplete();
  }

  clearSearch() {
    var input = document.getElementById('pac-input') as HTMLInputElement;
    input.value = '';
  }

  saveClick() {
    this.mapDetail = new MapDetail();
    this.mapDetail.mapName = this.mapName;
    this.mapDetail.zoom = this.mapObj.getZoom().toString();
    this.mapDetail.centreCoOrdinate = this.mapObj.getCenter().toString();
    this.mapDetail.searchBoxValue = (document.getElementById('pac-input') as HTMLInputElement).value;
    console.log(this.mapDetail);
  }

  initAutocomplete() {
    
    this.centercordinatesdiv = document.getElementById('centercordinatesdiv');
    this.seltype = document.getElementById('seltype');
    var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 22.307817859874035, lng: 73.26230764389038 },
      zoom: 2,
      mapTypeId: 'terrain'
    });
    this.mapObj = map;
    var mapOptions = {
      center: new google.maps.LatLng(8.7139, 77.7567),
      zoom: 6,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    google.maps.event.addListener(map, 'click', function (e) {
      this.zoomdiv = map.getZoom();
      alert("Latitude: " + e.latLng.lat() + "\r\nLongitude: " + e.latLng.lng() + "\r\nZoom: " + this.map.getZoom());
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

    this.zoomValue = map.getZoom().toString();
    var markers = [];
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
