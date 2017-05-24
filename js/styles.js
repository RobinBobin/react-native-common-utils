import EStyleSheet from "react-native-extended-stylesheet";
import StaticUtils from "./StaticUtils";

export const consts = {
   font: {
      size: 14,
      step: 3,
      smallMediumSteps: 1,
      mediumSteps: 2,
      largeSteps: 3
   },
   button: {
      containerBackgroundColor: 0x0099CBFF,
      textColor: "white",
      textFontSize: 20
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

export const styles = {
   marginPadding: 15,
   activeOpacity: 0.5,
   baseHeight: 50,
   textColor: 0x55606EFF,
   textColorDisabled: 0xD0CECEFF,
   backgroundColor: 0xE9E9E9FF
};

export { EStyleSheet };

export function fontSize(steps = 0) {
   return consts.font.size + steps * consts.font.step;
};

export function addCommonObjects() {
   styles.scene = {
      flex: 1,
      margin: styles.marginPadding
   };
   
   styles.button = EStyleSheet.create({
      container: {
         ...centerCenter,
         height: styles.baseHeight,
         backgroundColor: consts.button.containerBackgroundColor
      },
      text: {
         color: consts.button.textColor,
         fontSize: consts.button.textFontSize,
         textAlign: "center"
      }
   });
};

export default StaticUtils.indexObjectWithClassName.bind(null, styles);
