// Primitive types
const stringType: string = 'hello';           // string
const numberType: number = 12;                // number
const booleanType: boolean = true;            // boolean
const nullType: null = null;                  // null
const undefinedType: undefined = undefined;   // undefined
const symbolType: symbol = Symbol('id');      // symbol
const bigIntType: bigint = 23424232423423n;   // bigint



// Advanced types
const anyType: any = 'anytype';           // any

const unknownType: unknown = 'bye';       // unknown
if (typeof unknownType === 'string') {
    unknownType.toLocaleLowerCase();
}

let voidType: void;                     // void

function neverFunc(): never {           // never
    throw new Error();
}


// Object
const person: { name: string, age: number } = {
    name: 'Eshmat',
    age: 12
};


// Array
const arr: any[] = [1, 'hello', true];
const numbers: (number | string)[] = [1, 2, 3, 4, 5, 'bye'];
const strings: string[] = ['a', 'b', 'c'];
const arr1: object[] = [{ age: 12 }, { name: 'John' }];



// Tuple
const tupleType: [number, number, string, object?] = [1, 2, 'bye'];
const tupleRest: [string, ...number[]] = ['hello', 1, 2, 3, 4, 5];



// Alias
type PersonType = {
    name: string;
    age: number;
};

const person1: PersonType = {
    name: 'Ishmat',
    age: 25
};

const person2: PersonType = {
    name: 'Gishmat',
    age: 34
};



// Union
type PasswordType = string | number;

const password1: PasswordType = 12345678;
const password2: PasswordType = '12345678';



// Intersection or (type with and)
type ClientType = {
    fullName: string;
    email: string
}

type AdminType = {
    isAdmin: boolean;
    age?: number;
}

type UserType = ClientType & AdminType;

const user: UserType = {
    fullName: 'Eshmat Toshmatov',
    email: 'eshmat@gmail.com',
    isAdmin: true
};

type Age = string & number;     // never



// Literal type
type Direction = 'up' | 'down' | 'right' | 'left';
const direction: Direction = 'up';



// Enum
enum Roles {
    ADMIN,
    USER
};
const role = Roles.ADMIN;

enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
};
const active = Status.ACTIVE;



// Function
function sayHi(name: string): void {
    console.log('hello', name);
}
sayHi('Eshmat');


const pow = (num1: number, num2: number): object => {
    return {
        pow: num1 ** num2
    }
}
console.log(pow(2, 3));


function mySelf(name: string) {
    return function person(age: number): object {
        return {
            name,
            age
        }
    }
}
const userFunc = mySelf('Eshmat');
console.log(userFunc(24));