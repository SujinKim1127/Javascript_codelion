// sleep 함수는 일정 시간(delay)이 경과한 이후에 콜백 함수(func)를 호출
function sleep(func, delay) {
    // Date.now() 는 현재 시간을 숫자(ms)로 반환
    const delayUntil = Date.now() + delay;

    // 현재 시간(Date.now())에 delay를 더한 delayUntil이 현재 시간보다 작으면 계속 반복
    while (Date.now() < delayUntil);
    // 일정 시간(delay)이 경과한 이후에 콜백함수(func)를 호출
    func();
}

function foo() {
    console.log('foo');
}

function bar() {
    console.log('bar');
}

// sleep 함수는 3초 이상 실행됨
sleep(foo, 3 * 1000);

// bar 함수는 sleep 함수의 실행이 종료된 이후에 호출되므로 3초 이상 블로킹
bar();
// (3초 경과 후) foo 호출 -> bar 호출