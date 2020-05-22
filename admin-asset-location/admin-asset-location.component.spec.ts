import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssetLocationComponent } from './admin-asset-location.component';

describe('AdminAssetLocationComponent', () => {
  let component: AdminAssetLocationComponent;
  let fixture: ComponentFixture<AdminAssetLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAssetLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAssetLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
