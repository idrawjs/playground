import { iDraw } from 'idraw';
import data from './data';

const app = document.querySelector('#app');
const options = {
  width: 600,
  height: 400,
  contextWidth: 480,
  contextHeight: 320,
  devicePixelRatio: 6,
  onlyRender: false,
}
const idraw = new iDraw(app, options);
idraw.setData(data);

idraw.selectElementByIndex(1);
