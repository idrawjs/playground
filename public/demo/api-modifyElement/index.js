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

idraw.modifyElement({
  uuid: elem1.uuid,
  detail: {
    background: '#f7d3c1',
    borderColor: '#ff6032'
  }
});
