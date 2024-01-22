// 함수를 정의하는 3가지 방식
function a() {
  console.log("a 함수");
} // 함수 선언문. 함수명 a가 곧 변수명
a(); // 실행 OK

var b = function () {
  // (익명) 함수 표현식. 변수명 b가 곧 함수명
  console.log("var b = function () {}");
};
b(); // 실행 OK

var c = function d() {
  // 기명 함수 표현식. 변수명은 c, 함수명은 d
  console.log("var c = function d() {}");
};
c(); // 실행 OK;
d(); // 에러 발생
