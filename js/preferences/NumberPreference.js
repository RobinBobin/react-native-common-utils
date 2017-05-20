import Preference from "./Preference";

export default class NumberPreference extends Preference {
   getValue() {
      return +super.getValue();
   }
}
