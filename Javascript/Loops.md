## SECTION 6: LOOPS (Repetition)

### for Loop (Fixed iterations):

for (let i = 0; i < 5; i++) {
console.log(i); // 0, 1, 2, 3, 4
}
// i = 0 (initialize) i < 5 (condition) i++ (increment)

### while Loop (Condition based):

let i = 0;
while (i < 5) {
console.log(i) // 0,1,2,3,4
i++
}
// Phly check krta ha, pher execute krta ha.

### do-while Loop (At least once):

let i = 0;
do {
console.log(i) // 0,1,2,3,4
i++;
} while(i < 5);
//phly execute kro phr, pher check krta ha

### for-of Loop (Arrays ke liye):

let fruits = ['apple', 'banana', 'watermelon'];

for (let fruit of fruits) {
console.log(fruit); // "apple", "banana", "orange"
};

### for-in Loop (Objects ke liye):

let user = {
name:"Rahid",
age: 20
};

for ( let key in user){
console.log(key + ':' + user[key]);
// "name: Rahid"
// "age : 20
};

### break & continue:

for (let i = 0; i < 10; i++) {
if (i === 5) break; // loop stop
if (i === 3) continue; // skip this iteration
console.log(i); // 0, 1, 2, 4
}

### Nested Loops:

for (let i = 1; i <= 3; i++) {
for (let j = 1; j <= 3; j++) {
console.log(`i=${i}, j=${j}`);
}
}
// Output:
// i=1, j=1
// i=1, j=2
// i=1, j=3
// i=2, j=1
// ... and so on
