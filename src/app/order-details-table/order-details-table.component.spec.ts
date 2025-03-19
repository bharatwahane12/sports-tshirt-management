import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsTableComponent } from './order-details-table.component';

describe('OrderDetailsTableComponent', () => {
  let component: OrderDetailsTableComponent;
  let fixture: ComponentFixture<OrderDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDetailsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
