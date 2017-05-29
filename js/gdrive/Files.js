import StaticUtils from "../StaticUtils";
import ArrayStringifier from "../ArrayStringifier";
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
   
   async safeCreateFolder(metadata) {
      const mimeFolder = "application/vnd.google-apps.folder";
      
      let result = await this.list({
         q: `mimeType='${mimeFolder}' and trashed=false and ` +
            `name='${metadata.name}' and '${metadata.parents[0]}' in parents`
      });
      
      if (!result.ok) {
         throw result;
      }
      
      let json = await result.json();
      
      let id;
      
      if (json.files.length) {
         id = json.files[0].id;
      } else {
         metadata.mimeType = mimeFolder;
         
         const body = JSON.stringify(metadata);
         
         result = await fetch(GDrive._urlFiles, {
            method: "POST",
            headers: GDrive._createHeaders(
               GDrive._contentTypeJson,
               body.length),
            body
         });
         
         if (!result.ok) {
            throw result;
         }
         
         id = (await result.json()).id;
      }
      
      return id;
   }
   
   list(params) {
      const array = [];
      
      Object.keys(params).forEach(key => array.push(`${key}=${params[key]}`));
      
      const parameters = new ArrayStringifier(array)
         .setPrefix("?")
         .setSeparator("&")
         .process();
      
      return fetch(`${GDrive._urlFiles}${parameters}`, {
         headers: GDrive._createHeaders()
      });
   }
}
