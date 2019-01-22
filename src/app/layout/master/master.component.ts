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
  slug = 'USD,IDR';
  addCurrencyStatus: boolean = false;

  constructor(public apiService: ApiService) { }

  ngOnInit() {
    this.renderRegisteredCurrency();

    document.querySelector('input[type="tel"]').addEventListener('input', function(e) {
      this.value = this.value.replace(/[^0-9\+]/g, '');
    });
  }

  getLatestCurrency() {
    this.apiService.getCurrencyLatest().subscribe(response => this.handleLatestCurrency(response));
  }

  handleLatestCurrency(response) {
    this.currencyResponse = response;
    let newResponse = response.rates;
    let self = this;

    Object.keys(newResponse).forEach(function(key) {
      let currencyCode = key;
      let currencyValue = newResponse[key];

      self.customResponse.push({currencyCode, currencyValue});
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
      let currencyCode = key;
      let currencyValue = newResponse[key];

      self.customResponse.push({currencyCode, currencyValue});
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

}
