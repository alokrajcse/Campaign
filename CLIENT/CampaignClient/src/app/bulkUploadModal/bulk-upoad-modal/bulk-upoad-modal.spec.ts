import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUpoadModal } from './bulk-upoad-modal';

describe('BulkUpoadModal', () => {
  let component: BulkUpoadModal;
  let fixture: ComponentFixture<BulkUpoadModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkUpoadModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkUpoadModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
