const fetch = require('node-fetch');

// 제너레이터 실행
const async = generatorFunc => {
    const generator = generatorFunc();          // (2)

    const onResolved = arg => {
        const result = generator.next(arg);     // (5)

        return result.done
            ? result.value
            : result.value.then(res => onResolved(res)); // (7)
    };
    return onResolved;          // (3)
};

(async(function* fetchTodo() {      // (1)
    const url = 'https://jsonplaceholder.typicode.com/todos/1';

    const response = yield fetch(url);      // (6)
    const todo = yield response.json();     // (8)
    console.log(todo);
    // {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
})());