package ru.rshalimov.reactnative.common.sharedata;

import android.content.Intent;
import android.net.Uri;
import android.text.Html;
import android.text.Spanned;
import android.util.Base64;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableType;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import ru.rshalimov.reactnative.common.Utils;
import ru.rshalimov.reactnative.common.PromiseException;

public class Module extends ReactContextBaseJavaModule {
   private static final String TAG = "RNCShareData";
   
   private static final String ERROR_NO_TEMP_FILE_DST = "ERROR_NO_TEMP_FILE_DST";
   private static final String ERROR_NO_SRC_TO_COPY = "ERROR_NO_SRC_TO_COPY";
   private static final String ERROR_TEMP_FILE_CREATE = "ERROR_TEMP_FILE_CREATE";
   
   private final List <File> allFilesToDelete = new ArrayList <> ();
   
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
      
      constants.put(ERROR_NO_TEMP_FILE_DST, ERROR_NO_TEMP_FILE_DST);
      constants.put(ERROR_NO_SRC_TO_COPY, ERROR_NO_SRC_TO_COPY);
      constants.put(ERROR_TEMP_FILE_CREATE, ERROR_TEMP_FILE_CREATE);
      
      return constants;
   }
   
   @ReactMethod
   public void deleteTempFiles() {
      for (File file : allFilesToDelete) {
         file.delete();
      };
   }
   
   @ReactMethod
   public void send(ReadableMap data, Promise promise) {
      final Intent intent = new Intent(Intent.ACTION_SEND_MULTIPLE)
         .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
         .setType(Utils.getString(data, "mime", "*/*"));
      
      // = to, cc, bcc = //
      for (String [] recipients : new String [][] {
         { "to", Intent.EXTRA_EMAIL },
         { "cc", Intent.EXTRA_CC },
         { "bcc", Intent.EXTRA_BCC }
      }) {
         if (data.hasKey(recipients[0])) {
            final List <String> list = new ArrayList <> ();
            
            if (data.getType(recipients[0]) == ReadableType.String) {
               list.add(data.getString(recipients[0]));
            } else {
               final ReadableArray array = data.getArray(recipients[0]);
               
               for (int i = 0; i < array.size(); i++) {
                  list.add(array.getString(i));
               }
            }
            
            intent.putExtra(recipients[1], list.toArray(new String[0]));
         }
      }
      
      // = subject = //
      intent.putExtra(Intent.EXTRA_SUBJECT, Utils.getString(data, "subject", null));
      
      // = text, html = //
      if (data.hasKey("text")) {
         intent.putExtra(Intent.EXTRA_TEXT, data.getString("text"));
      } else if (data.hasKey("html")) {
         final Spanned html = Html.fromHtml(data.getString("html"));
         
         intent
            .putExtra(Intent.EXTRA_TEXT, html)
            .putExtra(Intent.EXTRA_HTML_TEXT, html);
      }
      
      final List <File> filesToDelete = new ArrayList <> ();
      PromiseException promiseException = null;
      
      try {
         // = attachments = //
         if (data.hasKey("attachments")) {
            final ReadableArray attachments = data.getArray("attachments");
            final ArrayList <Uri> uris = new ArrayList <> ();
            
            final File externalCacheDir = getCurrentActivity().
               getExternalCacheDir();
            
            if (externalCacheDir == null) {
               throw new PromiseException(ERROR_NO_TEMP_FILE_DST);
            }
            
            for (int i = 0; i < attachments.size(); i++) {
               final ReadableMap attachment = attachments.getMap(i);
               
               final File dst = new File(externalCacheDir, Utils.
                  getFileNameExtension(attachment, "name", "ext",
                     UUID.randomUUID().toString()));
               
               if (attachment.hasKey("base64")) {
                  try (final FileOutputStream fos = new FileOutputStream(dst)) {
                     fos.write(Base64.decode(attachment.
                        getString("base64"), Base64.DEFAULT));
                  }
               } else if (attachment.hasKey("path")) {
                  copyFile(attachment.getString("path"), dst);
               } else if (attachment.hasKey("uri")) {
                  copyFile(Uri.parse(attachment.getString("uri")).getPath(), dst);
               } else {
                  throw new PromiseException(ERROR_NO_SRC_TO_COPY);
               }
               
               filesToDelete.add(dst);
               
               uris.add(Uri.fromFile(dst));
            }
            
            intent.putParcelableArrayListExtra(Intent.EXTRA_STREAM, uris);
         }
         
         getCurrentActivity().startActivity(
            !Utils.getBoolean(data, "createChooser", true) ? intent : Intent.
               createChooser(intent, Utils.getString(data, "chooserTitle", null)));
         
         allFilesToDelete.addAll(filesToDelete);
         
         promise.resolve(Boolean.TRUE);
      } catch (PromiseException e) {
         promiseException = e;
      } catch (IOException e) {
         promiseException = new PromiseException(ERROR_TEMP_FILE_CREATE, e);
      }
      
      if (promiseException != null) {
         for (File file : filesToDelete) {
            file.delete();
         }
         
         promise.reject(promiseException.code, promiseException);
      }
   }
   
   private void copyFile(String src, File dst) throws IOException {
      try (
         final FileInputStream fis = new FileInputStream(new File(src));
         final FileOutputStream fos = new FileOutputStream(dst);
         final FileChannel s = fis.getChannel();
         final FileChannel d = fos.getChannel())
      {
         d.transferFrom(s, 0, s.size());
      }
   }
}
