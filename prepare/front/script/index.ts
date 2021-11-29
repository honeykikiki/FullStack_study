interface nameInterface {
  name: string;
  temperature: string;
  createdAt: string;
  id: number;
}

const BASE_URL = 'http://localhost:8000';

const $ = (selecter: string): HTMLElement | null =>
  document.querySelector(selecter);

($('#form') as HTMLFormElement).addEventListener('submit', async (e: Event) => {
  e.preventDefault();

  const name: string = ($('#name') as HTMLInputElement).value;
  const temperature: string = ($('#temperature') as HTMLInputElement).value;

  const formData: FormData = new FormData();
  formData.append('name', name);
  formData.append('temperature', temperature);

  if (name && temperature) {
    console.log(name);
    console.log(temperature);
    await fetch(`${BASE_URL}/join`, {
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

    data();
  }
});

const data = async () => {
  const data = await fetch(`${BASE_URL}/`)
    .then((res) => {
      // console.log(res);
      return res.json();
    })
    .catch((err) => {
      console.error(err);
    });

  console.log(data, 'data');

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

data();

($('#root') as HTMLButtonElement).addEventListener(
  'click',
  async (e: Event) => {
    e.preventDefault();
    // const target = e.target as HTMLLIElement;
    const target = <HTMLInputElement>e.target;
    if (target.classList.contains('update')) {
      target.value = 'ss';
      const nameId = target.closest('li')!.dataset.listId;
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

    data();
  },
);
