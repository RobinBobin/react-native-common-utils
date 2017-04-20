import Preference from "./Preference";

export default class SwitchPreference extends Preference {
   getValue() {
      const value = super.getValue();
      
      return value == (value.constructor == String ? String(true) : true);
   }
}
