function a() {
  console.log("1", b);
  var b = "bbb";
  console.log("2", b);
  function b() {}
  console.log("3", b);
}

a();

// 실제 반응 과정
function a() {
  var b; // 수집 대상 1. 변수는 선언부만 끌어올린다
  var b = function b() {}; // 수집 대상 2. 함수 선언은 전체를 끌어올린다

  console.log(b); // (1)
  b = "bbb"; // 변수 할당부는 원래자리에
  console.log(b); // (2)
  console.log(b); // (3)
}
