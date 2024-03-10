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
idraw.disable('ruler');

setTimeout(() => {
  idraw.enable('ruler');
}, 1000);
