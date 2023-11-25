import { iDraw } from 'idraw';
import data from './data';

const app = document.querySelector('#app');
const options = {
  width: 600,
  height: 400,
  contextWidth: 600,
  contextHeight: 400,
  devicePixelRatio: 4,
}
const idraw = new iDraw(app, options);
idraw.setData(data);

const elem1 = idraw.getData().elements[1];
elem1.detail = { ...elem1.detail,  ...{
  color: '#f7d3c1',
  borderColor: '#ff6032',
}}
idraw.updateElement(elem1);

