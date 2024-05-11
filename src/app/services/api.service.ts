import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private cache = new Map<string, Observable<any>>();

  constructor(private httpClient: HttpClient) {}
  getUser(githubUsername: string) {
    return this.httpClient.get(
      `https://api.github.com/users/${githubUsername}`
    );
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params
  getRepos(
    username: string,
    page: number,
    pageSize: number
  ): Observable<any[]> {
    const url = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${pageSize}`;

    if (!this.cache.has(url)) {
      const request = this.httpClient.get<any[]>(url).pipe(
        catchError((error) => {
          return of([]);
        }),
        shareReplay(1)
      );

      this.cache.set(url, request);
    }
    return this.cache.get(url) || of([]);
  }
}
