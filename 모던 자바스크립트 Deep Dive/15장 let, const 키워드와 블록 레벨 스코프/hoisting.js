let age = 30;

function showAge() {
    console.log(age);

    // let age = 20;
}

showAge()

console.dir(add);   // [Function: add]
console.dir(sub);   // undefined

console.log(add(7, 2));     // 9
// console.log(sub(7, 2));     // TypeError: sub is not a function 

// 함수 선언문
function add(x, y) { return x + y }

// 함수 표현식
var sub = function (x, y) { return x - y}


/**** 함수, 변수 우선 순위 ****/
var my = "sujin";
function my() { console.log("my_function") }
console.log(typeof(my))

function your() { console.log("your_func") }
var your = "mori";
console.log(typeof(your))

