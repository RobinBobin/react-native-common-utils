package ru.rshalimov.reactnative.common;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CommonPackage implements ReactPackage {
   private final List <String> moduleNames;
   
   public CommonPackage(String ...modules) {
      final List <String> m = new ArrayList <> ();
      
      for (String module : (modules.length > 0 ? modules : new String [] {
         "sharedata",
         "getpath"
      })) {
         m.add(module);
      }
      
      moduleNames = Collections.unmodifiableList(m);
   }
   
   @Override
   @SuppressWarnings("unchecked")
   public List <NativeModule> createNativeModules(
      ReactApplicationContext reactContext)
   {
      final StringBuilder sb = new StringBuilder();
      final String packageName = getClass().getPackage().getName();
      final List <NativeModule> nativeModules = new ArrayList <> ();
      
      try {
         for (String module : moduleNames) {
            final Class <NativeModule> clazz =
               (Class <NativeModule>)Class.forName(sb
                  .delete(0, sb.length())
                  .append(packageName)
                  .append('.')
                  .append(module)
                  .append('.')
                  .append("Module")
                  .toString());
            
            nativeModules.add(clazz.getConstructor(ReactApplicationContext.
               class).newInstance(reactContext));
         }
         
         return Collections.unmodifiableList(nativeModules);
      } catch (ReflectiveOperationException e) {
         throw new RuntimeException(e);
      }
   }
   
   @Override
   public List <Class <? extends JavaScriptModule>> createJSModules() {
      return Collections.emptyList();
   }
   
   @Override
   public List <ViewManager> createViewManagers(
      ReactApplicationContext reactContext)
   {
      return Collections.emptyList();
   }
}
