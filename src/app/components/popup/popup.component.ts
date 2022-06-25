import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
 
  displayResponsive:boolean;
  
  constructor() { 
 
  }
  ngOnInit(): void {}


  showResponsiveDialog() {
    this.displayResponsive = true;
}

}





