import EStyleSheet from "react-native-extended-stylesheet";
import StaticUtils from "./StaticUtils";

export const styles = {
   marginPadding: 15,
   activeOpacity: 0.5,
   baseHeight: 50,
   textColor: 0x55606EFF,
   textColorDisabled: 0xD0CECEFF,
   backgroundColor: 0xE9E9E9FF
};

export const parameters = {
   font: {
      size: 14,
      step: 3,
      smallMediumSteps: 1,
      mediumSteps: 2,
      largeSteps: 3
   },
   button: {
      container: {
         height: styles.baseHeight,
         backgroundColor: 0x0099CBFF
      },
      text: {
         color: "white",
         fontSize: 20
      }
   },
   toggleButtons: {
      activeColors: {
         label: "white",
         background: styles.textColor
      },
      container: {
         flexDirection: "row",
         justifyContent: "center",
         paddingTop: styles.marginPadding * 0.5,
         paddingBottom: styles.marginPadding * 0.5
      },
      textButton: {
         container: {
            paddingTop: styles.marginPadding * 0.5,
            paddingBottom: styles.marginPadding * 0.5,
            paddingLeft: styles.marginPadding,
            paddingRight: styles.marginPadding
         },
         label: {
            color: styles.textColor,
            fontSize: 20,
            textAlign: "center"
         }
      }
   }
};

export const centerCenter = {
   justifyContent: "center",
   alignItems: "center"
};

export const centerCenterFlex1 = {
   ...centerCenter,
   flex: 1
};

export { EStyleSheet };

export function fontSize(steps = 0) {
   return parameters.font.size + steps * parameters.font.step;
};

export function addCommonObjects() {
   styles.scene = {
      flex: 1,
      margin: styles.marginPadding
   };
   
   styles.button = EStyleSheet.create({
      container: {
         ...centerCenter,
         ...parameters.button.container
      },
      text: {
         ...parameters.button.text,
         textAlign: "center"
      }
   });
   
   styles.toggleButtons = EStyleSheet.create({
      $activeColors: {
         ...parameters.toggleButtons.activeColors
      },
      container: {
         ...parameters.toggleButtons.container
      },
      $textButton: {
         container: {
            ...parameters.toggleButtons.textButton.container
         },
         label: {
            ...parameters.toggleButtons.textButton.label
         }
      }
   });
};

export default StaticUtils.indexObjectWithClassName.bind(null, styles);
