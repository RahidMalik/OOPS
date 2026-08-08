### Creating Arrays:

let fruits = ["apple", "banana", "orange"];
let numbers = [1, 2, 3, 4, 5];
let mixed = ["Rahid", 25, true, null];
let empty = [];

let animals =['Elefent', 'DHonky', 'Cow'];

animals.map((ani) => {
ani{key}
ani[1] // DHonky Raja
});

animals.filter((ani) => console.log(ani[2]));

```
----------1. Concat-----------
```

// combine two arrays and add value.

const a = [1,2,3,4];
const b = [5,6,7];
consr c = a.concat(b,[8,9]);
console.log(c) // 123456789

const a = ['banana','apple'];
const b = ['kela','amrod'];
const c = a.concat(b,['watermelon']);
console.log(c) // bananna, apple,kela,amrod,watermelon
console.log(a) // org same rahy ga (bannana, apple)

```
----------2. every-----------
```

// it gives true/false value if value are not accurate or correct.

const a = [2,4,6,8,10]
const b = a.every(b => b % 2 === 0) // using reminder method.
console.log(b); // true // 2/2 = 0, 4/2 = 0

const a = [1,2,3] //mix values.
const b = a.every(b => b < 3)// fasle 3/3 = 0, 3 is not small.
console.log(b);

```
----------3. filter-----------
```

// her element pr calta ha jo true hua wo value show ho jati hain.
const words = ['apple', 'watermelon','banana'];
const longwords = words.filter(word => word.length >= 5 );
console.log(longwords); // dono words a jain gay jin ka 5 sa large char ho ga.

const numbers = [10,20,30,40,50];
const age = numbers.filter(num => num >= 20);
console.log('you are ${age} year old')
