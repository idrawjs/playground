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

idraw.addElement({
  name: 'rect-001',
  x: 140,
  y: 120,
  w: 200,
  h: 100,
  type: 'rect',
  detail: {
    background: '#f7d3c1',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#ff6032'
  }
});
