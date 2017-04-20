export default class StaticUtils {
   static spinkitColor(rgba) {
      return "#" + `${Array(7).join(0)}${(rgba >>> 8).toString(16)}`.slice(-6);
   }
   
   static round(value, decimals) {
      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
   }
}
