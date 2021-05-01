const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ не использовать fetch а Promise
// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {
//             if (xhr.status !== 200) {
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };


// Promise
// let getRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open("GET", url, true);
//         xhr.onreadystatechange = () => {
//             if(xhr.readyState === 4){
//                 if(xhr.status !== 200){
//                     reject('Error!');
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         };
//         xhr.send();
//     })
// };

// –--------------------------------

class ProductList {
    constructor(container = '.products') {
        this.container = container
        this._goods = [];
        this._allProducts = [];

        // this._fetchGoods();
        this._render();

        this._getProducts()
            .then((data) => {
                this._goods = data;
                this._render();
            })
    }

    sum() {
        return this._goods.reduce((sum, { price }) => sum + price, 0);
    }

    // _fetchGoods() {
    //     // this._goods = [
    //     //         {id: 1, title: 'Notebook', price: 20000},
    //     //         {id: 2, title: 'Mouse', price: 1500},
    //     //         {id: 3, title: 'Keyboard', price: 5000},
    //     //         {id: 4, title: 'Gamepad', price: 4500},
    //     //     ]
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         // console.log(data);
    //         this._goods = JSON.parse(data);
    //         console.log(this._goods);
    //         this._render();
    //     });
    // }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then((Response) => Response.json())
            .catch((error) => {
                console.log(error);
            });
    }

    _render() {
        const block = document.querySelector(this.container)

        for (const good of this._goods) {
            const productObject = new ProductItem(good);
            // console.log(productObject) 
            this._allProducts.push(productObject);
            block.insertAdjacentHTML('afterbegin', productObject.render());
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }

    render(title = 'default', price = 'null') {
        return `<div class="product-item data-id "${this.id}"">
            <img src="${this.img}" alt="Some img">
            <h3>${this.title}</h3>
            <p>${this.price}</p>
            <button class="by-btn">Добавить в корзину</button></div>`
    }
}

class Cart {

}

class CartItem {


}


new ProductList();


// 'use strict';

// const products = [
//     {id: 1, title: 'Notebook', price: 20000},
//     {id: 2, title: 'Mouse', price: 1500},
//     {id: 3, title: 'Keyboard', price: 5000},
//     {id: 4, title: 'Gamepad', price: 4500},
//     {id: 5},
// ];

// // Если единственным оператором в выражении стрелочной функции является return,
// // можно удалить return и окружающие фигурные скобки
// const renderProduct = (title = 'default', price = 'null') => `<div class="product-item"><h3>${title}</h3><p>${price}</p><button class="by-btn">Добавить в корзину</button></div>`;

// // Если у функции идет один аргумент его можно не заключать в ()
// const renderProducts = list => {
//     const productListHTML = list.map(item => renderProduct(item.title, item.price));
//     // console.log(productListHTML);
//     document.querySelector('.products').innerHTML = productListHTML.join(''); //Метод join() объединяет все элементы массива (или массивоподобного объекта) в строку
// }

// renderProducts(products);
