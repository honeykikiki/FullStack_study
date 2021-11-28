interface nameInterface {
  name: string;
  temperature: string;
  createdAt: string;
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
      console.log(res);
      return res.json();
    })
    .catch((err) => {
      console.error(err);
    });

  console.log(data, 'data');

  ($('#root') as HTMLDivElement).innerHTML = data
    .map((v: nameInterface, index: number) => {
      return `<li data-list-id="${index}">
      ${v.name} 
      <button type="clic" class="update">수정</button>
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
    const target = e.target as HTMLLIElement;
    if (target.classList.contains('update')) {
      console.log(target.closest('li')!.dataset.listId);
      const listId = target.closest('li')!.dataset.listId;
      await fetch(`${BASE_URL}/update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        // body: {},
      });
    }
  },
);
