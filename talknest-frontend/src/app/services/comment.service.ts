import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { Result ,Comment} from './post.service';



@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'http://localhost:8000/api/v1/posts';

  constructor(private http: HttpClient) { }

  addComment(comment: Comment): Observable<string> {
    return this.http.post<Result<string>>(`${this.baseUrl}/addComment`, comment, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      map(result => {
        if (result.isSuccess) {
          return result.value;
        }
        throw new Error(result.error?.message || 'Unknown error');
      })
    );
  }
  
}

