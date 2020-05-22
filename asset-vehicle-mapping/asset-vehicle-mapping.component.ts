import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-asset-vehicle-mapping',
  templateUrl: './asset-vehicle-mapping.component.html',
  styleUrls: ['./asset-vehicle-mapping.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AssetVehicleMappingComponent implements OnInit {
  vehicleAssetData: LocalDataSource;
  vehicleList: any;
  assetList: any;
  selectedVehicleId: any;
  selectedAssetId: any;
  searchBox: any;
  vehicleMappingData: any[];

  tableSettings = {
    columns: {
      //Column 1
      vehicleName: {
        //Binding of machines to respective platforms
        title: 'Vehicle Name',
        width: '10%'
      },
      assetName: {
        title: 'Asset Name ',
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
  isEdit: boolean;

  // Push a search term into table to search
  search(term: string): void {
    if (term) {
      this.vehicleAssetData.setFilter([
        // fields we want to include in the search
        {
          field: 'vehicleName',
          search: term
        },
        {
          field: 'assetName',
          search: term
        }
      ], false);
    } else {
      this.vehicleAssetData.setFilter([], true);
    }
  }

  // function to filter the paramter details in the table based on paramter name
  onSearch(query: string = '') {
    if (query) {
      this.vehicleAssetData.setFilter([
        // fields we want to include in the search
        {
          field: 'vehicleName',
          search: query
        },
        {
          field: 'assetName',
          search: query
        }
      ], false);
    } else {
      this.vehicleAssetData.setFilter([], true);
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.getAssetVehicleMappedData();
    this.getVehicle();
    this.getAsset();

  }

  getAssetVehicleMappedData() {
    this.vehicleMappingData = MAPDETAILS;
    this.vehicleAssetData = new LocalDataSource(this.vehicleMappingData);
  }

  //Function to get location data via Api in dropdown
  getVehicle() {
    this.vehicleList = VEHICLELST;
  }

  getAsset() {
    this.assetList = ASSETLST;
  }

  // Function to edit a table row
  editVehicleAsset(vehicle: any) {
    this.isEdit = true;
    console.log(vehicle)
    this.setLocationDetails();
  }
  setLocationDetails() {


  }


  // To clear the selected/input values
  clearAllVariables() {
    this.selectedVehicleId = null;
    this.selectedAssetId = null;
    // this.searchBox = null;
  }

  saveClick() {

  }
}



const MAPDETAILS = [
  {
    vehicleId: 1,
    vehicleName: "Tractor",
    assetName: [{ assetId: 1, assetName: "asset1" }]
  },
  {
    vehicleId: 1,
    vehicleName: "Truck",
    assetName: [{ assetId: 2, assetName: "asset2" }]
  },
  {
    vehicleId: 1,
    vehicleName: "Car",
    assetName: [{ assetId: 3, assetName: "asset3" }]
  },
]


const VEHICLELST = [
  {
    vehicleId: 1,
    vehicleName: "Tractor"
  },
  {
    vehicleId: 2,
    vehicleName: "Truck"
  },
  {
    vehicleId: 3,
    vehicleName: "Car"
  },
  {
    vehicleId: 4,
    vehicleName: "Vehicle"
  },
  {
    vehicleId: 5,
    vehicleName: "Dump Trucks"
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


