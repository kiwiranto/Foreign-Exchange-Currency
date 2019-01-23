import { ApiService } from './../../service/api-service/api-service.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { LatestStruct } from './../../library/struct/latest-currency.struct';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  currencyResponse: LatestStruct;
  currencyRegistered: LatestStruct;
  initialInput: number = 10;
  customResponse = [];
  allCurrencyList = [];
  slug = 'USD,IDR';
  addCurrencyStatus: boolean = false;
  newCurrency = null;

  constructor(public apiService: ApiService) { }

  ngOnInit() {
    this.renderRegisteredCurrency();
    this.getAllCurrency();

    document.querySelector('input[type="tel"]').addEventListener('input', function(e) {
      this.value = this.value.replace(/[^0-9\+]/g, '');
    });
  }

  getAllCurrency() {
    this.apiService.getCurrencyLatest().subscribe(response => this.handleLatestCurrency(response));
  }

  handleLatestCurrency(response) {
    this.currencyResponse = response;
    let newResponse = response.rates;
    let self = this;

    Object.keys(newResponse).forEach(function(key) {
      let currency_code = key;
      let currency_value = newResponse[key];

      self.allCurrencyList.push({currency_code, currency_value});
    });
  }

  renderRegisteredCurrency() {
    this.apiService.listRegisteredCurrency(this.slug).subscribe(response => this.handleRegisteredCurrency(response));
  }

  handleRegisteredCurrency(response) {
    this.currencyRegistered = response;
    let newResponse = response.rates;
    let self = this;

    Object.keys(newResponse).forEach(function(key) {
      let currency_code = key;
      let currency_value = newResponse[key];

      self.customResponse.push({currency_code, currency_value});
    });
  }

  deleteCurrency(i) {
    let r = confirm('Are you sure ?')

    if (r) this.customResponse.splice(i, 1);
  }

  addCurrency() {
    this.addCurrencyStatus = true;
  }

  submitCurrency() {
    let newCurrency = (<HTMLInputElement>document.getElementById('newCurrency')).value.toUpperCase();
    
    if (newCurrency !== '') {
      this.slug = newCurrency;
      this.renderRegisteredCurrency();
    } else {
      alert('Please fill input!');
    }
  }

  selectNewCurrency(currencyCode) {
    this.newCurrency = currencyCode;
  }

}
