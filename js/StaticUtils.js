import { NativeModules } from "react-native";
import { StaticUtils as StaticUtilsBase } from "simple-common-utils";

export default class StaticUtils extends StaticUtilsBase {
   static spinkitColor(rgba) {
      return "#" + `${Array(7).join(0)}${(rgba >>> 8).toString(16)}`.slice(-6);
   }
   
   static getLocaleId() {
      return NativeModules.I18nManager.localeIdentifier.split("_")[1];
   }
}
