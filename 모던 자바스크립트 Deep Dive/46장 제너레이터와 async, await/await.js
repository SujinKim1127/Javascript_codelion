// const fetch = require('node-fetch');

// const getGithubUserName = async id => {
//     const res = await fetch(`https://api.github.com/users/${id}`);      // (1)
//     const { name } = await res.json();      // (2)
//     console.log(name);  //  Ungmo Lee
// };

// getGithubUserName('ungmo2');

// async function foo() {
//     const a = await new Promise(resolve => setTimeout(() => resolve(1), 3000));
//     const b = await new Promise(resolve => setTimeout(() => resolve(2), 2000));
//     const c = await new Promise(resolve => setTimeout(() => resolve(3), 1000));

//     console.log([a,b,c]);   // [1, 2, 3]
// }

// foo();      // 6초 뒤 console창에 [1, 2, 3] 출력


async function foo() {
    const res = await Promise.all([
        new Promise(resolve => setTimeout(() => resolve(1), 3000)),
        new Promise(resolve => setTimeout(() => resolve(2), 2000)),
        new Promise(resolve => setTimeout(() => resolve(3), 1000))
    ]);

    console.log(res);       // [1, 2, 3]
}

// foo();      // 3초 뒤 console창에 [1, 2, 3] 출력


async function bar(n) {
    const a = await new Promise(resolve => setTimeout(() => resolve(n), 3000));
    // 두 번째 비동기 처리를 수행하려면 첫 번째 비동기 처리 결과가 필요
    const b = await new Promise(resolve => setTimeout(() => resolve(a + 1), 2000));
    // 세 번째 비동기 처리를 수행하려면 두 번째 비동기 처리 결과가 필요
    const c = await new Promise(resolve => setTimeout(() => resolve(b + 1), 1000));

    console.log([a,b,c]);       // [1, 2, 3]
}

bar(1);     // 6초 뒤 console창에 [1, 2, 3] 출력