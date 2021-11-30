import { $ } from './utils/dom.js';
import { BASE_URL } from './utils/api.js';

import { dataInterface as nameInterface } from './types/type';

const render = async () => {
  const data = await fetch(`${BASE_URL}/`)
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.error(err);
    });

  ($('#root') as HTMLDivElement).innerHTML = data
    .map((v: nameInterface, index: number) => {
      return `<li data-list-id="${v.id}">
      <span>${v.name} </span>
      <button type="click" class="update">수정</button>
      <button class="delete">삭제</button>
      </li>
      `;
    })
    .join('');
};

render();

($('#form') as HTMLFormElement).addEventListener('submit', async (e: Event) => {
  e.preventDefault();

  const name: string = ($('#name') as HTMLInputElement).value;
  const temperature: string = ($('#temperature') as HTMLInputElement).value;
  if (name && temperature) {
    const join = await fetch(`${BASE_URL}/join`, {
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

  ($('#name') as HTMLInputElement).value = '';
  render();
});

($('#root') as HTMLButtonElement).addEventListener(
  'click',
  async (e: Event) => {
    e.preventDefault();
    // const target = e.target as HTMLLIElement;
    const target = <HTMLInputElement>e.target;
    const nameId = target.closest('li')!.dataset.listId;
    if (target.classList.contains('update')) {
      target.value = 'ss';
      // const nameId = target.closest('li')!.innerText.split(' ').slice(0, 1);
      const updateName: any = prompt('수정할 이름을 입력해주세요');
      console.log(nameId);
      if (updateName) {
        await fetch(`${BASE_URL}/update`, {
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
      await fetch(`${BASE_URL}/destory`, {
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

    render();
  },
);
