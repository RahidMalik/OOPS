### if-else:

let age = 20;

if(age<=18){
return 'User is adult'
}else if(age >20){
return "mature"
}else{
return "under age"
};

### Switch-case

let day = monday;

switch(day){
case "Monday": console.log("Week start");
break;
case "Friday" : console.log("mid in the week");
break:
case "Saturday"
case "sunday": console.log("WeekEnd")'
break;
default: console.log('normal day');
};
// Output: "Week start"

### Ternary Operator:

let marks = 85;
const Result = marks >= 33 ? 'Pass' : 'Fail';
console.log(result); // "Pass"

let score = 70
const result = score >= 90 ? "A-Grade": score >= 70 ? "B-grade": score >= 50 ? "C-Grade" : "Fail";
console.log(result) // B-Grade

### Truthy vs Falsy Values:

// Falsy values (false count hote hain):
false, 0, -0, 0n, "", null, undefined, NaN
// Truthy values (true count hote hain):
true, 1, -1, "hello", [], {}, function(){}, "0", "false", " "
// Practical use:
let name = "";
if (name) {
console.log("Hello " + name);
} else {
console.log("Name is empty"); // This will run
}
