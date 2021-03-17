import { NativeModules } from "react-native";

import ApplicationSession from "./js/ApplicationSession";
import EventHandlingHelper from "./js/EventHandlingHelper";
import NativeEventEmitterWrapper from "./js/NativeEventEmitterWrapper";
import StaticUtils from "./js/StaticUtils";

export {
   ApplicationSession,
   EventHandlingHelper,
   NativeEventEmitterWrapper,
   StaticUtils
};

exports.GetPath = NativeModules.RNCGetPath;
exports.ShareData = NativeModules.RNCShareData;
