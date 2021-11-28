"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL = 'http://localhost:8000';
const $ = (selecter) => document.querySelector(selecter);
$('#form').addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const name = $('#name').value;
    const temperature = $('#temperature').value;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('temperature', temperature);
    if (name && temperature) {
        console.log(name);
        console.log(temperature);
        yield fetch(`${BASE_URL}/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'multipart/form-data',
            },
            body: JSON.stringify({ name, temperature }),
            // body: { name, temperature },
        })
            .then((res) => {
            console.log(res);
            return res.json();
        })
            .catch((err) => {
            console.error(err);
        });
    }
}));
const data = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`${BASE_URL}/`)
        .then((res) => {
        console.log(res);
        return res.json();
    })
        .catch((err) => {
        console.error(err);
    });
    console.log(data, 'data');
    $('#root').innerHTML = data.map((v) => {
        return `<div>${v.name}</div>`;
    });
});
data();
let result = ['축구', '농구', '족구', '배구'];
$('#root').innerHTML = result
    .map((v) => {
    return `<div>${v}</div>`;
})
    .join('');
