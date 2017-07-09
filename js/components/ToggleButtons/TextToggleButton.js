import React from "react";
import { Text } from "react-native";
import { autobind } from "core-decorators";
import { styles } from "../../styles";
import AlterStyles from "../../AlterStyles";
import StaticUtils from "../../StaticUtils";
import SimpleToggleButton from "./SimpleToggleButton";

@autobind
export default class TextToggleButton extends React.Component {
   render() {
      const stylesData = [
         [styles.toggleButtons.$button.label.inactive, "label.inactive"]
      ];
      
      if (this.props.index == this.props.parent.state.currentIndex) {
         stylesData.push([styles.toggleButtons.$button.
            label.active, "label.active"]);
      }
      
      return <SimpleToggleButton {...this.props}>
         <Text style={StaticUtils.objectToArray(AlterStyles.combine(
            this.props.styles, stylesData).label)}>{this.props.value}</Text>
      </SimpleToggleButton>;
   }
   
   _fillStylesData(stylesData) {
      super._fillStylesData(stylesData);
      
      stylesData.push([styles.toggleButtons.$button.label, "label"]);
   }
}
