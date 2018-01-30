import {
   NativeEventEmitter
} from "react-native";
import { autobind } from "core-decorators";

@autobind
export default class NativeEventEmitterHelper {
   constructor(nativeModule, ... listenerData) {
      this.emitter = new NativeEventEmitter(nativeModule);
      this.listeners = [];
      
      listenerData.forEach(data => this.listeners.push(
         this.emitter.addListener(data[0], data[1])));
   }
   
   removeAllListeners() {
      this.listeners.forEach(listener => listener.remove());
      
      return this;
   }
}
