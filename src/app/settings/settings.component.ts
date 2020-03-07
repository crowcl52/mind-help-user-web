import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  userSubscription: Subscription = new Subscription();
  name = "";
  img="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRlWkkJDRgqwZriGSI4R0ntWMI9Scm31zIQGYJo5ZpeDHSC4MW3"
  title = "Editar Perfil";

  constructor( private store:Store<AppState> ) { 
    this.userSubscription = store.select('user').subscribe(u=>{
      console.log(u)
      this.img = u.data.profile_image_url;
      this.name = u.data.first_name+ " "+ u.data.last_name;
    })
  }

  ngOnInit() {
  }

  changeTitle(title){
    this.title = title;
  }

}
