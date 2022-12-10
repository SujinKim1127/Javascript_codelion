// 전역 변수로 선언
var x = 5;
var y = 10;

// 전역 함수로 func() 선언
function func() {
    console.log("전역변수 x: ", x);         // 5
    console.log("전역변수 y: ", y);         // 10
    return x - y;       // 전역변수 x y 에 접금
}
console.log(func());    // -5

// 전역 함수로 parfunc() 선언
function parfunc() {
    console.log("x: ", x);         // undefined
    console.log("y: ", y);         // undefined
    var x = 12;
    var y = 17;
    function add() {
        console.log("지역변수 x: ", x);     // 12
        console.log("지역변수 y: ", y)      // 17
        return x + y;
    }
    console.log("add:", add())          // 29
}
parfunc()
console.log(x);     // 5
console.log(y)      // 10



var foo = "This is String"
if(typeof foo === "string"){
    var result = true;
}
else var result = false;
console.log(result)