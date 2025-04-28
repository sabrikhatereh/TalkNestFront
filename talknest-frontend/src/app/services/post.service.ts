import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';


export interface Result<T> {
  isSuccess: boolean;
  isFailure: boolean;
  error: any;
  errors: any[];
  value: T;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  comments?: Comment[];
}
export interface Comment {
  id?: string;
  postId: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:8000/api/v1/posts';


  constructor(private http: HttpClient) { }

  createPost(post: Partial<Post>): Observable<Post> {
    return this.http.post<Result<Post>>(this.baseUrl, post).pipe(
      map(result => {
        if (result.isSuccess) {
          return result.value;
        }
        throw new Error(result.error?.message || 'Unknown error');
      })
    );
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Result<Post>>(`${this.baseUrl}/${id}`).pipe(
      map(result => {
        if (result.isSuccess) {
          return result.value;
        }
        throw new Error(result.error?.message || 'Unknown error');
      })
    );
  }

  updatePost(post: Partial<Post>): Observable<Post> {
    return this.http.put<Result<Post>>(this.baseUrl, post).pipe(
      map(result => {
        if (result.isSuccess) {
          return result.value;
        }
        throw new Error(result.error?.message || 'Unknown error');
      })
    );
  }

  listPosts(): Observable<Post[]> {
    return this.http.get<Result<Post[]>>(this.baseUrl).pipe(
      map(result => {
        if (result.isSuccess) {
          return result.value;
        }
        throw new Error(result.error?.message || 'Unknown error');
      })
    );
  }
}