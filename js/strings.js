import LocalizedStrings from "react-native-localization";
export { LocalizedStrings };

export default (object, className) => {
   const all = {...object};
   
   return className ? Object.assign({...object[className]}, {all}) : all;
}
