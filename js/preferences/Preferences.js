export default class Preferences {
   static Data = class {
      constructor(name, defaultValue = "") {
         this._name = name;
         
         this.setDefaultValue(defaultValue);
         this.setSaveLazily(true);
      }
      
      setDefaultValue(defaultValue) {
         this._defaultValue = defaultValue;
         
         return this;
      }
      
      setComponentType(componentType) {
         this._componentType = componentType;
         
         return this;
      }
      
      setSaveLazily(saveLazily) {
         this._saveLazily = saveLazily;
         
         return this;
      }
   }
   
   
   static _array = [];
   static _loadedListeners = new Set();
   
   constructor() {
      throw new Error("Class 'Preferences' mustn't be instantiated.");
   }
   
   static safeAddPreference() {
      const preferenceClass = arguments[0];
      
      const data = arguments[1].constructor == Preferences.Data ? arguments[1] :
         new Preferences.Data(arguments[1], arguments[2])
            .setComponentType(arguments[3])
            .setSaveLazily(false);
      
      if (Preferences._array.findIndex(p => p.
         _data._name.valueOf() == data._name) != -1)
      {
         console.log(`Skipping ${data._name}.`);
      } else {
         console.log(`Adding ${data._name}.`);
         
         Preferences._array.push(new preferenceClass(data));
      }
   }
   
   static addLoadedListener(listener) {
      Preferences._loadedListeners.add(listener);
   }
   
   static clearLoadedListeners() {
      Preferences._loadedListeners.clear();
   }
   
   static areLoaded() {
      return !!Preferences._array.length;
   }
   
   static async load() {
      const length = (await Promise.all(Preferences._array.
         map(preference => preference._loaded))).length;
      
      for (let listener of Preferences._loadedListeners.values()) {
         listener.onLoaded();
      }
      
      return length;
   }
   
   static async save() {
      let result = true;
      
      for (let preference of Preferences._array) {
         if (!await preference.saveValue()) {
            result = false;
            break;
         }
      }
      
      return result;
   }
}
