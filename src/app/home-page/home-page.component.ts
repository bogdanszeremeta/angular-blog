import { Component, OnInit } from '@angular/core';
import {PostService} from "../shared/services/post.service";
import {Post} from "../shared/interfaces";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private postService: PostService) { }

  post$?: Observable<Post[]>

  ngOnInit(): void {
    this.post$ = this.postService.getAll()
      .pipe(
        map(posts => {
          return posts.sort((a, b) => {
            const aDate = a.date
            const bDate = b.date
            if (aDate < bDate) {
              return 1
            } else if (aDate > bDate) {
              return -1
            } else {
              return 0
            }
          })
        })
      )
  }

}
