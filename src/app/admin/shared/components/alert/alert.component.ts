import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  delay = 5000
  text?: string
  type?: string
  alertSub?: Subscription

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertSub = this.alertService.alert$
      .subscribe(alert => {
        this.text = alert.text
        this.type = alert.type

        const timeout = setTimeout(() => {
          clearTimeout(timeout)
          this.text = ''
        }, this.delay)
      })
  }

  ngOnDestroy(): void {
    if (this.alertSub) {
      this.alertSub.unsubscribe()
    }
  }

}
