import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryListComponent } from './repository-list.component';
import { By } from '@angular/platform-browser';

const mockRepositories = [
  {
    name: 'Repo 1',
    description: 'Description 1',
    topics: ['Topic1', 'Topic2'],
  },
  {
    name: 'Repo 2',
    description: 'Description 2',
    topics: ['Topic3', 'Topic4'],
  },
];

describe('RepositoryListComponent', () => {
  let component: RepositoryListComponent;
  let fixture: ComponentFixture<RepositoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepositoryListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryListComponent);
    component = fixture.componentInstance;
    component.repositories = mockRepositories;
    fixture.detectChanges();
  });

  // my test cases
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display repositories correctly', () => {
    const repoItems = fixture.debugElement.queryAll(By.css('.repository-item'));
    expect(repoItems.length).toEqual(mockRepositories.length);

    repoItems.forEach((item, index) => {
      const nameElement = item.query(By.css('.repository-name'));
      const descriptionElement = item.query(By.css('.repository-description'));
      const topicElements = item.queryAll(By.css('.repository-topic'));

      expect(nameElement.nativeElement.textContent).toContain(
        mockRepositories[index].name
      );
      expect(descriptionElement.nativeElement.textContent).toContain(
        mockRepositories[index].description
      );

      mockRepositories[index].topics.forEach((topic, topicIndex) => {
        expect(topicElements[topicIndex].nativeElement.textContent).toContain(
          topic
        );
      });
    });
  });
});
