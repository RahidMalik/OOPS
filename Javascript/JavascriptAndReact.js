// ES6 FEATURES(Har React Component me use hote hain)
// Arrow Functions
// React me component define karne mein normal function ki jagah arrow function use hota hai.

// Traditional
function MyComponent() {
    return <div>Hello</div>
}

// Arrow function - React me ye zyada use hota hai
const MyComponent = () => {
    return <div>Hello</div>
}

// Short form for single return statement
const MyComponent = () => <div>Hello</div>;

// React me fayda: this ka confusion nahi hota, code chhota rehta hai.

// Destructuring
// Ye React me har jagah use hota hai — props, state, imports sab me.

// Object Destructuring (PROPS ke sath)
const UserProfile = ({ name, age, email }) => {
    // Ab direct name, age use kar sakte ho
    return <div>{name}</div>
}

// Without destructuring
const UserProfile = (props) => {
    return <div>{props.name}</div>
}

// Array Destructuring
const [count, setCount] = useState(0)
const [user, setUser] = useState(null)

// Spread Operator ...
// React me sabse common use case hai — merging objects, arrays copy karne ke liye, props pass karne ke liye.

// 1. Props spread karne ke liye
const buttonProps = { onClick: handleClick, disabled: true }
// <button{ ...buttonProps }> Click me</button >

// 2. State update karte waqt (REACT MEIN BOHT ZAROORI)
const [user, setUser] = useState({ name: 'Ali', age: 25 })

// Spread se naya object banao (old state modify mat karna)
setUser({ ...user, age: 26 })

// 3. Array spread
const numbers = [1, 2, 3, 4]
const newNumbers = [...numbers, 5] // [1,2,3,4,5]

// 4. Component ke children ke liye
// < Card title = "Hello" { ...props } />

// React me kyun zaroori hai: Direct mutation nahi kar sakte React me.Spread operator se new copy ban jata hai.

// Template Literals(1 / 9)
// Dynamic class names banane ke liye
const className = `btn btn-${type} ${active ? 'active' : ''}`

// Dynamic styles
const color = 'red'
const style = { color: `${color}` }

return <div className={className}>Hello</div>