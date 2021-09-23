## 1.mode（代表更多配置）
```
string = 'production': 'none' | 'development' | 'production' // 默认为 production

// 不配置 mode 的话，默认为 production,会对代码进行压缩和丑化
```

## 2. webpack CommonJS 模块化打包原理
##### (1) mode 设置为 production 时，会把 devtool 设置为 eval，不利于打包后的代码阅读，这里把他设置为 shource-map
```
devtool: 'source-map',
```
### CommonJS 打包后的源码解读（bundle.js）
```
// 定义了一个对象
// 模块的路径作为 key，函数作为 value
var __webpack_modules__ = ({
  "./src/js/formate.js":
    (function (module) {

      const dateFormate = (date) => {
        return '2020-12-12';
      }

      const priceFormate = (price) => {
        return '100.00';
      }

      // 对 __webpack_require__ 函数的 module 对象的 exports属性进行赋值
      module.exports = {
        dateFormate,
        priceFormate
      }
    })
});

  // 定义一个对象，用于加载模块的缓存
  var __webpack_module_cache__ = {};

  // 是一个函数，当我们加载一个模块时，都会通过这个函数来加载
  function __webpack_require__(moduleId) {
    /** 1.判断缓存中是否已加载过 */
    var cachedModule = __webpack_module_cache__[moduleId]; 
    if (cachedModule !== undefined) { // 缓存已加载过
      return cachedModule.exports;
    }

    /**2.
     * 对象的连续赋值,这里是把模块添加进缓存，并赋值给 module ，赋值了同一个对象
     * 这里 module 和  __webpack_module_cache__[moduleId] 指向同一个内存地址，更改一个，另一个也会被更改
     **/
    var module = __webpack_module_cache__[moduleId] = { 
      exports: {}
    };

    /** 3.开始加载执行模块 */
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    return module.exports; // 返回了一个赋值后的对象
  }

  var __webpack_exports__ = {};

  // 具体执行代码
  !function () {
    const { dateFormate, priceFormate } = __webpack_require__("./src/js/formate.js"); // 执行上面的加载函数，解构拿到数据

    console.log(dateFormate('abc'));
    console.log(priceFormate('abc'));
  }();

```

## webpack ESModule 模块化打包原理
#### ESModule 相比 CommonJS，多做了一层代理，做了代理之后一些语法就能刻意的不被允许
```
// ESModule 相比 CommonJS，多做了一层代理，做了代理之后一些语法就能刻意的不被允许

// 定义了一个对象——模块映射
var __webpack_modules__ = ({
  "./src/js/math.js":
    (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__); // 调用 r 的目的是记录是一个 ESModule：__esModule：true
      
      // 调用 d 的目的是：给 exports 设置代理为 definition
      // exports 对象中本身没有对应的函数，只有调用 get 的时候去取
      __webpack_require__.d(__webpack_exports__, { 
        "sum": function () { return sum; },
        "mul": function () { return mul; }
      });
      const sum = (num1, num2) => {
        return num1 + num2;
      }

      const mul = (num1, num2) => {
        return num1 * num2;
      }
    })
});

// webpack 模块缓存
var __webpack_module_cache__ = {};

// require函数的实现
function __webpack_require__(moduleId) {
  var cachedModule = __webpack_module_cache__[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  var module = __webpack_module_cache__[moduleId] = {
    exports: {}
  };

  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

  return module.exports;
}

!function () {
  // 给 __webpack_require__ 函数对象添加一个属性：d，值是一个函数
  __webpack_require__.d = function (exports, definition) {
    for (var key in definition) {
      if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
}();

!function () {
  // 给 __webpack_require__ 函数对象添加一个属性：o，值是一个函数，判断是否有该属性
  __webpack_require__.o = function (obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
}();

!function () {
  // 给 __webpack_require__ 函数对象添加一个属性：r，值是一个函数
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) { // 判断是否支持 Symbol
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' }); // 增加一个 Symbol.toStringTag 属性，表示是一个模块
    }
    Object.defineProperty(exports, '__esModule', { value: true }); // 在 exports 对象中增加一个 __esModule 属性，值为 true，记录是一个 ESModule
  };
}();

var __webpack_exports__ = {};
!function () {
  var _js_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/js/math.js");

  // 调用代理
  console.log((0, _js_math__WEBPACK_IMPORTED_MODULE_0__.mul)(20, 30))
  console.log((0, _js_math__WEBPACK_IMPORTED_MODULE_0__.sum)(20, 30))
}();
```

## CommonJS 和 ESModule 相互导入
```

var __webpack_modules__ = ({

  "./src/js/formate.js": (function (module) {

    const dateFormate = (date) => {
      return '2020-12-12';
    }

    const priceFormate = (price) => {
      return '100.00';
    }

    module.exports = {
      dateFormate,
      priceFormate
    }

  }),
  "./src/js/math.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      "sum": function () { return sum; },
      "mul": function () { return mul; }
    });
    const sum = (num1, num2) => {
      return num1 + num2;
    }

    const mul = (num1, num2) => {
      return num1 * num2;
    }

  })

});


var __webpack_module_cache__ = {};

function __webpack_require__(moduleId) {
  var cachedModule = __webpack_module_cache__[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  var module = __webpack_module_cache__[moduleId] = {
    exports: {}
  };

  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

  return module.exports;
}

!function () {
  __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ?
      function () { return module['default']; } :
      function () { return module; };
    __webpack_require__.d(getter, { a: getter });
    return getter;
  };
}();

!function () {
  __webpack_require__.d = function (exports, definition) {
    for (var key in definition) {
      if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
}();

!function () {
  __webpack_require__.o = function (obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
}();

!function () {
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };
}();

var __webpack_exports__ = {};

!function () {
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  var _js_formate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/js/formate.js");
  var _js_formate__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_js_formate__WEBPACK_IMPORTED_MODULE_0__);

  const math = __webpack_require__("./src/js/math.js");
  console.log(math.mul(20, 30))
  console.log(math.sum(20, 30))



  console.log(_js_formate__WEBPACK_IMPORTED_MODULE_0___default().dateFormate('abc'))
  console.log(_js_formate__WEBPACK_IMPORTED_MODULE_0___default().priceFormate('abc'))
}();
;
```
### 总结：webpack如何对模块化进行支持？
#### 封装了多个函数，并把一个个模块放到了对象里面进行管理

## 3. source-map
##### source-map是从已转换的代码，映射到原始的源文件
##### 使浏览器可以重构原始源并在调试器中显示重建的原始源
