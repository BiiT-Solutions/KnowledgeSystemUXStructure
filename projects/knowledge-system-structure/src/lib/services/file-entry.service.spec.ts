import { TestBed } from '@angular/core/testing';

import {FileEntryService} from "./file-entry.service";

describe('FileEntryService', () => {
  let service: FileEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
