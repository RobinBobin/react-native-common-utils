import Files from "./Files";
import Permissions from "./Permissions";

/**
 * Is supposed to be used with joonhocho/react-native-google-sign-in.
 */
export default class GDrive {
   static _contentTypeJson = "application/json; charset=UTF-8";
   
   static init(user, params = {}) {
      GDrive.user = user;
      GDrive.files = new Files(params.files);
      GDrive.permissions = new Permissions();
   }
   
   static _createHeaders(contentType, contentLength, ... additionalPairs) {
      let pairs = [
         [ "Authorization", `Bearer ${GDrive.user.accessToken}` ],
         [ "Content-Type", contentType] ,
         [ "Content-Length", contentLength ]
      ];
      
      if (additionalPairs) {
         pairs = pairs.concat(additionalPairs);
      }
      
      const headers = new Headers();
      
      for (let pair of pairs) {
         headers.append(pair[0], pair[1]);
      }
      
      return headers;
   }
}
