import {
   DatePickerAndroid,
   TimePickerAndroid
} from "react-native";
import { autobind } from "core-decorators";

@autobind
export default class DateTimePicker {
   constructor(
      component,
      dateTime = new Date,
      maxDate = new Date(),
      is24Hour = true)
   {
      this.component = component;
      this.dateTime = dateTime;
      this.maxDate = maxDate;
      this.is24Hour = is24Hour;
   }
   
   async pickDate() {
      const { action, year, month, day } = await DatePickerAndroid.open({
         date: this.dateTime,
         maxDate: this.maxDate
      });
      
      const set = action == DatePickerAndroid.dateSetAction;
      
      if (set) {
         this.dateTime.setYear(year);
         this.dateTime.setMonth(month);
         this.dateTime.setDate(day);
         
         this.component.forceUpdate();
      }
      
      return set;
   }
   
   async pickTime() {
      const { action, hour, minute } = await TimePickerAndroid.open({
         hour: this.dateTime.getHours(),
         minute: this.dateTime.getMinutes(),
         is24Hour: this.is24Hour
      });
      
      const set = action == TimePickerAndroid.timeSetAction;
      
      if (set) {
         this.dateTime.setHours(hour);
         this.dateTime.setMinutes(minute);
         
         this.component.forceUpdate();
      }
      
      return set;
   }
}
