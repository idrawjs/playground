import { iDraw } from 'idraw';
import data from './data';

const app = document.querySelector('#app');
const options = {
  width: 320,
  height: 320,
  devicePixelRatio: 2,
  styles: {
    info: {
      textBackground: '#9c27b0',
      textColor: '#ffeb3b'
    }
  }
};
const idraw = new iDraw(app, options);
idraw.setData(data);
idraw.centerContent();
idraw.selectElements([data.elements[1].uuid]);
