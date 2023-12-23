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

const elem1 = idraw.getData().elements[1];
elem1.detail = {
  ...elem1.detail,
  ...{
    color: '#f7d3c1',
    borderColor: '#ff6032'
  }
};
idraw.updateElement(elem1);
