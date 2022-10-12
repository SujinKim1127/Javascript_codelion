function foo() {
    console.log('foo');
}

function bar() {
    console.log('bar');
}

// 타이머 함수 setTimeout은 일정 시간이 경과한 이후에 콜백 함수 foo를 호출
// 타이머 함수 setTimeout은 bar 함수 블로킹X
setTimeout(foo, 3 * 1000);
bar();
// bar 호출 -> (3초 경과 후) foo 호출