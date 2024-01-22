console.log("sum", sum(1, 2));
console.log("multi", multiply(3, 4));

// 함수 선언문 sum
function sum(a, b) {
  return a + b;
}

// 함수 표현식 multiply
var multiply = function (a, b) {
  return a * b;
};

// -------- 호이스팅 완료 상태 ---------
var sum = function sum(a, b) {
  // 함수 선언문은 전체를 호이스팅
  return a + b;
};

var multiply; // 변수는 선언부만 끌어올리기

console.log("sum", sum(1, 2));
console.log("multi", multiply(3, 4));

multiply = function (a, b) {
  // 변수의 할당부는 원래 자리에 남겨두기
  return a * b;
};
