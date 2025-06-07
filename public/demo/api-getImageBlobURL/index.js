import { iDraw } from 'idraw';
import data from './data';

const app = document.querySelector('#app');
const options = {
  width: 320,
  height: 320,
  devicePixelRatio: 2
};
const idraw = new iDraw(app, options);
idraw.setData(data);
idraw.setMode('select');
idraw.centerContent();

const btn = document.querySelector('#btn-getImageBlobURL');
const preview = document.querySelector('#box-preview');

btn.addEventListener('click', () => {
  idraw
    .getImageBlobURL({ devicePixelRatio: 1 })
    .then((res) => {
      const { blobURL, width, height, devicePixelRatio } = res;
      preview.innerHTML = `
      <div>${JSON.stringify(res, null, 2)}</div>
      <img width="320" src="${blobURL}" />
      `;
    })
    .catch((err) => {
      console.error(err);
      window.alert(JSON.stringify(err));
    });
});
