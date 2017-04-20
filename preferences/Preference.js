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
      
      this.loaded = new Promise(resolve =>
         AsyncStorage.getItem(this.toString())
            .catch(this._onError)
            .then(value => (this.setValue(value == null || value ==
               undefined ? defaultValue : value), resolve())));
   }
   
   getValue() {
      return this.value;
   }
   
   setValue(value) {
      this.value = value;
      
      AsyncStorage
         .setItem(this.toString(), this.getValue().toString())
         .catch(this._onError);
      
      for (let listener of this.valueChangeListeners.values()) {
         listener.onValueChanged(this);
      }
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
   
   removeValueChangeListener(listeners) {
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
