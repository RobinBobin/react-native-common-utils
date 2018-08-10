import EStyleSheet from "react-native-extended-stylesheet";

const centerCenter = {
   justifyContent: "center",
   alignItems: "center"
};

export const styles = {
   centerCenter,
   marginPadding: 15,
   activeOpacity: 0.5,
   baseHeight: 50,
   textColor: 0x55606EFF,
   textColorDisabled: 0xD0CECEFF,
   backgroundColor: 0xE9E9E9FF,
   centerCenterFlex1: {
      ...centerCenter,
      flex: 1
   },
   screen: {
      flex: 1,
      padding: styles.marginPadding,
      backgroundColor: styles.backgroundColor
   }
};

export const font = {
   size: 14,
   step: 3,
   smallMediumSteps: 1,
   mediumSteps: 2,
   largeSteps: 3
};

export function create() {
   styles.navigator = {
      backgroundColor: styles.backgroundColor
   };

   styles.navigatorWithPadding = {
      ...styles.navigator,
      padding: styles.marginPadding
   };

   styles.scene = {
      flex: 1
   };

   styles.sceneWithMargin = {
      ...styles.scene,
      margin: styles.marginPadding
   };

   styles.listView = {
      $itemHeight: styles.baseHeight * 1.2,
      separatorStyle: {
         height: styles.marginPadding * 0.5
      }
   };
}

export function build() {
   Object.keys(styles).forEach(key => {
      const field = styles[key];
      
      if (typeof field == "object") {
         let add = false;
         const subKeys = Object.keys(field);
         
         for (let subKey of subKeys) {
            if (typeof field[subKey] == "object") {
               add = true;
               break;
            }
         }
         
         if (add) {
            styles[key] = EStyleSheet.create(field);
         }
      }
   });
   
   EStyleSheet.build();
};

export function fontSize(steps = 0) {
   return font.size + steps * font.step;
};

export default require("./strings").default.bind(null, styles);
