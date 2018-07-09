import { TestBed, inject } from '@angular/core/testing';

import { ParentTaskService } from './parent-task.service';

describe('ParentTaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParentTaskService]
    });
  });

  it('should be created', inject([ParentTaskService], (service: ParentTaskService) => {
    expect(service).toBeTruthy();
  }));
});
