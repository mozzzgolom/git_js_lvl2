'use strict';
// var name = 'Bob';
// var age = 20;
//
// name = 'John';
// console.log(name);

// const name = 'Bob';
// let variable = 1234;
//
// // name = 124;
// variable = 'qwerty';
// console.log(variable)

// {
//     let a = 1;
//     var b = 2;
//     // console.log(a);
//     // console.log(b);
// }

// console.log(a);
// console.log(b);

// ES5
// function passTest(result) {
//   if (result) {
//     var firstName = 'Bob';
//     var yearOfBirth = 1990;
//   }
//   console.log(firstName + ' рожденный в ' + yearOfBirth + ' сдал тест');
// }
// passTest(false);

// ES6
// function passTest(result) {
//     let firstName;
//     let yearOfBirth;
//   if (result) {
//     firstName = 'Bob';
//     yearOfBirth = 1990;
//   }
//   console.log(firstName + ' рожденный в ' + yearOfBirth + ' сдал тест');
// }
// passTest(true);

// ES5
// var i = 23;
//
// for (var i = 0; i < 5; i++) {
//     console.log(i);
// }
//
// console.log(i);
// ES5
// let i = 23;
//
// for (let i = 0; i < 5; i++) {
//     console.log(i);
// }
//
// console.log(i);

// function foo() {
//     var b = 5;
//     let c = 10;
//     d = 20;
// }
//
// foo();

// console.log(b) // ?
// console.log(c) // ?
// console.log(d) // ?

// ES5
// var firstName = 'John';
// var lastName = 'Smith';
// var yearOfBirth = 1990;
//
// function calcAge(year) {
//     return 2021 - year;
// }
//
// console.log(firstName + ' ' + lastName + ' рожден в ' + yearOfBirth + '. ' + 'Ему сейчас ' + calcAge(yearOfBirth));

// ES6
// const firstName = 'John';
// const lastName = 'Smith';
// const yearOfBirth = 1990;
//
// function calcAge(year) {
//     return 2021 - year;
// }
// console.log(`${firstName} ${lastName} рожден в ${yearOfBirth}. Ему сейчас ${calcAge(yearOfBirth)}`);

// const str = `${firstName} ${lastName}`;
// console.log(str);
// console.log(str.startsWith('J'));
// console.log(str.endsWith('th'));
// console.log(str.includes('n S'));
// console.log(`${str} `.repeat(5));

// ES6 нет this и нет arguments
// let calcAge = () => {
//     return 6;
// };
// let calcAge = (x) => {
//     return 6 + x;
// };
// let calcAge = x => 6 + x;

// let calcAge = (x, y = 0) => {
//     // console.log(arguments);
//     return 6 + x - y;
// };
//
// console.log(calcAge(12, 6))

// ES5

// var box = {
//     color: 'green',
//     position: 1,
//     clickMe: function () {
//         var btn = document.getElementById('green');
//         console.log(this);
//         var _this = this;
//         // btn.addEventListener('click', function () {
//         //     // console.log(this);
//         //     // console.log('This is a box number ' + this.position + ' and color ' + this.color);
//         //     // console.log('This is a box number ' + box.position + ' and color ' + box.color); // Bad
//         //     console.log('This is a box number ' + this.position + ' and color ' + this.color);
//         // }.bind(this));
//
//         btn.addEventListener('click', function () {
//             // console.log(this);
//             // console.log('This is a box number ' + this.position + ' and color ' + this.color);
//             // console.log('This is a box number ' + box.position + ' and color ' + box.color); // Bad
//             console.log('This is a box number ' + _this.position + ' and color ' + _this.color);
//         });
//     }
// };
//
// box.clickMe();

// ES6
// console.log(this);
// const box = {
//     color: 'green',
//     position: 1,
//     clickMe() {
//         // console.log(this);
//         document.querySelector('#green').addEventListener('click', () => {
//             let str = `This is box number ${this.position} and color ${this.color}`;
//             console.log(str);
//         });
//     }
// };
//
// box.clickMe();

// ES5
// var arr = ['John', 25];
// var name = arr[0];
// var age = arr[1];
//
// console.log(name, age);
// ES5
// let arr = ['John', 25, true];
// // let [name, age] = arr;
// let [name,, isAdmin] = arr;
//
// // console.log(name, age);
// console.log(name, isAdmin);

// let obj = {
//     firstName: 'John',
//     lastName: 'Doe',
//     colors: ['white', 'black'],
// };

// let {firstName: fn, lastName: ln, colors: [w, b]} = obj;
//
// // console.log(firstName, lastName, colors);
// console.log(fn, ln, w, b);

// function sayHelloToUser(user) {
//     console.log(`Hello my friend ${user.firstName}`)
// }
// function sayHelloToUser({firstName}) {
//     console.log(arguments);
//     console.log(`Hello my friend ${firstName}`)
// }
//
// sayHelloToUser(obj);
