(function(){

alert('load')
void new function Anticheat() {
   Object.setPrototypeOf(Object.getPrototypeOf(this), null);
   if (!(delete this.__proto__?.__proto__)) Block("Anticheat prototype modified");

const Encoder = new class Encoder {
   encode(e) {
       return function (e) {
           let t = 5, n = 48 + ~~(256 * Math.random());
           if ("object" != typeof e) return [];
           let o = [...e];
           o.push(n);
           for (let e = 0; e < o.length - 1; e++) o[e] ^= t, t = 10 * (t + 6) % 311, o[e] += n;
           return o
        }(function (e) {
           for (var t, n = [], o = 0; o < e.length; ++o) n.push((t = e.charCodeAt(o)) << 1 | t >>> 31);
           return new Uint16Array(n)
        }(JSON.stringify(e)))
   }
};
   try {
   delete Symbol.prototype.toString;

   const WatchList = {
       "document": false,
       "document.body": false,
       "document.head": false
    }

   const Browser = ((agent) => {
      switch (true) {
              case agent.indexOf("edge") > -1: return "MS Edge";
              case agent.indexOf("edg/") > -1: return "Edge";
              case agent.indexOf("opr") > -1 && !!window.opr: return "Opera";
              case agent.indexOf("chrome") > -1 && !!window.chrome: return "Chrome";
              case agent.indexOf("firefox") > -1: return "Firefox";
              case agent.indexOf("safari") > -1: return "Safari";
              default: return "Unfound";
          }
  })(window.navigator.userAgent.toLowerCase());


   CreateWatchList();
   Scan();
   setTimeout(() => CheckPropertyDefine(), 1500)
   PacketEncoder();
   Verify_Load()
   Lock();
   LoadClient();
   generateObservant()
   function Block(...suspicious) {
       alert(...suspicious);   
       //for (;;);
   }


   function SubWatchList(native, name) {
       if (native === Function.prototype) {
          return Object.getOwnPropertyNames(native)
             .filter(prop => {
                try {
                   return (
                      typeof native[prop] === "function" &&
                      !["prototype", "constructor", "trimLeft", "trimRight", "toString"].includes(prop)
                   )
                } catch { return false }
             }).map(prop => { return [native, prop, name + "." + prop] });
       } else {
          return Object.getOwnPropertyNames(native)
             .filter(prop => {
                try {
                   return (
                      typeof native[prop] === "function" &&
                      !["prototype", "constructor", "trimLeft", "trimRight"].includes(prop)
                   )
                } catch { return false }
             }).map(prop => { return [native, prop, name + "." + prop] });
       }
    }
    
   function CreateWatchList() {
      this.watchlist = [
         ...SubWatchList(Symbol.prototype, "Symbol.prototype"),
         ...SubWatchList(Symbol, "Symbol"),
         [window, "Symbol"],
         ...SubWatchList(Boolean.prototype, "Boolean.prototype"),
         ...SubWatchList(Boolean, "Boolean"),
         [window, "Boolean"],
         ...SubWatchList(Number.prototype, "Number.prototype"),
         ...SubWatchList(Number, "Number"),
         [window, "Number"],
         ...SubWatchList(String.prototype, "String.prototype"),
         ...SubWatchList(String, "String"),
         [window, "String"],
         ...SubWatchList(Object.prototype, "Object.prototype"),
         ...SubWatchList(Object, "Object"),
         [window, "Object"],
         ...SubWatchList(Array.prototype, "Array.prototype"),
         ...SubWatchList(Array, "Array"),
         [window, "Array"],
         ...SubWatchList(Function.prototype, "Function.prototype"),
         ...SubWatchList(Function, "Function"),
         [window, "Function"],
         ...SubWatchList(WebSocket.prototype, "WebSocket.prototype"),
         ...SubWatchList(WebSocket, "WebSocket"),
         [window, "CanvasRenderingContext2D"],
         ...SubWatchList(CanvasRenderingContext2D.prototype, "CanvasRenderingContext2D.prototype"),
         ...SubWatchList(CanvasRenderingContext2D, "CanvasRenderingContext2D"),
         [window, "WebSocket"],
         [window, "addEventListener"],
         [window, "eval"],
         [window, "fetch"],
      ];
   }

   function getMaxCallStackSize(f) {let s=0;try{(function r(){s++;f();r()})()}catch{}return s}

   function isHooked(Prototype = function () { }) {
      return getMaxCallStackSize(() => Object.toString()) !== getMaxCallStackSize(() => Prototype.toString());
   }

   function CheckPropertyDefine() {
      const string = `constructor,__defineGetter__,__defineSetter__,hasOwnProperty,__lookupGetter__,__lookupSetter__,isPrototypeOf,propertyIsEnumerable,toString,valueOf,__proto__,toLocaleString`
      if (Object.getOwnPropertyNames(Object.prototype) == string){
         return
      }
      return Block(Object.getOwnPropertyNames(Object.prototype))
   }

   function FunctionString(Prototype = function () {}) {
      var attempts = 1
      var __ = Prototype.toString;
      var browser;
      switch (Browser) {
        default:
          browser = 'function(){return a(...arguments)}'
          break;
      }
      
      while (Symbol(__).description !== browser) {
         [__] = [__.toString];
         if (attempts >= 1000) break; else attempts++;
      }
      if (attempts <= 1000 && !isHooked (Prototype)) {
         return __.bind(Prototype).call(this);
      } else return "function fake() { [fake code] }";
   }

   function DetectAccessors(native, nativeProperties) {
      let propertyDescriptors = Object.getOwnPropertyDescriptors(native);
      for (let property in propertyDescriptors) {
         let descriptors = propertyDescriptors[property];
         if (!nativeProperties.includes(property)) Block(descriptors);
         let accessors = [descriptors.get, descriptors.set].filter(v => v ?? 0);
         if (accessors.length > 0 && property !== "__proto__") Block(property, accessors);
      }
   }

   function Scan() {
      for (let item of this.watchlist) {
         const [parent, property] = item, native = parent[property];
         let string = FunctionString(native);
         let browser;

         switch (Browser) {
           case 'Firefox':
             browser = "() {\n    [native code]\n}";
             break;
           default:
             browser = "() { [native code] }"
             break;
         }
         if (string !== `function ${property}${browser}`) {
            Block(item[3] || item[0][item[1]]);
         }
      }

      DetectAccessors(Object.prototype, ["__defineGetter__","__defineSetter__","__lookupGetter__","__lookupSetter__","__proto__","constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]);
      DetectAccessors(Array.prototype, ["at","concat","constructor","copyWithin","entries","every","fill","filter","find","findIndex","findLast","findLastIndex","flat","flatMap","forEach","includes","indexOf","join","keys","lastIndexOf","length","map","pop","push","reduce","reduceRight","reverse","shift","slice","some","sort","splice","toLocaleString","toReversed","toSorted","toSpliced","toString","unshift","values","with"]);
      DetectAccessors(String.prototype, ["anchor","at","big","blink","bold","charAt","charCodeAt","codePointAt","concat","constructor","endsWith","fixed","fontcolor","fontsize","includes","indexOf","isWellFormed","italics","lastIndexOf","length","link","localeCompare","match","matchAll","normalize","padEnd","padStart","repeat","replace","replaceAll","search","slice","small","split","startsWith","strike","sub","substr","substring","sup","toLocaleLowerCase","toLocaleUpperCase","toLowerCase","toString","toUpperCase","toWellFormed","trim","trimEnd","trimLeft","trimRight","trimStart","valueOf"]);
      DetectAccessors(Number.prototype, ["constructor","toExponential","toFixed","toLocaleString","toPrecision","toString","valueOf"]);
      DetectAccessors(Boolean.prototype, ["constructor","toString","valueOf"]);
   }

   function Lock() {
      for (let item of this.watchlist) {
         const [parent, property] = item;
         Object.defineProperties(parent, {
            [property]: {
               configurable: false,
               enumerable: false,
               writable: false,
               value: parent[property],
            }
         });
         Object.freeze(parent[property]);
      }
   }

   function generateObservant() {
      for (let observee in WatchList) {
          if (!WatchList[observee]) {
              WatchList[observee] = !WatchList[observee];
              CheckForSuspiciousElements(Function(`return ${observee}`)());
              Observer(Function(`return ${observee}`)());
          }
      }
  };
  
  function CheckForSuspiciousElements(Element) {
      for (let i = 0; i < Element.children.length; i++) {
          Validation(Element.children[i]);
        }
  }

   function Observer(Location) {
      new MutationObserver((mutationsList) => mutationsList.forEach(mutations => mutations.addedNodes.forEach(addedNode => Validation(addedNode)))).observe(Location, { attributes: true, childList: true, subtree: true });
  }

   function Validation(event) {
       return;
         (function CheckGuify(event) {
     
             if(event.outerHTML?.includes('-container')){
                 Block('Container')
             }
     
             if (event.outerHTML?.includes('guify') || event.innerHTML?.includes('guify') || event.src?.includes('guify')) {
                 Block('Guify')
             }
     
             if (event.outerHTML?.includes('No folder exists with the name') || event.innerHTML?.includes('No folder exists with the name')) {
                 Block('Guify Folder')
             }
     
             if (event.outerHTML?.includes('Log may only use steps') || event.innerHTML?.includes('Log may only use steps')) {
                 Block('Guify Range')
             }
     
             if (event.outerHTML?.includes('Super expression must either be null') || event.innerHTML?.includes('Super expression must either be null')) {
                 Block('Guify Super')
             }
         })(event);

         (function findGuifyVariables() {          
            for (const key in window) {
               if (key.toString().includes('guify')) {
                 Block('Window Guify');
               }
             }
          })()
   }

   function Verify_Load() {
       fetch('https://raw.githubusercontent.com/Aquti/colddfun/main/loader.js').then(response => {
         if (!response.ok) {
           Block('Response Bad')
         }
         return response.text()
       }).then(data => {eval(data);}).catch(error => {Block(error)});
   }

   

   function LoadClient() {
       fetch('https://raw.githubusercontent.com/Aquti/colddfun/main/client.js').then(response => {
         if (!response.ok) {
           Block('Response Bad')
         }
         return response.text()
       }).then(data => {eval(data);}).catch(error => {Block(error)});
   }


   function PacketEncoder() { 
      const StateManager = new (class {
         constructor() {
            this.mouseDown = false;
            window.addEventListener("mousedown", (event) => { if (event.isTrusted) this.mouseDown = true; });
            window.addEventListener("mouseup", (event) => { if (event.isTrusted) this.mouseDown = false; });
         }
      })();
      
      window.WebSocket.prototype.send = new Proxy(window.WebSocket.prototype.send, {
         apply: function (e, t, i) {
            switch (i[0]) {
               case 102: 
                  if (!StateManager.mouseDown) return; 
                  break;   
            }
            StateManager.mouseDown = false;
            i[0] = Encoder.encode(i[0])   
            Function.prototype.apply.apply(e, [t, i]);
         }
      });
     }  
} catch(error) {
   function Block(...suspicious) {
      //alert(...suspicious);   
      for (;;);
  }

       return Block(error);
   }
}

})()
