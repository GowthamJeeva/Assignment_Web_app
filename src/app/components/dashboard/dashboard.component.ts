import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // displayedColumns: string[] = ['SNo', 'Details'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  nameSearch = '';
  categorySearch = '';
  productQuery = {
    searchName: '',
    searchCategory: '',
    sort: {
        field: '',
        by: ''
    }
};
productList = [];
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor( private userService: UserService) {}

  ngOnInit() {

    this.userService.getProductList(this.productQuery).subscribe(res => {
      this.productList = res.data;
    });
    // this.dataSource.paginator = this.paginator;

  }
  addProduct(item) {
    this.userService.setCartItems(item);
  }
  searchProduct() {
    this.productQuery.searchName = this.nameSearch;
    this.productQuery.searchCategory = this.categorySearch;
    this.userService.getProductList(this.productQuery).subscribe(res => {
      this.productList = res.data;
    });
  }

  setValue(value) {
    if (value === '1') {
      this.productQuery.sort.field = 'price';
      this.productQuery.sort.by = 'asc';
    } else if (value === '2') {
      this.productQuery.sort.field = 'rating';
      this.productQuery.sort.by = 'asc';
    } else if (value === '3') {
      this.productQuery.sort.field = 'price';
      this.productQuery.sort.by = 'desc';
    } else if (value === '4') {
      this.productQuery.sort.field = 'rating';
      this.productQuery.sort.by = 'desc';
    }
  }
}

// export interface PeriodicElement {
//   SNo: string;
//   Details: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { SNo: 'DATE', Details: 'MARCH 24 2019'},
//   { SNo: 'STOCK EXCHANGE', Details: 'NSE'},
//   { SNo: 'OPTION', Details: 'NIFTY 04TH APR 12000 CE'},
//   { SNo: 'BUY', Details: 'AT PRICE 7.42 INR On MARCH 22 2019'},
//   { SNo: 'SELL', Details: 'AT PRICE 20.00 INR on or before APR 04 2019'},
//   { SNo: 'QUANTITY', Details: '975'},
//   { SNo: 'INVESTMENT', Details: '10,000/-  INR'},
//   { SNo: 'PROFIT', Details: 'PROJECTED 9500/- INR'},
//   { SNo: 'LOSS', Details: 'PROJECTED 9122.50/- INR'},
//   { SNo: 'CALL STATUS', Details: 'UNDER OBSERVATION'},
// ];
