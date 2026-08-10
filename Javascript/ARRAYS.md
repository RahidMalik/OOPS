### Creating Arrays:

// Creating Arrays:-
// There are two way to create arrays.

//1. using Array constructor:
let num = new Array(1,2,3,4);

//2. Using square brackets and sepreting with comas:
let num = [1,2,3,4,5,6];

// Accessing Array Elements
Once you have created an array, you can access its elements using the array index. In JavaScript, array indices start at 0, so the first element of an array is at index 0, the second element is at index 1, and so on.
// To access an element of an array, you use square brackets and the index of the element you want to access, like this:

let num = [1,2,3,4]
console.log(num[2]); //output [3]

// Modifying Array Elements
You can modify the elements of an array by assigning new values to the array indices. For example, to change the value of the first element of the numbers array from 1 to 10, you can use the following code:

let num = [1,2,3,4,5,6];
num[2] = 30;
console.log(num) // output [1,2,30,4,5,6]

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

// Create a new array with only the elements that satisfy a certain condition. It takes a callback function as an argument, which is called for each element of the array, and returns true if the element should be included in the new array, or false if it should be excluded.

// her element pr calta ha jo true hua wo value show ho jati hain.

const words = ['apple', 'watermelon','banana'];
const longwords = words.filter(word => word.length >= 5 );
console.log(longwords); // dono words a jain gay jin ka 5 sa large char ho ga.

const numbers = [10,20,30,40,50];
const age = numbers.filter(num => num >= 20);
console.log('you are ${age} year old')

var num = [1,2,3,4,5];
var evenNumber = num.filter(function(num){
num % 2 ===0
});
console.log(num); // output [2,4]

```
----------4. find-----------
```

const users = [
{ id: 1, name: 'Rahid', age: 22 },
{ id: 2, name: 'Sara', age: 19 },
{ id: 3, name: 'Ali', age: 25 }
];

const finduserbyAge = users.find(u => u.age >= 20);
console.log(finduserbyAge); // id: 1, name: 'Rahid', age: 22

const scores = [10, 35, 20];
const over30 = scores.find(s => s > 30);
console.log(over30); // 35
console.log(scores.find(s => s > 100)); // undefined

```
----------5. forEach-----------
```

const num = [1,2,3];
const sum = num.foreach({sum += num});
console.log(sum); // 6

['a,b,c'].foreach(ch,idx)=> console.log(`${i}: ${chr}`)
// 0: a
// 1: b
// 2: c

```
----------6. map-----------
```

const nums = [1, 2, 3];
const doubled = nums.map(n => n \* 2);
console.log(doubled); // [2, 4, 6]
console.log(nums); // [1, 2, 3] (same)

const names = ['rahid', 'sara', 'ali'];
const capitalized = names.map(name => name[0].toUpperCase() + name.slice(1));
console.log(capitalized); // ['Rahid','Sara','Ali']

```
----------7. pop-----------
```

// remove last element of an array. It returns the removed element.

let number = [10,20,30,40];
number.pop();
console.log(number) // 10,20,30 // 40 gyab

```
----------8. push-----------
```

//push is used to add one more element at the end of array. it return the length of the array.

let num =[1,2,3];
num.push(4,5);
console.log(num) // [1,2,3,4,5]

```
----------9. shift-----------
```

//Remove the first element of an array. It returns the removed element.

let num = [1,2,3,4,5];
num.shift();
console.log(num); // output [2,3,4,5];

```
----------10. unshift-----------
```

// it add one more element at the beginning of the array. it return the new length of the array.

let num = [2,3,4]
num.unshift(0,1);
console.log(num); // output [0,1,2,3,4];

```
----------11. sort()-----------
```

// sort the elements of the array in ascending or descending order. it return the sorted value.

let num = [4,5,7,6,1,2]
num.sort();
console.log(num) // [1,2,3,4,5,6,7]

// you can also provide the custom sort function to the sort method. which allow you to control the element in way they are sorted. for example. sort the array in descending order use the code in following order.

let num = [1,2,3,4,5,6];
num.sort(function(a,b) {
b-a
});
console.log(num); //[6,5,4,3,2,1];

// 1. How do you loop through the elements in an array?
// The most basic way to loop through the elements in a JavaScript array is to use a for loop.
let array = [1,2,3,4,5];

for(let i = 0, i < array.length, i++){
let element = array[i];
console.log(element);
};

//2. How do you check if an array contains a certain value?
// The Array.prototype.includes() method returns a boolean value indicating whether the array contains the specified value
let num = [1,2,3,4,5,6];

for(num.include(3)){
console.log('yes num 3 is at the array of num, it contain the value num 3')
};

//3. How do you create a copy of an array?

//Array.prototype.slice() returns a shallow copy of a portion of an array. If no arguments are provided, it returns a copy of the entire array.

let array = [1,2,3,4,5];
const myCopy = array,slice();
console.log(myCopy) // [1,2,3,4,5];

// 4. How do you join the elements in an array into a string?
// Array.prototype.join() returns a string consisting of the array elements joined by a specified separator string. If no separator string is provided, the elements are joined by a comma (,) by default.

let Array = [1,2,3,4,5];
let myString = Array.join();
console.log(myString); // output '1,2,3,4,5'

//5. How do you reverse the order of the elements in an array?
// Array.prototype.reverse() reverses the order of the elements in the array in place and returns the array. Here's an example:

let myArray = [1, 2, 3, 4, 5];

myArray.reverse();

console.log(myArray); // Output: [5, 4, 3, 2, 1]
