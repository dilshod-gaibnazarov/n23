"use strict";
// Primitive types
const stringType = 'hello'; // string
const numberType = 12; // number
const booleanType = true; // boolean
const nullType = null; // null
const undefinedType = undefined; // undefined
const symbolType = Symbol('id'); // symbol
const bigIntType = 23424232423423n; // bigint
// Advanced types
const anyType = 'anytype'; // any
const unknownType = 'bye'; // unknown
if (typeof unknownType === 'string') {
    unknownType.toLocaleLowerCase();
}
let voidType; // void
function neverFunc() {
    throw new Error();
}
// Object
const person = {
    name: 'Eshmat',
    age: 12
};
// Array
const arr = [1, 'hello', true];
const numbers = [1, 2, 3, 4, 5, 'bye'];
const strings = ['a', 'b', 'c'];
const arr1 = [{ age: 12 }, { name: 'John' }];
// Tuple
const tupleType = [1, 2, 'bye'];
const tupleRest = ['hello', 1, 2, 3, 4, 5];
const person1 = {
    name: 'Ishmat',
    age: 25
};
const person2 = {
    name: 'Gishmat',
    age: 34
};
const password1 = 12345678;
const password2 = '12345678';
const user = {
    fullName: 'Eshmat Toshmatov',
    email: 'eshmat@gmail.com',
    isAdmin: true
};
const direction = 'up';
// Enum
var Roles;
(function (Roles) {
    Roles[Roles["ADMIN"] = 0] = "ADMIN";
    Roles[Roles["USER"] = 1] = "USER";
})(Roles || (Roles = {}));
;
console.log(Roles.USER);
var Status;
(function (Status) {
    Status["ACTIVE"] = "ACTIVE";
    Status["INACTIVE"] = "INACTIVE";
})(Status || (Status = {}));
;
console.log(Status.ACTIVE);
