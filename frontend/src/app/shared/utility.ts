export class Utility {

  private static _instance: Utility;

  static getWeekDayNumber(weekDayName: string) {

    var weekdayNameNumber = 0;

    switch (weekDayName) {
      case "Lunes":
        weekdayNameNumber = 1;
        break;
      case "Martes":
        weekdayNameNumber = 2;
        break;
      case "Miércoles":
        weekdayNameNumber = 3;
        break;
      case "Jueves":
        weekdayNameNumber = 4;
        break;
      case "Viernes":
        weekdayNameNumber = 5;
        break;
      case "Sábado":
        weekdayNameNumber = 6;
        break;
      case "Domingo":
        weekdayNameNumber = 0;
        break;
    }

    return weekdayNameNumber;
  }

  static getWeekDayName(weekDayNumber: number | undefined | null) {
    var weekDayName = '';

    switch (weekDayNumber) {
      case 1:
        weekDayName = 'Lunes';
        break;
      case 2:
        weekDayName = 'Martes';
        break;
      case 3:
        weekDayName = 'Miércoles';
        break;
      case 4:
        weekDayName = 'Jueves';
        break;
      case 5:
        weekDayName = 'Viernes';
        break;
      case 6:
        weekDayName = 'Sábado';
        break;
      case 0:
        weekDayName = 'Domingo';
        break;
    }

    return weekDayName;
  }

  static getTime(hour: string | undefined | null, minutes: string | undefined | null) {

    if (hour != undefined &&
      hour != null &&
      hour.toString().length === 1) {
      hour = "0" + hour;
    }

    if (minutes != undefined &&
      minutes != null &&
      minutes.toString().length === 1) {
      minutes = "0" + minutes;
    }

    var time = `${hour}:${minutes}`;

    return time;
  }


  static getDate(year: number | undefined | null, month: number | undefined | null, day: number | undefined | null) {

    let monthStr: any;
    let dayStr:any;

    if (month != undefined &&
        month != null &&
        month.toString().length === 1) {
        monthStr = "0" + month;
    }else{
      monthStr = month?.toString();
    }

    if (day != undefined &&
        day != null &&
        day.toString().length === 1) {
        dayStr = "0" + day;
    }else{
      dayStr = day?.toString();
    }

    var date = `${year?.toString()}-${monthStr?.toString()}-${dayStr?.toString()}`;

    return date;
  }

  static getCurrentDateTime(hour: string | undefined | null, minutes: string | undefined | null): string {

    var dateTime = "";

    const currentDate: Date = new Date();
    const year: number = currentDate.getFullYear();
    const month: number = currentDate.getMonth() + 1;
    const day: number = currentDate.getDate();

    var time = { "hour": hour, "minute": minutes, "second": 0 }
    var date = { "year": year, "month": month, "day": day }


    dateTime = this.getFormattedDate(date) + "T" + this.getFormattedTime(time)

    return dateTime;
  }

  static getFormattedDate(date: any): string {
    let year = date.year;
    let month = date.month <= 9 ? '0' + date.month : date.month;
    let day = date.day <= 9 ? '0' + date.day : date.day;
    let formattedDate = year + "-" + month + "-" + day;

    return formattedDate;
  }

  static getFormattedTime(time: any): string {
    let hour = time.hour <= 9 ? '0' + time.hour : time.hour;
    let minute = time.minute <= 9 ? '0' + time.minute : time.minute;
    let formattedDate = hour + ":" + minute + ":00";

    return formattedDate;
  }

  static getComponentFormattedDate(date: any): any {

    var formattedDate = {
      "year": parseInt(date.split("T")[0].split("-")[0]),
      "month": parseInt(date.split("T")[0].split("-")[1]),
      "day": parseInt(date.split("T")[0].split("-")[2])
    }

    return formattedDate;
  }

  static getComponentFormattedTime(time: any): any {

    var formattedTime = {
      hour: parseInt(time.split("T")[1].split(":")[0]),
      minute: parseInt(time.split("T")[1].split(":")[1])
    }

    return formattedTime;
  }

  static getStringFormattedDate(date:string): any{
    
    var formattedDate = `${date}T00:00:00`;
    return formattedDate;
  }


  static getOnlyDateString(date:string): any{
    
    var formattedDate = date.split("T")[0];
    return formattedDate;
  }

}