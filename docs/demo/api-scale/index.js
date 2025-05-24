import { iDraw } from 'idraw';
import data from './data';

const width = 320;
const height = 320;

const app = document.querySelector('#app');
const options = {
  width,
  height,
  devicePixelRatio: 2
};
const idraw = new iDraw(app, options);
idraw.setData(data);

setTimeout(() => {
  idraw.scale({
    scale: 0.5,
    point: {
      x: width / 2,
      y: height / 2
    }
  });
}, 1000);
