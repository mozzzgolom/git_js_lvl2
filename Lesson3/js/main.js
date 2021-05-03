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

class List {
    constructor(url, container, list = listContext){
      this.container = container;
      this.list = list; // словарь для классов строка 213
      this.url = url;
      this.goods = [];
      this.allProducts = [];
      this._init();
    }
  
    /**
     * получение данных с сервера
     * @param url
     * @returns {Promise<any | never>}
     */
    getJson(url){
      return fetch(url ? url : `${API + this.url}`)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    }
  
    /**
     * обработка полученных данных
     * @param data
     */
    handleData(data){
      this.goods = data;
      this.render();
    }
  
    /**
     * подсчет стоимости всех товаров
     * @returns {*|number}
     */
    calcSum(){
      return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }

    render(){
      const block = document.querySelector(this.container);
        for (let product of this.goods){
            console.log(this.constructor.name);
            const productObj = new this.list[this.constructor.name](product);
        
            // альтернативаня реализация без словаря
            // let productObj = null;
            // if (this.constructor.name === 'ProductsList') productObj = new ProductItem(product);
            // if (this.constructor.name === 'Cart') productObj = new CartItem(product);
            if (!productObj) return;
        
            console.log(productObj);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
}

class Item{
    constructor(el, img = 'https://via.placeholder.com/200x150'){
      this.product_name = el.product_name;
      this.price = el.price;
      this.id_product = el.id_product;
      this.img = img;
    }
    render(){
      return ``;
    }
}

class ProductsList extends List{
    constructor(cart, container = '.products', url = "/catalogData.json"){
        super(url, container);
        this.cart = cart;
        this.getJson()
        .then(data => this.handleData(data));
    }
      
    
    _init(){
        document.querySelector(this.container).addEventListener('click', e => {
          if(e.target.classList.contains('buy-btn')){
            this.cart.addProduct(e.target);
          }
        });
    }
}

class ProductItem extends Item{
    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price} ₽</p>
                        <button class="buy-btn"
                          data-id="${this.id_product}"
                          data-name="${this.product_name}"
                          data-price="${this.price}">Купить</button>
                    </div>
                </div>`;
    }
}

class Cart extends List{
    constructor(container = ".cart-block", url = "/getBasket.json"){
        super(url, container);
        this.getJson()
          .then(data => {
            this.handleData(data.contents);
          });
    }
    
      /**
       * добавление товара
       * @param element
       */
    addProduct(element){
        this.getJson(`${API}/addToBasket.json`)
          .then(data => {
            if(data.result === 1){
              let productId = +element.dataset['id'];
              let find = this.allProducts.find(product => product.id_product === productId);
              if(find){
                find.quantity++;
                this._updateCart(find);
              } else {
                let product = {
                  id_product: productId,
                  price: +element.dataset['price'],
                  product_name: element.dataset['name'],
                  quantity: 1
                };
                // goods - это своего рода "опорный" массив, отражающий список товаров, которые нужно отрендерить.
                // При добавлении нового товара, нас интересует только он один.
                this.goods = [product];
                // далее вызывая метод render, мы добавим в allProducts только его, тем самым избегая лишнего перерендера.
                this.render();
              }
            } else {
              alert('Error');
            }
        })
    }
    
      /**
       * удаление товара
       * @param element
       */
    removeProduct(element){
        this.getJson(`${API}/deleteFromBasket.json`)
          .then(data => {
            if(data.result === 1){
              let productId = +element.dataset['id'];
              let find = this.allProducts.find(product => product.id_product === productId);
              if(find.quantity > 1){ // если товара > 1, то уменьшаем количество на 1
                find.quantity--;
                this._updateCart(find);
              } else { // удаляем
                this.allProducts.splice(this.allProducts.indexOf(find), 1);
                document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
              }
            } else {
              alert('Error');
            }
        })
    }
    
      /**
       * обновляем данные корзины
       * @param product
       * @private
       */
    _updateCart(product){
        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
        block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
    }
    _init(){
        document.querySelector('.btn-cart').addEventListener('click', () => {
          document.querySelector(this.container).classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', e => {
          if(e.target.classList.contains('del-btn')){
            this.removeProduct(e.target);
          }
        })
    }
}

class CartItem extends Item{
    constructor(el, img = 'https://via.placeholder.com/50x100'){
        super(el, img);
        this.quantity = el.quantity;
      }
    render(){
        return `<div class="cart-item" data-id="${this.id_product}">
                    <div class="product-bio">
                    <img src="${this.img}" alt="Some image">
                    <div class="product-desc">
                    <p class="product-title">${this.product_name}</p>
                    <p class="product-quantity">Количество: ${this.quantity}</p>
                <p class="product-single-price">${this.price} за ед.</p>
                </div>
                </div>
                <div class="right-block">
                    <p class="product-price">${this.quantity * this.price} ₽</p>
                    <button class="del-btn" data-id="${this.id_product}">&times;</button>
                </div>
                </div>`
    }

}

const listContext = {
    ProductsList: ProductItem,
    Cart: CartItem
};

new ProductsList(new Cart());


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



let str = 'One: 'Hi Mary.' Two: 'Oh, hi.''