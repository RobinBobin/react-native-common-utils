import StaticUtils from "../StaticUtils";
import utf8 from "../utf8";
import GDrive from "./GDrive";

const uploadUrl = "https://www.googleapis.com/upload/drive/v3/files";

export default class Files {
   constructor(params = {}) {
      this.params = params;
      
      [
         [ "boundary", "foo_bar_baz" ]
      ].forEach(nameValue => this.params[nameValue[0]] =
         this.params[nameValue[0]] || nameValue[1]);
   }
   
   createFileMultipart(media, mediaType, metadata) {
      const ddb = `--${this.params.boundary}`;
      const ending = `\n${ddb}--`;
      
      let body = `\n${ddb}\n` +
         `Content-Type: ${GDrive._contentTypeJson}\n\n` +
         `${JSON.stringify(metadata)}\n\n${ddb}\n` +
         `Content-Type: ${mediaType}\n\n`;
      
      if (media.constructor == String) {
         body += `${media}${ending}`;
      } else {
         body = new Uint8Array(
            StaticUtils.encodedUtf8ToByteArray(utf8.encode(body))
            .concat(media)
            .concat(StaticUtils.encodedUtf8ToByteArray(utf8.encode(ending))));
      }
      
      return fetch(
         `${uploadUrl}?uploadType=multipart`, {
            method: "POST",
            headers: GDrive._createHeaders(
               `multipart/related; boundary=${this.params.boundary}`,
               body.length),
            body
         });
   }
}
