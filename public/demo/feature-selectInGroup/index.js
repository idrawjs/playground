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
idraw.centerContent();

const btnEnable = document.querySelector('#btn-enable');
const btnDisable = document.querySelector('#btn-disable');

btnEnable.addEventListener('click', () => {
  idraw.enable('selectInGroup');
});
btnDisable.addEventListener('click', () => {
  idraw.disable('selectInGroup');
});
