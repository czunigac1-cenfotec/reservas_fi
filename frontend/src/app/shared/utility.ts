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
  }