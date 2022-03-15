import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {FbCreateResponse, Post} from "../interfaces";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.fbDbUrl}posts.json`, post)
      .pipe(
        map((response: FbCreateResponse) => {
          const newPost: Post = {
            ...post,
            id: response.name,
            date: new Date(post.date)
          }
          return newPost
        })
      )
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fbDbUrl}posts.json`)
      .pipe(
        map((response: {[key: string]: any}) => {
          return Object
            .keys(response)
            .map(key => {
                const liPost =
                  {
                    ...response[key],
                    id: key,
                    date: new Date(response[key].date)
                  }
                return liPost
            })
        })
      )
  }

  remove(id: string): Observable<Object> {
    return this.http.delete(`${environment.fbDbUrl}posts/${id}.json`)
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDbUrl}posts/${id}.json`)
      .pipe(
        map((post: Post) => {
          const newPost: Post = {
            ...post,
            id,
            date: new Date(post.date)
          }
          return newPost
        })
      )
  }

  update (post: any): Observable<Post> {
    return this.http.patch<Post>(`${environment.fbDbUrl}posts/${post.id}.json`, post)
  }
}
