import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.component.html',
  styleUrls: ['./edit-email.component.css']
})
export class EditEmailComponent implements OnInit {
  displayResponsive:boolean;

  constructor() { }

  ngOnInit(): void {
  }

  showResponsiveDialog() {
    this.displayResponsive = true;
}

}
