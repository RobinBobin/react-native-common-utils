import { NativeModules } from "react-native";

import ApplicationSession from "./js/ApplicationSession";
import ApplicationSession2 from "./js/ApplicationSession2";
import EventHandlingHelper from "./js/EventHandlingHelper";
import NativeEventEmitterWrapper from "./js/NativeEventEmitterWrapper";
import StaticUtils from "./js/StaticUtils";

export {
   ApplicationSession,
   ApplicationSession2,
   EventHandlingHelper,
   NativeEventEmitterWrapper,
   StaticUtils
};

exports.GetPath = NativeModules.RNCGetPath;
exports.ShareData = NativeModules.RNCShareData;
