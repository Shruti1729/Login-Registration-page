import { Component , OnInit} from '@angular/core';
import { FetchService } from '../fetch.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.Component.html',
  styleUrls: ['./login-button.Component.css']
})
export class LoginButtonComponent implements OnInit{
  det_user;det_pass;det_mail

  constructor(private myservice:FetchService){  
  }
  ngOnInit(){ 
      
      this.det_user=this.myservice.show_user
      this.det_mail=this.myservice.show_mail
      this.det_pass=this.myservice.show_pass
  }
}
