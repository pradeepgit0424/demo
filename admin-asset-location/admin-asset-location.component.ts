import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AssetLocationMapping } from '../../models';
import { AdminAssetLocationMapService } from '../../services/admin-asset-location-map.service';

@Component({
  selector: 'app-admin-asset-location',
  templateUrl: './admin-asset-location.component.html',
  styleUrls: ['./admin-asset-location.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminAssetLocationComponent implements OnInit {
  assetLocationDetail = new AssetLocationMapping;
  locationMappingData: any[];
  assetLocationdata: LocalDataSource;
  locationList: any;
  assetList: any;
  selectedLocationId: any;
  selectedAssetIds: any;
  locatioNames: any;
  searchBox: any;
  isEdit: boolean;
  assetName: string;

  tableSettings = {
    columns: {
      //Column 1
      locationName: {
        //Binding of machines to respective platforms
        title: 'Location Name',
        width: '10%'
      },
      assets: {
        title: 'Assets Name ',
        valuePrepareFunction: (value) => {
          let names = [];
          value.forEach(element => {
            names.push(element.assetName)
          });
          return names.join();
        },
        filter: false,
        width: '10%'
      }
    },
    //For Search Textbox in each column
    hideSubHeader: true,
    mode: 'external',
    //Actions Column for Edit/Delete the Entry
    actions: {
      //'Add New' in "Action" Column not required
      add: false,
      //Position of "Action" Column
      position: 'right'
    },
    //Edit Icon
    edit: {
      editButtonContent: '<img src=\'assets/images/edit_icon.png\' title=\'Edit data\'>'
    },
    //Delete Icon
    delete: {
      deleteButtonContent: '<img src=\'assets/images/delete_icon.png\' title=\'Delete data\'>'
    },

    //Positive and Negative style for table rows.
    rowClassFunction: (row) => {
      if (row.index % 2 === 0) {
        return 'positive';
      } else if (row.index % 2 === 1) {
        return 'negative';
      }
      return '';
    }
  };

  // Push a search term into table to search
  search(term: string): void {
    if (term) {
      this.assetLocationdata.setFilter([
        // fields we want to include in the search
        {
          field: 'locationName',
          search: term
        },
        {
          field: 'assets',
          search: term
        }
      ], false);
    } else {
      this.assetLocationdata.setFilter([], true);
    }
  }

  // function to filter the paramter details in the table based on paramter name
  onSearch(query: string = '') {
    if (query) {
      this.assetLocationdata.setFilter([
        // fields we want to include in the search
        {
          field: 'locationName',
          search: query
        },
        {
          field: 'assets',
          search: query
        }
      ], false);
    } else {
      this.assetLocationdata.setFilter([], true);
    }
  }

  constructor(private locationService: AdminAssetLocationMapService, private assetService: AdminAssetLocationMapService) { }

  ngOnInit(): void {

    this.getLocationAssetsMappedData();
    this.getLocations();
    this.getAssets();
  }

  getLocationAssetsMappedData() {
    this.locationMappingData = MAPDETAILS;
    this.assetLocationdata = new LocalDataSource(this.locationMappingData);
  }

  //Function to get location data via Api in dropdown
  getLocations() {
    this.locationList = LOCATIONLST;
    // this.locationService.getLocations().subscribe(res => {
    //   this.locationList = res;
    // });
  }

  //Function to get Asset data via Api in dropdown
  getAssets() {
    this.assetList = ASSETLST;
    // this.assetService.getAssets().subscribe(res => {
    //   this.assetList = res;
    //   //this.locationMappingData = new LocalDataSource(res);
    // });
  }

  // Function to edit a table row
  editLocation(location: any) {
    this.isEdit = true;
    console.log(location)
    this.setLocationDetails(location.data);
  }

  //To set the details 
  setLocationDetails(assetLocationDetail: any) {
    console.log(assetLocationDetail)
    this.selectedLocationId = assetLocationDetail.locationId;
    this.selectedAssetIds = assetLocationDetail.assets.map(({ assetId }) => assetId);
  }

  // Filling details to object
  fillObject() {
    this.assetLocationDetail = new AssetLocationMapping;
    if (this.isEdit) {
      this.assetLocationDetail.locationId = this.selectedLocationId;
    }
    this.assetLocationDetail.locationId = this.selectedLocationId;
    this.assetLocationDetail.assetIds = this.selectedAssetIds;
  }

  // To clear the selected/input values
  clearAllVariables() {
    this.selectedLocationId = null;
    this.selectedAssetIds = null;
    this.searchBox = null;
  }

  // To display data in console
  saveClick() {
    var save = new SaveModel();
    save.AssetId = this.selectedAssetIds;
    save.Location = this.selectedLocationId
    console.log(save);
    this.assetLocationdata = new LocalDataSource();
    this.fillObject();
  }

}
//Just for reference console purpose
class SaveModel {
  AssetId: string;
  Location: string[];
}

const MAPDETAILS = [
  {
    locationId: 1,
    locationName: "Ltts Mysore",
    assets: [{ assetId: 1, assetName: "asset1" }, { assetId: 2, assetName: "asset2" }]
  },
  {
    locationId: 2,
    locationName: "Ltts Mumbai",
    assets: [{ assetId: 3, assetName: "asset3" }, { assetId: 4, assetName: "asset4" }]
  },
  {
    locationId: 3,
    locationName: "Ltts Bangalore",
    assets: [{ assetId: 5, assetName: "asset5" }, { assetId: 6, assetName: "asset6" }]
  },
]

const LOCATIONLST = [
  {
    locationId: 1,
    locationName: "Ltts Mysore"
  },
  {
    locationId: 2,
    locationName: "Ltts Mumbai"
  },
  {
    locationId: 3,
    locationName: "Ltts Bangalore"
  },
  {
    locationId: 4,
    locationName: "Ltts Vadodra"
  },
  {
    locationId: 5,
    locationName: "Ltts Chennai"
  },
]

const ASSETLST = [
  {
    assetId: 1,
    assetName: 'asset1'
  },
  {
    assetId: 2,
    assetName: 'asset2'
  },
  {
    assetId: 3,
    assetName: 'asset3'
  },
  {
    assetId: 4,
    assetName: 'asset4'
  },
  {
    assetId: 5,
    assetName: 'asset5'
  },
  {
    assetId: 6,
    assetName: 'asset6'
  },
  {
    assetId: 7,
    assetName: 'asset7'
  },
  {
    assetId: 8,
    assetName: 'asset8'
  },
  {
    assetId: 9,
    assetName: 'asset9'
  },
]