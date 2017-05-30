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
import MaterialSwitch from "./js/MaterialSwitch";
import ProgressBar from "./js/ProgressBar";
import DateTimePicker from "./js/DateTimePicker";
import StaticUtils from "./js/StaticUtils";
import utf8 from "./js/utf8";
import ArrayStringifier from "./js/ArrayStringifier";

export {
   AlterStyles,
   ListViewHelper,
   MaterialSwitch,
   ProgressBar,
   DateTimePicker,
   StaticUtils,
   utf8,
   ArrayStringifier
};


/**
 * sqlbuilder.
 */
import SqlBldr from "./js/sqlbuilder/SqlBuilder";
import WhereBuilder from "./js/sqlbuilder/WhereBuilder";
import Condition from "./js/sqlbuilder/Condition";

export class SqlBuilder extends SqlBldr {
   static WhereBuilder = WhereBuilder;
   static Condition = Condition;
};


/**
 * GDrive.
 */
import GDrive from "./js/gdrive/GDrive";

export {
   GDrive
};


/**
 * Native modules.
 */
import { NativeModules } from "react-native";

exports.ShareData = NativeModules.RNCShareData;
exports.GetUri = NativeModules.RNCGetUri;
