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

idraw.on('changeData', (e) => {
  console.log('changeData: event = ', e);
});
idraw.initData(data);

idraw.off('changeData');
idraw.initData(data);

