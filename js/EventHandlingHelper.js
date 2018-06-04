import { NativeEventEmitter } from "react-native";

function addEventTypes(eventTypes, eventGroup) {
   for (const entryName of Object.keys(eventGroup)) {
      const entry = eventGroup[entryName];
      
      entry.constructor == String ? eventTypes.push(
         entry) : addEventTypes(eventTypes, entry);
   }
}

function underscoredToCamelCased(underscored) {
   const indices = [0];
   let index = -1;
   
   while ((index = underscored.indexOf("_", index + 1)) != -1) {
      indices.push(index);
   }
   
   let camelCased = Array.from(underscored.toLowerCase());
   
   for (let index of indices.reverse()) {
      if (index) {
         camelCased.splice(index, 1);
      }
      
      camelCased[index] = camelCased[index].toUpperCase();
   }
   
   return camelCased.join("");
}

export default class EventHandlingHelper {
   constructor({object, nativeModule, events, eventGroups, exportRemove}) {
      if (!events) {
         events = nativeModule.events;
      }
      
      if (object._innerListener) {
         object._innerListener = object._innerListener.bind(object);
      }
      
      this._listeners = object._innerListener ? {} : [];
      this._emitter = new NativeEventEmitter(nativeModule);
      
      const eventTypes = [];
      
      eventGroups ? eventGroups.forEach(eventGroup => addEventTypes(
         eventTypes, events[eventGroup])) : addEventTypes(eventTypes, events);
      
      const that = this;
      
      for (const eventType of eventTypes) {
         if (object._innerListener) {
            this._listeners[eventType] = {
               listeners: [],
               innerListener: this._emitter.addListener(
                  eventType, object._innerListener)
            };
         }
         
         const camelCased = underscoredToCamelCased(eventType);
         
         object[`addOn${camelCased}Listener`] = function(listener) {
            object._innerListener ? that._listeners[eventType].listeners.push(
               listener) : that._listeners.push(that._emitter.addListener(
                  eventType, listener));
            
            return this;
         };
         
         if (object._innerListener) {
            object[`removeOn${camelCased}Listener`] = function(listener) {
               const index = that._listeners[eventType].listeners.indexOf(listener);
               
               if (index != -1) {
                  that._listeners[eventType].listeners.splice(index, 1);
               }
               
               return this;
            };
         }
      }
      
      if (!object._innerListener) {
         (exportRemove ? object : this).removeAllListeners = function() {
            that._listeners.forEach(listener => listener.remove());
         }
      } else {
         this.invokeListeners = function(data) {
            this._listeners[data.eventName].listeners.
               forEach(listener => listener(data));
         };
         
         (exportRemove ? object : this).removeListeners = function() {
            Object.keys(that._listeners).forEach(eventType =>
               that._listeners[eventType].listeners.length = 0);
         };
         
         (exportRemove ? object : this).removeInnerListeners = function() {
            Object.keys(that._listeners).forEach(eventType =>
               that._listeners[eventType].innerListener.remove());
         };
      }
   }
}
