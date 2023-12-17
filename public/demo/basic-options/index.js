import { iDraw } from 'idraw';
import data from './data';

const app = document.querySelector('#app');
const options = {
  width: 500,
  height: 400,
  devicePixelRatio: 2,
  disableScroll: true,
  disableSelect: true,
  disableScale: true,
  disableRuler: true,
  disableTextEdit: true
};
const idraw = new iDraw(app, options);
idraw.setData(data);
idraw.selectElements([data.elements[0].uuid]);
