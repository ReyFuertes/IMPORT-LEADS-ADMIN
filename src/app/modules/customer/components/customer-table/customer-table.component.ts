import { Component, OnInit } from '@angular/core';
const DUMMY_DATA = [{
  id: 1000,
  name: "James Butt",
  email: "jamesbutt@gmail.com",
  company: "Benton, John B Jr",
  date: "2015-09-13",
  status: "pending",
  phoneNumber: "000-000-000-000",
  address: "Hongkong",
  companyName: "Factor 101",
  companyAddress: "China 102 Street"
},
{
  id: 1001,
  name: "Josephine Darakjy",
  email: "josedark@gmail.com",
  company: "Chanay, Jeffrey A Esq",
  date: "2019-02-09",
  status: "approved",
  phoneNumber: "000-000-000-000",
  address: "China",
  companyName: "Factor 102",
  companyAddress: "China 103 Street"
},
{
  id: 1002,
  name: "Art Venere",
  email: "artvene@gmail.com",
  company: "Chemel, James L Cpa",
  date: "2017-05-13",
  status: "approved",
  phoneNumber: "000-000-000-000",
  address: "China",
  companyName: "Factor 102",
  companyAddress: "China 103 Street"
},
{
  id: 1003,
  name: "Lenna Paprocki",
  email: "lenapap@gmail.com",
  company: "Feltz Printing Service",
  date: "2020-09-15",
  status: "approved",
  phoneNumber: "000-000-000-000",
  address: "China",
  companyName: "Factor 102",
  companyAddress: "China 103 Street"
},
{
  id: 1004,
  name: "Donette Foller",
  email: "donfoll@gmail.com",
  company: "Printing Dimensions",
  date: "2016-05-20",
  status: "approved",
  phoneNumber: "000-000-000-000",
  address: "China",
  companyName: "Factor 102",
  companyAddress: "China 103 Street"
},
{
  id: 1005,
  name: "Simona Morasca",
  email: "simonmarasca@gmail.com",
  company: "Chapman, Ross E Esq",
  date: "2018-02-16",
  status: "approved",
  phoneNumber: "000-000-000-000",
  address: "China",
  companyName: "Factor 102",
  companyAddress: "China 103 Street"
},
{
  id: 1006,
  name: "Mitsue Tollner",
  email: "mittollner@gmail.com",
  company: "Morlong Associates",
  date: "2018-02-19",
  status: "approved",
  phoneNumber: "000-000-000-000",
  address: "China",
  companyName: "Factor 102",
  companyAddress: "China 103 Street"
},
{
  id: 1007,
  name: "Leota Dilliard",
  email: "leotadillaiard@gmail.com",
  company: "Commercial Press",
  date: "2019-08-13",
  status: "approved",
  phoneNumber: "000-000-000-000",
  address: "China",
  companyName: "Factor 102",
  companyAddress: "China 103 Street"
},
{
  id: 1008,
  name: "Sage Wieser",
  email: "sageserk@gmail.com",
  company: "Truhlar And Truhlar Attys",
  date: "2018-11-21",
  status: "approved",
  phoneNumber: "000-000-000-000",
  address: "China",
  companyName: "Factor 102",
  companyAddress: "China 103 Street"
}]

@Component({
  selector: 'il-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit {
  public customers: any[];

  constructor() { }

  ngOnInit() {
    this.customers = DUMMY_DATA;
  }
}
