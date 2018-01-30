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
import NativeEventEmitterWrapper from "./js/NativeEventEmitterWrapper";

export {
   AlterStyles,
   ListViewHelper,
   DateTimePicker,
   StaticUtils,
   NativeEventEmitterWrapper
};


/**
 * Native modules.
 */
import { NativeModules } from "react-native";

exports.ShareData = NativeModules.RNCShareData;
exports.GetPath = NativeModules.RNCGetPath;
