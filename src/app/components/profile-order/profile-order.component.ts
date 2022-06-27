import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.type';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-profile-order',
  templateUrl: './profile-order.component.html',
  styleUrls: ['./profile-order.component.css']
})
export class ProfileOrderComponent implements OnInit {
  userId:any;
  orders:any;
  dataUser:User;


  constructor(private order:OrdersService) { }

  ngOnInit(): void {

    this.dataUser = JSON.parse(localStorage.getItem('dataUser')||'{}');
   this.userId=this.dataUser?.userId;
    console.log(this.userId);
    

    
  this.order.getAllOrders(this.userId).subscribe((data)=>
  {
    this.orders=data;
    console.log(this.userId);
    console.log(this.orders);

  },
  (err)=>{
    alert('Something Went Error')
  })

  }
}
