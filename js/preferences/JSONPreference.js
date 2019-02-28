import Preference from "./Preference";

export default class JSONPreference extends Preference {
   async setValue(value) {
      const isString = value.constructor == String;
      
      return await super.setValue(
         isString ? this._parse(value) : value,
         isString ? value : this._stringify(value));
   }
   
   _parse(value) {
      return JSON.parse(value);
   }
   
   _stringify(value) {
      return JSON.stringify(value);
   }
}
