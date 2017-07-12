/**
 * Preferences.
 */
import Preferences from "./js/preferences/Preferences";
import Preference from "./js/preferences/Preference";
import NumberPreference from "./js/preferences/NumberPreference";
import SwitchPreference from "./js/preferences/SwitchPreference";
import ArrayPreference from "./js/preferences/ArrayPreference";

export {
   Preferences,
   Preference,
   NumberPreference,
   SwitchPreference,
   ArrayPreference
};


/**
 * Different.
 */
import AlterStyles from "./js/AlterStyles";
import ListViewHelper from "./js/ListViewHelper";
import DateTimePicker from "./js/DateTimePicker";
import StaticUtils from "./js/StaticUtils";
import utf8 from "./js/utf8";
import ArrayStringifier from "./js/ArrayStringifier";
import DottedStringObject from "./js/DottedStringObject";

export {
   AlterStyles,
   ListViewHelper,
   DateTimePicker,
   StaticUtils,
   utf8,
   ArrayStringifier,
   DottedStringObject
};


/**
 * Components.
 */
import MaterialSwitch from "./js/components/MaterialSwitch";
import ProgressBar from "./js/components/ProgressBar";
import ToggleButtons from "./js/components/ToggleButtons/ToggleButtons";
import ImageToggleButton from "./js/components/ToggleButtons/ImageToggleButton";
import TextToggleButton from "./js/components/ToggleButtons/TextToggleButton";

export {
   MaterialSwitch,
   ProgressBar,
   ToggleButtons,
   ImageToggleButton,
   TextToggleButton
};


/**
 * sqlbuilder.
 */
import SqlBldr from "./js/sqlbuilder/SqlBuilder";
import SelectBuilder from "./js/sqlbuilder/SelectBuilder";
import WhereBuilder from "./js/sqlbuilder/WhereBuilder";
import Condition from "./js/sqlbuilder/Condition";

export class SqlBuilder extends SqlBldr {
   static SelectBuilder = SelectBuilder;
   static WhereBuilder = WhereBuilder;
   static Condition = Condition;
};


/**
 * Native modules.
 */
import { NativeModules } from "react-native";

exports.ShareData = NativeModules.RNCShareData;
exports.GetPath = NativeModules.RNCGetPath;
