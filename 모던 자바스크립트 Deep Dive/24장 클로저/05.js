const x = 1;

// 1
function outer() {
  const x = 10;
  const inner = function () {
    console.log(x);
  }; // 2
  return inner;
}

// outer 함수 호출시 중첩 함수 inner 반환
// outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 pop되어 제거됨
const innerFunc = outer(); // 3
innerFunc(); // 4: 10
