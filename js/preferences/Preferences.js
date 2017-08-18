export default class Preferences {
   static array = [];
   static loadedListeners = new Set();
   
   constructor() {
      throw new Error("Class 'Preferences' mustn't be instantiated.");
   }
   
   static safeAddPreference(preferenceClass, name, defaultValue, componentType) {
      if (Preferences.array.findIndex(p => p.name.
         valueOf() == name.valueOf()) != -1)
      {
         console.log(`Skipping ${name}`);
      } else {
         console.log(`Adding ${name}`);
         
         Preferences.array.push(new preferenceClass(
            name, defaultValue, componentType));
      }
   }
   
   static addLoadedListener(listener) {
      Preferences.loadedListeners.add(listener);
   }
   
   static clearLoadedListeners() {
      Preferences.loadedListeners.clear();
   }
   
   static async load() {
      const length = (await Promise.all(Preferences.array.
         map(preference => preference.loaded))).length;
      
      for (let listener of Preferences.loadedListeners.values()) {
         listener.onLoaded();
      }
      
      return length;
   }
}
