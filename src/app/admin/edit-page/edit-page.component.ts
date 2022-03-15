import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../../shared/services/post.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription, switchMap} from "rxjs";
import {Post} from "../../shared/interfaces";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  dataLoading = true
  post?: Post
  submitted = false
  uSub?: Subscription

  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required)
  })

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((param: Params) => {
        const id = param['id']
        return this.postService.getById(id)
      })
    )
      .subscribe((newPost) => {
        this.post = newPost
        this.form.setValue({
          title: newPost.title,
          text: newPost.text,
          author: newPost.author
        })
        this.dataLoading = false
      })
  }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    this.uSub = this.postService.update(
      {
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
      author: this.form.value.author
    }).subscribe(post => {
        this.submitted = false
        this.alertService.success('The post have been update')
      }
    )
  }


}
