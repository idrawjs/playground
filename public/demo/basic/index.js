import {iDraw} from 'idraw';
import data from './data';

const app = document.querySelector('#app');
const options = {
  width: 500,
  height: 400,
  contextWidth: 500,
  contextHeight: 400,
  devicePixelRatio: 2,
}
const idraw = new iDraw(app, options);
idraw.setData(data)
idraw.selectElementByIndex(0);
