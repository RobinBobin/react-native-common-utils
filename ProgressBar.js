import React, { PropTypes } from "react";
import { View } from "react-native";

export default class ProgressBar extends React.Component {
   static defaultProps = {
      // = background props = //
      flex: 1,
      flexDirection: "row",
      size: 15,
      borderRadius: 10,
      borderColor: 0x0000FFFF,
      borderThickness: 2,
      progress: 0,
      progressColor: 0x00FF00FF,
      remainingColor: "white"
   };
   
   static propTypes = {
      progress: (props) => props.progress < 0 || props.progress > 1 ?
         new Error("'progress' supplied to 'ProgressBar' is expected to be " +
            "in the range 0..1 inclusive.") : undefined
   };
   
   render() {
      const row = this.props.flexDirection.indexOf("row") != -1;
      const reverse = this.props.flexDirection.indexOf("reverse") != -1;
      
      const innerBorderRadius = this.props.borderRadius -
         (this.props.borderRadius > 2 ? 2 : 0);
      
      const progressStyle = {
         flex: this.props.progress,
         backgroundColor: this.props.progressColor
      };
      
      const size = row ? "height" : "width";
      
      progressStyle[size] = this.props.size - 2 * this.props.borderThickness;
      progressStyle[row ? "marginTop" : "marginLeft"] = this.props.borderThickness;
      
      if (row) {
         progressStyle[`margin${reverse ? "Right" : "Left"}`] =
            this.props.borderThickness;
         
         progressStyle[`borderTop${reverse ? "Right" : "Left"}Radius`] =
            innerBorderRadius;
         
         progressStyle[`borderBottom${reverse ? "Right" :"Left"}Radius`] =
            innerBorderRadius;
      } else {
         progressStyle[`margin${reverse ? "Bottom" : "Top"}`] =
            this.props.borderThickness;
         
         progressStyle[`border${reverse ? "Bottom" : "Top"}LeftRadius`] =
            innerBorderRadius;
         
         progressStyle[`border${reverse ? "Bottom" : "Top"}RightRadius`] =
            innerBorderRadius;
      }
      
      const remainingStyle = {
         flex: 1 - this.props.progress,
         backgroundColor: this.props.remainingColor,
      };
      
      remainingStyle[size] = progressStyle[size];
      
      if (row) {
         remainingStyle.marginTop = progressStyle.marginTop;
         remainingStyle.marginLeft = progressStyle.marginRight;
         remainingStyle.marginRight = progressStyle.marginLeft;
         remainingStyle.borderTopLeftRadius = progressStyle.borderTopRightRadius;
         
         remainingStyle.borderBottomLeftRadius =
            progressStyle.borderBottomRightRadius;
         
         remainingStyle.borderTopRightRadius = progressStyle.borderTopLeftRadius;
         
         remainingStyle.borderBottomRightRadius =
            progressStyle.borderBottomLeftRadius;
      } else {
         remainingStyle.marginLeft = progressStyle.marginLeft;
         remainingStyle.marginTop = progressStyle.marginBottom;
         remainingStyle.marginBottom = progressStyle.marginTop;
         remainingStyle.borderTopLeftRadius = progressStyle.borderBottomLeftRadius;
         
         remainingStyle.borderTopRightRadius =
            progressStyle.borderBottomRightRadius;
         
         remainingStyle.borderBottomLeftRadius =
            progressStyle.borderTopLeftRadius;
         
         remainingStyle.borderBottomRightRadius =
            progressStyle.borderTopRightRadius;
      }
      
      return <View style={[this.props.style, {
         flex: this.props.flex,
         flexDirection: this.props.flexDirection,
         height: row ? this.props.size : undefined,
         width: row ? undefined : this.props.size,
         borderRadius: this.props.borderRadius,
         backgroundColor: this.props.borderColor}]}>
         <View style={progressStyle} />
         <View style={remainingStyle} />
      </View>
   }
}
