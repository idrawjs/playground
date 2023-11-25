import { iDraw } from 'idraw';
import data from './data';

const app = document.querySelector('#app');
const options = {
  width: 600,
  height: 400,
  contextWidth: 800,
  contextHeight: 800,
  devicePixelRatio: 2,
}
const config = {
  scrollWrapper: {
    use: true,
    width: 16,
    color: '#666666',
  },
  elementWrapper: {
    color: '#e91e63',
    controllerSize: 8,
    lineWidth: 1,
    lineDash: [12, 12],
  },
}
const idraw = new iDraw(app, options, config);
idraw.setData(data);

idraw.selectElementByIndex(1);
