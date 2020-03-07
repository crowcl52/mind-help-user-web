import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  userSubscription: Subscription = new Subscription();

  public registerFG: FormGroup;
  hide = true;
  userImg = "";

  constructor(private _formBuilder: FormBuilder, private store: Store<AppState>, private service: AuthService) {

  }

  ngOnInit() {

    this.userSubscription = this.store.select('user').subscribe(data => {
      let user = data.data;
      console.log(user)
      this.registerFG = this._formBuilder.group({
        first_name: [user.first_name, Validators.required],
        last_name: [user.last_name, Validators.required],
        email: [user.email, Validators.required],
        country_code: ['+52', Validators.required],
        phone_number: [user.phone_number, Validators.required],
        country: [user.country, Validators.required],
        date_of_birth: [user.date_of_birth, Validators.required],
        gender: [user.gender, Validators.required],
        time_zone: [user.time_zone, Validators.required],
        profile_image: [user.profile_image_url]
      });
    })



  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  register() {

    // let userData = new FormData();
    let date = this.registerFG.value.date_of_birth;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let user = {
      "role_id": (this.registerFG.value.role_id),
      "first_name": (this.registerFG.value.first_name),
      "last_name": (this.registerFG.value.last_name),
      "email": (this.registerFG.value.email),
      "password": (this.registerFG.value.password),
      "country_code": (this.registerFG.value.country_code),
      "phone_number": (this.registerFG.value.phone_number),
      "country": (this.registerFG.value.country),
      "date_of_birth": (`${day}-${month}-${year}`),
      "gender": (this.registerFG.value.gender),
      "time_zone": (this.registerFG.value.time_zone)
    }

    console.log(user)
  }

  clickFile(id) {
    document.getElementById(id).click();
  }

  getFile(event) {
  

    let file = event.target.files[0];
    this.userImg = file;
    let reader = new FileReader();
    reader.onload = this.fileOnload;
    reader.readAsDataURL(file);

  }

  fileOnload(e) {
    let result = e.target.result;
    this.userImg = result;
    document.getElementById("imgTag").setAttribute("src", result)
  }



  saveForm() {

    let date = this.registerFG.value.date_of_birth;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let user = {
      "first_name": (this.registerFG.value.first_name),
      "role_id": 3,
      "last_name": (this.registerFG.value.last_name),
      "email": (this.registerFG.value.email),
      "country_code": (this.registerFG.value.country_code),
      "phone_number": (this.registerFG.value.phone_number),
      "country": (this.registerFG.value.country),
      "date_of_birth": (`${day}-${month}-${year}`),
      "gender": (this.registerFG.value.gender),
      "time_zone": (this.registerFG.value.time_zone),
      "profile_image": this.userImg
    }

    console.log(user)

    this.service.editProfile(user).subscribe(data => {
      console.log(data)
    })

  }

}
