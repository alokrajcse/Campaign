import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarshboardDialogContent } from './darshboard-dialog-content';

describe('DarshboardDialogContent', () => {
  let component: DarshboardDialogContent;
  let fixture: ComponentFixture<DarshboardDialogContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarshboardDialogContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarshboardDialogContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
