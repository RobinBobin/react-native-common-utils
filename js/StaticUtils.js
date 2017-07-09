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
   
   static ensureBounds(value, min, max) {
      return Math.max(Math.min(value, max), min);
   }
   
   static pushAndReturnElement(array, element) {
      array.push(element);
      
      return element;
   }
   
   static quoteIfString(value) {
      return value.constructor == String ? `"${value}"` : value;
   }
   
   static safeQuoteIfString(value, quoteIfString) {
      return quoteIfString ? StaticUtils.quoteIfString(value) : value;
   }
   
   static objectToArray(object) {
      return Object.keys(object).reduce((p, c) => {
         p.push(object[c]);
         
         return p;
      }, []);
   }
}
