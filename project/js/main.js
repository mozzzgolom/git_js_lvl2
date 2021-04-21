'use strict';

const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
    {id: 5},
];

// Если единственным оператором в выражении стрелочной функции является return,
// можно удалить return и окружающие фигурные скобки
const renderProduct = (title = 'default', price = 'null') => `<div class="product-item"><h3>${title}</h3><p>${price}</p><button class="by-btn">Добавить в корзину</button></div>`;

// Если у функции идет один аргумент его можно не заключать в ()
const renderProducts = list => {
    const productListHTML = list.map(item => renderProduct(item.title, item.price));
    // console.log(productListHTML);
    document.querySelector('.products').innerHTML = productListHTML.join(''); //Метод join() объединяет все элементы массива (или массивоподобного объекта) в строку
}

renderProducts(products);
