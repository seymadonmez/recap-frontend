import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  

  constructor(private authService:AuthService,private toasterService:ToastrService) { }

  ngOnInit(): void {
  }

  isAuthenticated(){
    if(this.authService.isAuthenticated()){
      return true
    }
    else{
      return false
    }
   }

   logout(){
    this.authService.logOut()
    this.toasterService.success("Çıkış Yapıldı","Başarılı")
  }

}
