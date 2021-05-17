export default class ApplicationSession2 {
  static __handlerNames = [
    "active",
    "background"
  ].reduce((p, c) => {
    const action = `${c[0].toUpperCase()}${c.substring(1)}`;
    p[c] = `_switchTo${action}`;
    
    return p;
  }, {});
  
  __switchCompleted = true;
  __currentState;
  __logStateChange = false;
  
  constructor(context) {
    console.log("The package 'ApplicationSession2' is deprecated. Please use https://www.npmjs.com/package/@robinbobin/react-native-application-session instead.")
    ;
    
    this._context = context;
    
    this.manage = this.manage.bind(this);
  }
  
  get currentState() {
    return this.__currentState
  }
  
  firstRun() {
    if (this.currentState === "active") {
      console.log("ApplicationSession2.firstRun()");
      
      this._switchToActive();
    }
  }
  
  get logStateChange() {
    return this.__logStateChange;
  }
  
  set logStateChange(logStateChange) {
    this.__logStateChange = logStateChange;
  }
  
  manage(nextState) {
    const handlerName = ApplicationSession2.__handlerNames[nextState];
    
    if (this[handlerName]) {
      if (this.__logStateChange) {
        console.log(`App state: ${nextState}.`);
      }
      
      this.__currentState = nextState;
      
      if (this.__switchCompleted) {
        this.__switchCompleted = false;
        this[handlerName]();
      }
    }
  }
  
  _isSwitchRequested(state) {
    return this.currentState === state && ApplicationSession2.__handlerNames[state];
  }
  
  _completeSwitch() {
    this.__switchCompleted = true;
  }
};
