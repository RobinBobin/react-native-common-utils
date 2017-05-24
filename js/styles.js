import EStyleSheet from "react-native-extended-stylesheet";
import StaticUtils from "./StaticUtils";

export const consts = {
   marginPadding: 15,
   baseHeight: 50,
   textColor: 0x55606EFF,
   textColorDisabled: 0xD0CECEFF,
   baseFontSize: 14,
   fontSizeStep: 3,
   fontSizeSmallMediumSteps: 1,
   fontSizeMediumSteps: 2,
   fontSizeLargeSteps: 3,
   backgroundColor: 0xE9E9E9FF
};

export const centerCenter = {
   justifyContent: "center",
   alignItems: "center"
};

export const centerCenterFlex1 = {
   ...centerCenter,
   flex: 1
};

export const scene = {
   flex: 1,
   margin: consts.marginPadding
};

export const styles = {};

export { EStyleSheet };

export function fontSize(steps = 0) {
   return consts.baseFontSize + steps * consts.fontSizeStep;
};

export function createButton(
   containerBackgroundColor = 0x0099CBFF,
   textColor = "white",
   textFontSize = fontSize(2))
{
   return EStyleSheet.create({
      container: {
         ...centerCenter,
         height: consts.baseHeight,
         backgroundColor: containerBackgroundColor
      },
      text: {
         color: textColor,
         fontSize: textFontSize
      }
   });
};

export default StaticUtils.indexObjectWithClassName.bind(null, styles);
