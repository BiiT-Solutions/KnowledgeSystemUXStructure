import { TestBed } from '@angular/core/testing';

import { KnowledgeSystemRootService } from './knowledge-system-root.service';

describe('KnowledgeSystemStructureRootService', () => {
  let service: KnowledgeSystemRootService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnowledgeSystemRootService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
