import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  username: string = '';
  repos: any[] = [];
  userData: any;

  loading: boolean = false;
  pageSize: number = 10;
  currentPage: number = 1;

  faLocationDot = faLocationDot;
  faXmark = faXmark;

  constructor(private apiService: ApiService) {}

  findRepositories() {
    this.apiService
      .getRepos(this.username, this.currentPage, this.pageSize)
      .subscribe((data: any[]) => {
        this.repos = data;
        this.loading = false;
      });
  }

  getUserData(username: string) {
    this.apiService.getUser(username).subscribe((data: any) => {
      this.userData = data;
    });
  }

  search() {
    this.loading = true;
    this.currentPage = 1;
    this.findRepositories();
    this.getUserData(this.username);
  }

  nextPage() {
    this.currentPage++;
    this.findRepositories();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.findRepositories();
    }
  }

  onPageSizeChange(event: any) {
    const pageSize = event.target.value;
    this.pageSize = parseInt(pageSize, 10);
    this.findRepositories();
  }

  cancelSearch() {
    this.username = '';
    this.repos = [];
  }
}
