package ru.rshalimov.reactnative.common;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import java.lang.reflect.Method;

public class Utils {
   private static final Method getMapBoolean;
   private static final Method getMapString;
   private static final Method getMapMap;
   private static final Method getMapArray;
   
   static {
      try {
         getMapBoolean = ReadableMap.class.getMethod("getBoolean", String.class);
         getMapString = ReadableMap.class.getMethod("getString", String.class);
         getMapMap = ReadableMap.class.getMethod("getMap", String.class);
         getMapArray = ReadableMap.class.getMethod("getArray", String.class);
      } catch (ReflectiveOperationException e) {
         throw new RuntimeException(e);
      }
   }
   
   public static boolean getBoolean(ReadableMap
      map, String key, boolean defaultValue)
   {
      return safeGet(map, key, getMapBoolean, Boolean.valueOf(defaultValue));
   }
   
   public static String getString(ReadableMap
      map, String key, String defaultValue)
   {
      return safeGet(map, key, getMapString, defaultValue);
   }
   
   public static ReadableMap getMap(ReadableMap map, String key) {
      return safeGet(map, key, getMapMap, null);
   }
   
   public static ReadableArray getArray(ReadableMap map, String key) {
      return safeGet(map, key, getMapArray, null);
   }
   
   public static String getFileNameExtension(ReadableMap map,
      String nameKey, String extensionKey, String defaultName)
   {
      return getFileNameExtension(map, nameKey, extensionKey, defaultName, "");
   }
   
   public static String getFileNameExtension(ReadableMap map, String nameKey,
      String extensionKey, String defaultName, String defaultExtension)
   {
      final String fileName = getString(map, nameKey, defaultName);
      final String fileExtension = getString(map, extensionKey, defaultExtension);
      
      return fileExtension == null || fileExtension.isEmpty() ?
         fileName : String.format("%s.%s", fileName, fileExtension);
   }
   
   @SuppressWarnings("unchecked")
   private static <T> T safeGet(ReadableMap map,
      String key, Method getter, T defaultValue)
   {
      try {
         return map.hasKey(key) ? (T)getter.invoke(map, key) : defaultValue;
      } catch (ReflectiveOperationException e) {
         throw new RuntimeException(e);
      }
   }
}
