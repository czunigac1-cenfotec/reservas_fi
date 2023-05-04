export class Utility {
    
    private static _instance: Utility;

    static getWeekDayNumber(weekDayName:string){
        
        var weekdayNameNumber = 0;

        switch (weekDayName) {
          case "Lunes":
            weekdayNameNumber = 0;
            break;
          case "Martes":
            weekdayNameNumber = 1;
            break;
          case "Miércoles":
            weekdayNameNumber = 2;
            break;
          case "Jueves":
            weekdayNameNumber = 3;
            break;
          case "Viernes":
            weekdayNameNumber = 4;
            break;
          case "Sábado":
            weekdayNameNumber = 5;
            break;
          case "Domingo":   
            weekdayNameNumber = 6;
            break;
        }
    
        return weekdayNameNumber;
    }


    static getWeekDayName(weekDayNumber:number){
        var weekDayName = '';

        switch (weekDayNumber) {
          case 0:
            weekDayName = 'Lunes';
            break;
          case 1:
            weekDayName = 'Martes';
            break;
          case 2:
            weekDayName = 'Miércoles';
            break;
          case 3:
            weekDayName = 'Jueves';
            break;
          case 4:
            weekDayName = 'Viernes';
            break;
          case 5:
            weekDayName = 'Sábado';
            break;
          case 6:
            weekDayName = 'Domingo';
            break;
        }
    
        return weekDayName;
    }

    static getTime(hour:string,minutes:string){
       
        if(hour.toString().length===1){
            hour = "0"+hour;    
        }
        
        if(minutes.toString().length===1){
            minutes = "0"+minutes;    
        }
        
        var time = `${hour}:${minutes}`;
    
        return time;
    }

    static getCurrentDateTime(hour:string,minutes:string): string {

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

    static getComponentFormattedDate(date: any) : any{

      var formattedDate = {
        "year": parseInt(date.split("T")[0].split("-")[0]),
        "month": parseInt(date.split("T")[0].split("-")[1]),
        "day": parseInt(date.split("T")[0].split("-")[2])
      }

      return formattedDate;
    }

    static getComponentFormattedTime(time: any) : any{

      var formattedTime = {
        hour: parseInt(time.split("T")[1].split(":")[0]),
        minute: parseInt(time.split("T")[1].split(":")[1])
      }

      return formattedTime;
    }
    
  }