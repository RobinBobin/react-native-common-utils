/**
 * Preferences.
 */
import Preferences from "./js/preferences/Preferences";
import Preference from "./js/preferences/Preference";
import NumberPreference from "./js/preferences/NumberPreference";
import SwitchPreference from "./js/preferences/SwitchPreference";
import ArrayPreference from "./js/preferences/ArrayPreference";
import JSONPreference from "./js/preferences/JSONPreference"

export {
   Preferences,
   Preference,
   NumberPreference,
   SwitchPreference,
   ArrayPreference,
   JSONPreference
};


/**
 * Different.
 */
import DateTimePicker from "./js/DateTimePicker";
import StaticUtils from "./js/StaticUtils";
import NativeEventEmitterWrapper from "./js/NativeEventEmitterWrapper";
import EventHandlingHelper from "./js/EventHandlingHelper";
import ApplicationSession from "./js/ApplicationSession";

export {
   DateTimePicker,
   StaticUtils,
   NativeEventEmitterWrapper,
   EventHandlingHelper,
   ApplicationSession
};


/**
 * Native modules.
 */
import { NativeModules } from "react-native";

exports.ShareData = NativeModules.RNCShareData;
exports.GetPath = NativeModules.RNCGetPath;
