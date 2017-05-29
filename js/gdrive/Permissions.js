import GDrive from "./GDrive";

const url = "https://www.googleapis.com/drive/v3/files/";
const permissions = "/permissions";

export default class Permissions {
   create(fileId, params) {
      const body = JSON.stringify(params);
      
      return fetch(`${url}${fileId}${permissions}`, {
         method: "POST",
         headers: GDrive._createHeaders(
            GDrive._contentTypeJson,
            body.length
         ),
         body
      });
   }
}
