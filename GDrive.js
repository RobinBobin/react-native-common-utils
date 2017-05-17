import StaticUtils from "./StaticUtils";
import utf8 from "./utf8";

const newline = "\n";
const uploadUrl = "https://www.googleapis.com/upload/drive/v3/files";

function createHeaders(bearer, contentType, contentLength) {
   const headers = new Headers();
      
   headers.append("Authorization", `Bearer ${bearer}`);
   headers.append("Content-Type", contentType);
   headers.append("Content-Length", contentLength);
   
   return headers;
}

/**
 * Is supposed to be used with joonhocho/react-native-google-sign-in.
 */
export default class GDrive {
   static init(user, boundary = "foo_bar_baz") {
      GDrive.user = user;
      GDrive.boundary = boundary;
   }
   
   static createFileMultipart(media, mediaType, metadata) {
      const ddb = `--${GDrive.boundary}`;
      const ending = `${newline}${ddb}--`;
      
      let body = `${newline}${ddb}${newline}` +
         `Content-Type: application/json; charset=UTF-8${newline}${newline}` +
         `${JSON.stringify(metadata)}${newline}${newline}${ddb}${newline}` +
         `Content-Type: ${mediaType}${newline}${newline}`;
      
      body = media.constructor == String ? body + `${media}${ending}` :
         new Uint8Array(
            StaticUtils.encodedUtf8ToByteArray(utf8.encode(body))
            .concat(media)
            .concat(StaticUtils.encodedUtf8ToByteArray(utf8.encode(ending))));
      
      return fetch(
         `${uploadUrl}?uploadType=multipart`, {
            method: "POST",
            headers: createHeaders(
               GDrive.user.accessToken,
               `multipart/related; boundary=${GDrive.boundary}`,
               body.length),
            body
         });
   }
}
