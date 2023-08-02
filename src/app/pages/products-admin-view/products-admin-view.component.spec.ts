import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAdminViewComponent } from './products-admin-view.component';

describe('ProductsAdminViewComponent', () => {
  let component: ProductsAdminViewComponent;
  let fixture: ComponentFixture<ProductsAdminViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsAdminViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsAdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
