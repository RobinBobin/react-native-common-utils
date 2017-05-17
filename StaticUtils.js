import { NativeModules } from "react-native";

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
   
   static encodedUtf8ToByteArray(encoded) {
      const ar = [];
      
      for (let i = 0; i < encoded.length; i++) {
         ar.push(encoded.charCodeAt(i));
      }
      
      return ar;
   }
   
   static addSeparator(array, separator, toString) {
      let str = "";
      
      for (let i = 0; i < array.length; i++) {
         const element = array[i];
         
         str += `${toString ? toString(element) : element.toString()}`;
         str += `${i < array.length - 1 ? separator : ""}`;
      }
      
      return str;
   }
   
   static ensureBounds(value, min, max) {
      return Math.max(Math.min(value, max), min);
   }
   
   static pushAndReturnElement(array, element) {
      array.push(element);
      
      return element;
   }
}
