import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetVehicleMappingComponent } from './asset-vehicle-mapping.component';

describe('AssetVehicleMappingComponent', () => {
  let component: AssetVehicleMappingComponent;
  let fixture: ComponentFixture<AssetVehicleMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetVehicleMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetVehicleMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
