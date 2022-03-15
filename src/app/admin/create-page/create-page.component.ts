import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../shared/interfaces";
import {PostService} from "../../shared/services/post.service";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup = new FormGroup({
    title: new FormControl(
      null, Validators.required),
    text: new FormControl(
      null, Validators.required),
    author: new FormControl(
      null, Validators.required
    )
  })

  constructor(
    private postService: PostService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }

    const post: Post = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date(),
    }

    this.postService.create(post)
      .subscribe((newPost) => {
        this.form.reset()
        this.alertService.success('The post has been created')
      })
  }
}
