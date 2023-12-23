import { iDraw } from 'idraw';
import data from './data';

const app = document.querySelector('#app');
const options = {
  width: 320,
  height: 320,
  devicePixelRatio: 2,
  enableScroll: false,
  enableSelect: false,
  enableScale: false,
  enableRuler: false,
  enableTextEdit: false
};
const idraw = new iDraw(app, options);
idraw.setData(data);
idraw.selectElements([data.elements[0].uuid]);
