var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function testable(isTestable) {
    return function (target) {
        target.prototype.isTestable = isTestable;
    };
}
var MyTestableClass = /** @class */ (function () {
    function MyTestableClass() {
        // this.isTestable = false;
    }
    MyTestableClass = __decorate([
        testable(true)
    ], MyTestableClass);
    return MyTestableClass;
}());
console.log(new MyTestableClass().isTestable); // true
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    MyClass = __decorate([
        testable(false)
    ], MyClass);
    return MyClass;
}());
console.log(new MyClass().isTestable); // false
function classDecorator(constructor) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.newProperty = "new property";
            _this.hello = "override";
            return _this;
        }
        return class_1;
    }(constructor));
}
var Greeter = /** @class */ (function () {
    function Greeter(m) {
        this.property = "property";
        this.hello = m;
    }
    Greeter = __decorate([
        classDecorator
    ], Greeter);
    return Greeter;
}());
console.log(new Greeter("world"));
var Greeter2 = /** @class */ (function () {
    function Greeter2(message) {
        this.greeting = message;
    }
    Greeter2.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    __decorate([
        enumerable(false)
    ], Greeter2.prototype, "greet", null);
    return Greeter2;
}());
function enumerable(value) {
    return function (target, propertyKey, descriptor) {
        descriptor.enumerable = value;
    };
}
console.log(new Greeter2('msg'));
/**
 * 访问器装饰器
 */
function configurable(value) {
    return function (target, propertyKey, descriptor) {
        descriptor.configurable = value;
    };
}
var Point = /** @class */ (function () {
    function Point(x, y) {
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Point.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        configurable(false)
    ], Point.prototype, "x", null);
    __decorate([
        configurable(false)
    ], Point.prototype, "y", null);
    return Point;
}());
var point = new Point(1, 2);
console.log(point.x);
/**
 * 属性装饰器
 */
function DefaultValue(value) {
    return function (target, propertyName) {
        target[propertyName] = value;
    };
}
var Hello = /** @class */ (function () {
    function Hello() {
    }
    __decorate([
        DefaultValue('world')
    ], Hello.prototype, "greeting", void 0);
    return Hello;
}());
console.log(new Hello().greeting); // world
/**
 * 参数装饰器
 */
function PathParam(paramName) {
    return function (target, methodName, paramIndex) {
        !target.$Meta && (target.$Meta = {});
        target.$Meta[paramIndex] = paramName;
    };
}
var Param = /** @class */ (function () {
    function Param() {
    }
    Param.prototype.getUser = function (userId) { };
    __decorate([
        __param(0, PathParam('userId'))
    ], Param.prototype, "getUser", null);
    return Param;
}());
console.log(Param.prototype.$Meta);
/**
 * 装饰器加载顺序
 */
function ClassDecorator() {
    return function (target) {
        console.log("I am class decorator");
    };
}
function MethodDecorator() {
    return function (target, propertyKey, descriptor) {
        console.log('I am method decorator');
    };
}
function Param1Decorator() {
    return function (target, propertyKey, paramIndex) {
        console.log('I am parameter1 decorator');
    };
}
function Param2Decorator() {
    return function (target, propertyKey, paramIndex) {
        console.log('I am parameter2 decorator');
    };
}
function PropertyDecorator() {
    return function (target, propertyName) {
        console.log('I am property decorator');
    };
}
function ConstructorParamDecorator() {
    return function (target, propertyKey, paramIndex) {
        console.log('I am construct param decorator');
    };
}
var TestOrder = /** @class */ (function () {
    function TestOrder(param) {
    }
    TestOrder.prototype.greet = function (p1, p2) { };
    __decorate([
        PropertyDecorator()
    ], TestOrder.prototype, "greeting", void 0);
    __decorate([
        MethodDecorator(),
        __param(0, Param1Decorator()), __param(1, Param2Decorator())
    ], TestOrder.prototype, "greet", null);
    TestOrder = __decorate([
        ClassDecorator(),
        __param(0, ConstructorParamDecorator())
    ], TestOrder);
    return TestOrder;
}());
function f() {
    console.log('f(): evaluated');
    return function (target, propertyKey, descriptor) {
        console.log('f(): called');
    };
}
function g() {
    console.log('g(): evaluated');
    return function (target, propertyKey, descriptor) {
        console.log('g(): called');
    };
}
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.method = function () { };
    __decorate([
        f(),
        g()
    ], C.prototype, "method", null);
    return C;
}());
