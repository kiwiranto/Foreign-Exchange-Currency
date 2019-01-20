import { Component, OnInit } from '@angular/core';
import { LatestStruct } from './../../library/struct/latest-currency.struct';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  currencyResponse: LatestStruct;
  fakeDatas: any = [1, 2, 3, 4]

  constructor() { }

  ngOnInit() {
    // this.getLatestCurrency();
  }

  getLatestCurrency() {
    // this.testService.getCurrencyLatest().subscribe(response => this.handleLatestCurrency(response));
  }

  handleLatestCurrency(response) {
    this.currencyResponse = response;

    console.log(response);
  }

}
