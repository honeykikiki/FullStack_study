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
        return res;
      })
      .catch((err) => {
        console.error(err);
      });
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
};

data();
