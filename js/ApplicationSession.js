export default class ApplicationSession {
   static _sessionType;
   static _currentSession;
   static _nextSession;
   static _startListeners = [];
   static _shutdownListeners = [];
   
   constructor(context) {
      this._context = context;
      
      console.log("'ApplicationSession' is deprecated. Please use 'ApplicationSession2'.");
   }
   
   static async manage(nextAppState, context) {
      if (ApplicationSession._logStateChange) {
         console.log(`App state: ${nextAppState}.`);
      }
      
      if (nextAppState != "active") {
         for (let sessionName of ["_currentSession", "_nextSession"]) {
            const session = ApplicationSession[sessionName];
            
            if (session && !session._isShutdownRequested()) {
               session._requestShutdown();
            }
         }
      } else {
         ApplicationSession._nextSession = new ApplicationSession._sessionType(context);
         
         while (ApplicationSession._currentSession && !ApplicationSession._currentSession._isShutdown())
         {
            await new Promise(resolve => setTimeout(resolve, 100));
         }
         
         ApplicationSession._currentSession = ApplicationSession._nextSession;
         ApplicationSession._nextSession = null;
         
         ApplicationSession._currentSession._start();
      }
   }
   
   static addStartListener(listener) {
      ApplicationSession._startListeners.unshift(listener);
   }
   
   static removeStartListener(listener) {
      ApplicationSession._startListeners.splice(ApplicationSession._startListeners.findIndex(l => l == listener), 1);
   }
   
   static addShutdownListener(listener) {
      ApplicationSession._shutdownListeners.unshift(listener);
   }
   
   static removeShutdownListener(listener) {
      ApplicationSession._shutdownListeners.splice(ApplicationSession._shutdownListeners.findIndex(l => l == listener), 1);
   }
   
   static _setSessionType(sessionType, logStateChange) {
      ApplicationSession._sessionType = sessionType;
      ApplicationSession._logStateChange = logStateChange;
   }
   
   _isShutdownRequested() {
      return this._shutdownRequested;
   }
   
   _requestShutdown() {
      this._shutdownRequested = true;
   }
   
   _isShutdown() {
      return this._shutdown;
   }
   
   _setShutdown() {
      this._shutdown = true;
   }
}
