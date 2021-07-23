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
const idraw = new iDraw(app, options, {
  scrollWrapper: {
    use: true,
  }
});
idraw.initData(data);

setTimeout(() => {
  idraw.resetSize({
    width: 300,
    height: 200,
    contextWidth: 600,
    contextHeight: 400,
  });
}, 1000);