import iDraw from 'idraw';
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
    lineWidth: 12,
    color: '#009688',
  },
  elementWrapper: {
    color: '#e91e63',
    dotSize: 8,
    lineWidth: 1,
    lineDash: [12, 12],
  },
}
const idraw = new iDraw(app, options, config);
idraw.initData(data);

idraw.selectElement(1);
