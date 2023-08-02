import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsUserViewComponent } from './products-user-view.component';

describe('ProductsUserViewComponent', () => {
  let component: ProductsUserViewComponent;
  let fixture: ComponentFixture<ProductsUserViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsUserViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
