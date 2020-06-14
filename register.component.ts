import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  reg_message;

  Submit(k: NgForm) {
    //console.log(f.value);  // { first: '', last: '' }
    //console.log(f.valid);  // false
    console.log(k.value.user)
    console.log(k.value.mail)
    console.log(k.value.pass)
  
     this.myservice.username=k.value.user
     this.myservice.email=k.value.mail
     this.myservice.password=k.value.pass

     this.myservice.registerData(k.value.user,k.value.mail,k.value.password).subscribe((response)=>{
        
      console.log('response from Registration API is ', response);
      this.reg_message=response["message"]
      },(error) => {
      console.log('error is ', error)
    })
  }

constructor( private myservice:FetchService){
}
  ngOnInit() { 
  }
}
