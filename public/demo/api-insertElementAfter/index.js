import iDraw from 'idraw';
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


idraw.insertElementAfter({
  name: "rect-xxx",
  x: 140,
  y: 120,
  w: 200,
  h: 100,
  type: "rect",
  desc: {
    color: "#f7d3c1",
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "#ff6032",
  },
}, idraw.getData().elements[1].uuid);

