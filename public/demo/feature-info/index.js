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
idraw.selectElement(data.elements[1].uuid);

const btnEnable = document.querySelector('#btn-enable');
const btnDisable = document.querySelector('#btn-disable');

btnEnable.addEventListener('click', () => {
  idraw.enable('info');
});
btnDisable.addEventListener('click', () => {
  idraw.disable('info');
});
