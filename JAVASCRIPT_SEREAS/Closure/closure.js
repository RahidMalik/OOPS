
//lexical scoping

// function init() {
//     let name = "Rahid"
//     function innerFUnction() {
//         console.log(name);
//     }
//     innerFUnction();
// };
// init();

// function outer() {
//     let name = "Mozila firefox"
//     console.log('====================================');
//     console.log(name = String("Rahid"));
//     console.log('===================================='); (name);
// }
// outer()


function Outer() {
    let name = "Chrome"
    // console.log(Rahid); ReferenceError: Rahid is not defined. we can't get the value from inner function but inner can.

    const Inner = () => {
        let Rahid = "Malik"
        function innner() {
            console.log(Rahid);
        }
        console.log('====================================');
        console.log(`Inner Function ${name}`);
        console.log('====================================');
        innner()
    }
    Inner()
}
Outer();

// Closure

function Closure() {

}