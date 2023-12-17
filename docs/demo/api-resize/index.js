import { iDraw } from 'idraw';
import data from './data';

const app = document.querySelector('#app');
const options = {
  width: 600,
  height: 400,
  devicePixelRatio: 2
};
const idraw = new iDraw(app, options);
idraw.setData(data);

setTimeout(() => {
  idraw.resize({
    width: 300,
    height: 200
  });
}, 1000);
