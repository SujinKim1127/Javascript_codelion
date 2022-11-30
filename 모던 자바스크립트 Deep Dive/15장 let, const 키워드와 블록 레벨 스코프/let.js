let j = 1;  // 전역변수
{
    let j = 2;      // 지역변수
    let bar = 3;    // 지역변수
}
console.log(j);     // 1
// console.log(bar);   // ReferenceError: bar is not defined







var foo = "This is String"
if(typeof foo === "string"){
    const result = true;
}
// else const result = false;
console.log(result)