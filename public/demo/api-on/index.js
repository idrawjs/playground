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
idraw.setData(data, {
  triggerChangeEvent: true
});

idraw.off('changeData');
idraw.setData(data);

