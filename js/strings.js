import LocalizedStrings from "react-native-localization";
export { LocalizedStrings };

export default function () {
   const object = arguments[0];
   const prototype = arguments.length == 2 ? undefined : arguments[1].prototype;
   const className = arguments[arguments.length - 1];
   
   const all = {...object};
   
   if (prototype) {
      Object.getOwnPropertyNames(prototype).forEach(methodName => methodName ==
         "constructor" || (all[methodName] = object[methodName].bind(object)));
   }
   
   return className ? Object.assign({...object[className]}, {all}) : all;
}
