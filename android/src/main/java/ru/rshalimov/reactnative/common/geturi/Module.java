package ru.rshalimov.reactnative.common.geturi;

import android.net.Uri;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

public class Module extends ReactContextBaseJavaModule {
   private static final String TAG = "RNCGetUri";
   
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
   public void get(String pathType, String fileName, Promise promise) {
      final boolean dummy = fileName == null || fileName.isEmpty();
      final String fName = dummy ? "dummy" : fileName;
      
      File path = null;
      
      switch (pathType) {
         case PATH_DB:
            path = getCurrentActivity().getDatabasePath(fName);
            
            if (dummy) {
               path = path.getParentFile();
            }
            
            break;
      }
      
      if (path == null) {
         promise.reject("Invalid path type", pathType);
      } else {
         promise.resolve(new Uri.Builder()
            .scheme("file")
            .path(path.getPath())
            .build()
            .toString());
      }
   }
}
