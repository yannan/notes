function testable(isTestable: boolean) {
    return function(target: Function) {
      target.prototype.isTestable = isTestable;
    }
  }
  
  @testable(true)
  class MyTestableClass {
    isTestable: boolean;
    constructor() {
        // this.isTestable = false;
    }
  }
  console.log(new MyTestableClass().isTestable) // true
  
  @testable(false)
  class MyClass {
      isTestable: boolean;
  }
  console.log(new MyClass().isTestable) // false

function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

@classDecorator
class Greeter {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
}

console.log(new Greeter("world"));



class Greeter2 {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    greet() {
        return "Hello, " + this.greeting;
    }
}

function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}

console.log(new Greeter2('msg'));

/**
 * 访问器装饰器
 */
function configurable(value: boolean) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value;
    }
}
class Point {
    private _x: number;
    private _y: number;
    constructor(x:number, y: number) {
        this._x = x;
        this._y = y;
    }

    @configurable(false)
    get x() {
        return this._x
    }

    @configurable(false)
    get y() {
        return this._y
    }
}

var point = new Point(1,2);
console.log(point.x);

/**
 * 属性装饰器
 */
function DefaultValue(value: string) {
    return function(target: any, propertyName: string) {
        target[propertyName] = value;
    }
}

class Hello {
    @DefaultValue('world')
    greeting: string;
}

console.log(new Hello().greeting);  // world

/**
 * 参数装饰器
 */
function PathParam(paramName: string) {
    return function(target: any, methodName: string, paramIndex: number) {
        !target.$Meta && (target.$Meta = {});
        target.$Meta[paramIndex] = paramName;
    }
}

class Param {
    constructor() {}
    getUser(@PathParam('userId') userId: string) {}
}

console.log((<any>Param).prototype.$Meta);

/**
 * 装饰器加载顺序
 */
function ClassDecorator() {
    return function(target: any) {
        console.log("I am class decorator");
    }
}

function MethodDecorator() {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('I am method decorator');
    }
}

function Param1Decorator() {
    return function(target: any, propertyKey: string, paramIndex: number) {
        console.log('I am parameter1 decorator');
    }
}

function Param2Decorator() {
    return function(target: any, propertyKey: string, paramIndex: number) {
        console.log('I am parameter2 decorator');
    }
}

function PropertyDecorator() {
    return function(target: any, propertyName: string) {
        console.log('I am property decorator');
    }
}

function ConstructorParamDecorator() {
    return function(target: any, propertyKey: string, paramIndex: number) {
        console.log('I am construct param decorator');
    }
}

@ClassDecorator()
class TestOrder {
    constructor(@ConstructorParamDecorator() param: string) {}

    @PropertyDecorator()
    greeting: string;

    @MethodDecorator()
    greet(@Param1Decorator() p1: string, @Param2Decorator() p2: string) {}
}

function f() {
    console.log('f(): evaluated');
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('f(): called');
    }
}

function g() {
    console.log('g(): evaluated');
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('g(): called');
    }
}

class C {
    @f()
    @g()
    method() {}
}