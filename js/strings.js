import LocalizedStrings from "react-native-localization";
export { LocalizedStrings };

export default (object, name) => name ? {
      all: object,
      ...object[name]
   } : object
;
