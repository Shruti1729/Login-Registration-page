import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.Component.html',
  styleUrls: ['./login.Component.css']
})
export class LoginComponent implements OnInit{
  msg;obj;router

  onSubmit(f: NgForm) {

     console.log(f.value.user)
     console.log(f.value.pass)
    
     this.myservice.username=f.value.user
     this.myservice.password=f.value.pass 

     this.myservice.loginData(f.value.user,f.value.password).subscribe((response)=>{
      console.log('response from Login API is ', response);
       
        if(response["status"]==200){
          window.location.href = 'https://www.robomq.io/';
        }
        this.myservice.message=response["message"]
        this.myservice.obj_name=response["object"]

        this.msg=response["message"]
        this.obj=response["object"]

        this.myservice.show_user=response["obj_user"]
        this.myservice.show_pass=response["obj_pass"]
       },(error) => {
      console.log('error is ', error)
    })
  }
  
constructor( private myservice:FetchService){
}
ngOnInit(){
    }  
}
