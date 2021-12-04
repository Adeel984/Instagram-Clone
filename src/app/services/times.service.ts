import { Injectable } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@Injectable({
  providedIn: 'root'
})
export class TimesService {

  constructor(public datePicker: DatePicker) { }

  diffInHours(start_date, end_date ){

    let startDate:any = new Date(start_date);
    let EndDate:any = new Date(end_date);

    console.log( Date.parse(startDate), Date.parse(EndDate) )
    if(EndDate < startDate){
      return -1;
    }
    let diffMs = Math.abs(Date.parse(EndDate) - Date.parse(startDate)); // milliseconds
    let diffHrs = (diffMs / (1000 * 60 * 60)).toFixed(0); // hours
    return diffHrs;

  }

  public formatDateTime(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      minutes = d.getMinutes(),
      hour = d.getHours();

      var _hour = hour.toString();
      var _minutes = minutes.toString();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (_hour.length < 2) _hour = '0' + _hour;
    if (_minutes.length < 2) _minutes = '0' + _minutes;


    return [year, month, day].join('-') + " " + [_hour, _minutes].join(':');
  }

  public formatDateMDYHM(date) {

    if (date == null) { return date };
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      minutes = d.getMinutes(),
      hour = d.getHours();


    var ampm = 'AM'
    var _hour = hour.toString();
    var _minutes = minutes.toString();


    if (hour > 12) {
       _hour = (hour - 12).toString();
      ampm = 'PM'
    }

    if (month.toString().length < 2) month = '0' + month;
    if (day.toString().length < 2) day = '0' + day;
    if (hour.toString().length < 2) _hour = '0' + hour;
    if (minutes.toString().length < 2) _minutes = '0' + minutes;


    return [month, day, year].join('-') + " " + [_hour, _minutes].join(':') + ' ' + ampm;
  }

  formatAMPM(_dt) {
    let dt = new Date(_dt);
    var month = (dt.getMonth() > 8) ? (dt.getMonth() + 1) : ('0' + (dt.getMonth() + 1));
    var date = (dt.getDate() > 9) ? dt.getDate() : ('0' + dt.getDate());
    var year = dt.getFullYear();
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var _hours = hours < 10 ? '0'+ hours : hours;
    var _minutes = minutes < 10 ? '0'+ minutes : minutes;
    var strTime = month + '-' + date + '-' + year + ' ' + _hours + ':' + _minutes + ' ' + ampm;
    return strTime;
  }

  public customMDYHMformatDateMDYHM(_date) {

    if (_date == null) { return _date };
    // format must be 04-17-2019 08:13 // 24 hour format
    var date = _date.split(" ")[0];
    var time = _date.split(" ")[1];
    var hour = parseInt(time.split(":")[0]);
    var minutes = parseInt(time.split(":")[1]);

    var ampm = 'AM'
    if (hour > 12) {
      hour = (hour - 12);
      ampm = 'PM'
    }

    var _hour = hour.toString();
    var _minutes = minutes.toString();

    if (_hour.length < 2) _hour = '0' + _hour;
    if (_minutes.length < 2) _minutes = '0' + _minutes;
    return date + ' ' + [_hour, _minutes].join(':') + ' ' + ampm;
  }

  formatHoursToText(hour) {

    var lbl = ""
    switch (hour.toString()) {
      case "3":
        lbl = "3 Hours"
        break;
      case "6":
        lbl = "6 Hours"
        break;
      case "12":
        lbl = "12 Hours"
        break;
      case "24":
        lbl = "24 Hours"
        break;
      case "48":
        lbl = "48 Hours"
        break;
      case "168":
        lbl = "1 Week"
        break;
      case "336":
        lbl = "2 Weeks"
        break;
      case "720":
        lbl = "1 Month"
        break;
      case "876000":
        lbl = "No Limit"
        break;
      default:
        lbl = hour + " Hours"
        break;

    }

    return lbl;

  }

  public formatDateMDY(date) {

    if (date == null) { return date };
    let y = date.substring(0, 4);
    var temp = date.slice(5);
    temp = temp + '/' + y;
    temp = temp.replace('-', '/');
    return temp;

  }

  public formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  showDatePicker(_date = Date(), mode = 'date' ): Promise<any>{
    return new Promise( resolve => {
      this.datePicker.show({
        date: _date,
        mode: mode,
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      })
      .then((date) => { resolve(date); })
      .catch((err) => { resolve(null); });
    });
  }

  isOverThirteen(dob) {
    if (dob.getFullYear() != undefined && (new Date().getFullYear() - dob.getFullYear()) < 13) {
      return false;
    } else {
      return true
    }
  }

}
