package ru.rshalimov.reactnative.common.getpath;

import android.content.Context;
import android.net.Uri;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import ru.rshalimov.reactnative.common.Utils;

public class Module extends ReactContextBaseJavaModule {
   private static final String TAG = "RNCGetPath";
   
   private static final String PATH_DB = "DB";
   
   public Module(ReactApplicationContext reactContext) {
      super(reactContext);
   }
   
   @Override
   public String getName() {
      return TAG;
   }
   
   @Override
   public Map <String, Object> getConstants() {
      final Map <String, Object> constants = new HashMap <> ();
      
      constants.put(PATH_DB, PATH_DB);
      
      return constants;
   }
   
   @ReactMethod
   public void get(ReadableMap params, Promise promise) {
      final Context ctx = getCurrentActivity();
      final String pathType = params.getString("pathType");
      
      File path = null;
      
      switch (pathType) {
         case PATH_DB:
            path = ctx.getDatabasePath(Utils.getFileNameExtension(
               params, "fileName", "fileExtension", ""));
            
            break;
      }
      
      if (path == null) {
         promise.reject("Invalid path type", pathType);
      } else {
         promise.resolve(!Utils.getBoolean(params, "asUri", false) ?
            path.getPath() : new Uri.Builder()
               .scheme("file")
               .path(path.getPath())
               .build()
               .toString());
      }
   }
}
