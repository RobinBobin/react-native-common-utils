import {
   NativeModules,
   DatePickerAndroid
} from "react-native";

export default class StaticUtils {
   static spinkitColor(rgba) {
      return "#" + `${Array(7).join(0)}${(rgba >>> 8).toString(16)}`.slice(-6);
   }
   
   static round(value, decimals) {
      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
   }
   
   static getLocaleId() {
      return NativeModules.I18nManager.localeIdentifier.split("_")[1];
   }
   
   static async selectDate(component, dateFieldName = "date", maxDate = new Date())
   {
      try {
         const { action, year, month, day } = await DatePickerAndroid.open({
            date: component.state[dateFieldName],
            maxDate
         });
         
         const set = action == DatePickerAndroid.dateSetAction;
         
         if (set) {
            component.setState({[dateFieldName]: new Date(year, month, day)});
         }
         
         return set;
      } catch (error) {
         alert(`Couldn't show date picker: ${error}.`);
      }
   }
}
