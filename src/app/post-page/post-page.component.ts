import {Component, OnInit} from '@angular/core';
import {PostService} from "../shared/services/post.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs";
import {Post} from "../shared/interfaces";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$!: Observable<Post>

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      const id = param['id']
      return this.post$ = this.postService.getById(id)
    })

  }

}
