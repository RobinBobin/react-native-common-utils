import { AsyncStorage } from "react-native";
import Preferences from "./Preferences";

export default class Preference {
   constructor(data) {
      this._data = data;
      this._valueChangeListeners = new Set();
      
      let section = Preferences;
      
      this._data._name.split("\.").forEach((part, index, array) => index == array.
         length - 1 ? section[part] = this : ((!section.hasOwnProperty(part) &&
            (section[part] = {})), section = section[part]));
      
      this._loaded = new Promise(async (resolve, reject) => {
         let value;
         
         try {
            value = await AsyncStorage.getItem(this.toString());
         } catch (error) {
            this._onError(error);
         } finally {
            await this.setValue(value == null ? this._data.
               _defaultValue : value) ? resolve() : reject();
         }
      });
   }
   
   getValue() {
      return this._value;
   }
   
   async setValue(value, stringifiedValue) {
      const result = this._data._saveLazily ||
         await this.saveValue(value, stringifiedValue);
      
      if (result) {
         this._value = value;
         
         if (this._data._saveLazily) {
            this._stringifiedValue = stringifiedValue;
         }
         
         for (let listener of this._valueChangeListeners.values()) {
            listener.onValueChanged(this);
         }
      }
      
      return result;
   }
   
   async saveValue() {
      let result;
      
      try {
         await AsyncStorage.setItem(this.toString(), (arguments.length ?
            arguments[1] : this._stringifiedValue) || (arguments.length ?
               arguments[0] : this._value).toString());
         
         result = true;
      } catch (error) {
         this._onError(error);
      }
      
      return result;
   }
   
   getComponentType() {
      return this._data._componentType;
   }
   
   toString() {
      return this._data._name;
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
