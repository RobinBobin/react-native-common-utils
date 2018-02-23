import Preference from "./Preference";

export default class JSONPreference extends Preference {
   constructor(name, defaultValue = {}, componentType) {
      super(name, defaultValue, componentType);
   }
   
   async setValue(value) {
      const isString = value.constructor == String;
      
      return await super.setValue(
         isString ? JSON.parse(value) : value,
         isString ? value : JSON.stringify(value));
   }
}
