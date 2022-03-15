import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../shared/services/post.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  pSub!: Subscription
  dSub!: Subscription
  searchStr = ''

  constructor(
    private postService: PostService,
    private alertService: AlertService
    ) { }

  ngOnInit() {
    this.pSub = this.postService.getAll()
      .subscribe((liPost) => {
        this.posts = liPost
      })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }

  remove(id: string) {
    this.postService.remove(id)
      .subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== id)
        this.alertService.danger('The post has been deleted')
      })
  }
}
