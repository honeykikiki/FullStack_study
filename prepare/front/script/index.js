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
const data = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`${BASE_URL}/`)
        .then((res) => {
        return res.json();
    })
        .catch((err) => {
        console.error(err);
    });
    $('#root').innerHTML = data
        .map((v, index) => {
        return `<li data-list-id="${v.id}">
      <span>${v.name} </span>
      <button type="click" class="update">수정</button>
      <button class="delete">삭제</button>
      </li>
      `;
    })
        .join('');
});
data();
$('#form').addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const name = $('#name').value;
    const temperature = $('#temperature').value;
    if (name && temperature) {
        const join = yield fetch(`${BASE_URL}/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'multipart/form-data',
            },
            body: JSON.stringify({ name, temperature }),
            // body: formData,
        })
            .then((res) => {
            return res.json();
        })
            .catch((err) => {
            console.error(err);
        });
        console.log(join, 'join');
    }
    $('#name').value = '';
    data();
}));
$('#root').addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    // const target = e.target as HTMLLIElement;
    const target = e.target;
    const nameId = target.closest('li').dataset.listId;
    if (target.classList.contains('update')) {
        target.value = 'ss';
        // const nameId = target.closest('li')!.innerText.split(' ').slice(0, 1);
        const updateName = prompt('수정할 이름을 입력해주세요');
        console.log(nameId);
        if (updateName) {
            yield fetch(`${BASE_URL}/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ updateName, nameId }),
            })
                .then((res) => {
                console.log(res.json());
            })
                .catch((err) => {
                console.error(err);
            });
        }
    }
    if (target.classList.contains('delete')) {
        yield fetch(`${BASE_URL}/destory`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nameId }),
        })
            .then((res) => {
            return res.json();
        })
            .catch((err) => {
            console.error(err);
        });
    }
    data();
}));
