package ru.rshalimov.reactnative.common;

public class PromiseException extends Exception {
   public final String code;
   
   public PromiseException(String code) {
      this(code, (String)null);
   }
   
   public PromiseException(String code, String message) {
      super(message);
      
      this.code = code;
   }
   
   public PromiseException(String code, Throwable t) {
      super(t);
      
      this.code = code;
   }
   
   @Override
   public String toString() {
      return String.format("%s%s%s", code, System.
         lineSeparator(), super.toString());
   }
}
