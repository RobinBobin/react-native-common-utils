import { AsyncStorage } from "react-native";
import { autobind } from "core-decorators";
import Preferences from "./Preferences";

@autobind
export default class Preference {
   constructor(name, defaultValue = "", componentType) {
      this.name = name;
      this.section = Preferences;
      this.componentType = componentType;
      this.valueChangeListeners = new Set();
      
      name.split("\.").forEach((part, index, array) => index == array.length - 1 ?
         this.section[part] = this : ((!this.section.hasOwnProperty(part) &&
            (this.section[part] = {})), this.section = this.section[part]));
      
      this.loaded = new Promise(async (resolve, reject) => {
         let value;
         
         try {
            value = await AsyncStorage.getItem(this.toString());
         } catch (error) {
            this._onError(error);
         } finally {
            await this.setValue(value == null || value == undefined ?
               defaultValue : value) ? resolve() : reject();
         }
      });
   }
   
   getValue() {
      return this.value;
   }
   
   async setValue(value) {
      let result;
      
      try {
         await AsyncStorage.setItem(this.toString(), value.toString());
         
         this.value = value;
         
         for (let listener of this.valueChangeListeners.values()) {
            listener.onValueChanged(this);
         }
         
         result = true;
      } catch (error) {
         this._onError(error);
      }
      
      return result;
   }
   
   getComponentType() {
      return this.componentType;
   }
   
   toString() {
      return this.name;
   }
   
   addValueChangeListener(listener) {
      this.valueChangeListeners.add(listener);
   }
   
   removeValueChangeListener(listener) {
      this.valueChangeListeners.delete(listener);
   }
   
   clearValueChangeListeners() {
      this.valueChangeListeners.clear();
   }
   
   _onError(error) {
      console.log(`Preference(${this})._onError: ` +
         `${error ? JSON.stringify(error) : "!error == true"}`);
   }
}
