export default class Preferences {
   static array = [];
   
   constructor() {
      throw new Error("Class 'Preferences' mustn't be instantiated.");
   }
   
   static safeAddPreference(preferenceClass, name, defaultValue, componentType) {
      if (Preferences.array.findIndex(p => p.name.valueOf() == name.valueOf()) == -1) {
         console.log(`Adding ${name}`);
         Preferences.array.push(new preferenceClass(name, defaultValue, componentType));
      } else {
         console.log(`Skipping ${name}`);
      }
   }
   
   static loaded() {
      return Preferences.array.map(value => value.loaded);
   }
}
