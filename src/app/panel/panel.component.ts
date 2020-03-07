import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, OnDestroy {

  openMenu = true;
  titleNav = "";
  titleNavSubscription: Subscription = new Subscription();

  constructor( private store: Store<AppState> ) {

   }

  ngOnInit() {
    this.titleNavSubscription = this.store.select('ui').subscribe(data =>{
      this.titleNav = data.title
    })
  }

  ngOnDestroy(){
    this.titleNavSubscription.unsubscribe();
  }

  logout(){
    location.reload();
  }

}
