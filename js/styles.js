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

   styles.button = {
      container: {
         ...centerCenter,
         height: styles.baseHeight,
         backgroundColor: 0x0099CBFF
      },
      text: {
         color: "white",
         fontSize: 20,
         textAlign: "center"
      }
   };

   styles.toggleButtons = {
      container: {
         flexDirection: "row",
         justifyContent: "center",
         paddingTop: styles.marginPadding * 0.5,
         paddingBottom: styles.marginPadding * 0.5
      },
      $button: {
         container: {
            inactive: {
               ...centerCenter,
               paddingTop: styles.marginPadding * 0.5,
               paddingBottom: styles.marginPadding * 0.5,
               paddingLeft: styles.marginPadding,
               paddingRight: styles.marginPadding
            },
            active: {
               backgroundColor: styles.textColor
            }
         },
         label: {
            inactive: {
               color: styles.textColor,
               fontSize: 20,
               textAlign: "center"
            },
            active: {
               color: "white"
            }
         }
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
