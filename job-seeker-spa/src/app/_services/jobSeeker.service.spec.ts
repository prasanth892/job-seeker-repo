/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JobSeekerService } from './jobSeeker.service';

describe('Service: JobSeeker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobSeekerService]
    });
  });

  it('should ...', inject([JobSeekerService], (service: JobSeekerService) => {
    expect(service).toBeTruthy();
  }));
});
