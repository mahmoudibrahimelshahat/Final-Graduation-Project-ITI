import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-profile-order',
  templateUrl: './profile-order.component.html',
  styleUrls: ['./profile-order.component.css']
})
export class ProfileOrderComponent implements OnInit {
  userId:any;
  orders:any;


  constructor(private order:OrdersService) { }

  ngOnInit(): void {
    

  this.order.getAllOrders(this.userId).subscribe((data)=>
  {
    this.orders=data;
    console.log(this.userId);
    console.log(this.orders);

  })
  }

}
