import { iDraw, eventKeys } from 'idraw';
import data from './data';

const app = document.querySelector('#app');
const options = {
  width: 320,
  height: 320,
  devicePixelRatio: 2
};
const idraw = new iDraw(app, options);
idraw.setData(data);

const elem1 = idraw.getData().elements[1];

const listenChange = (e) => {
  const preview = document.querySelector('#preview');
  preview.innerHTML = `
    <div>change event:</div>
    <pre>${JSON.stringify(e, null, 2)}</pre>
  `;
};

idraw.on(eventKeys.CHANGE, listenChange);

idraw.modifyElement({
  uuid: elem1.uuid,
  detail: {
    background: '#f7d3c1',
    borderColor: '#ff6032'
  }
});

idraw.off(eventKeys.CHANGE, listenChange);

idraw.modifyElement({
  uuid: elem1.uuid,
  detail: {
    background: '#aaaaaa',
    borderColor: '#222222'
  }
});
