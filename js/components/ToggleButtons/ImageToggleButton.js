import React from "react";
import { Image } from "react-native";
import { autobind } from "core-decorators";
import SimpleToggleButton from "./SimpleToggleButton";

@autobind
export default class ImageToggleButton extends React.Component {
   render() {
      return <SimpleToggleButton {...this.props} >
         <Image source={this.props.value} />
      </SimpleToggleButton>
   }
}
