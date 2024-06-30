import { iDraw } from 'idraw';
import data from './data';

const app = document.querySelector('#app');
const options = {
  width: 320,
  height: 320,
  devicePixelRatio: 2,
  styles: {
    selector: {
      activeColor: '#FF0000',
      activeAreaColor: '#FF00001C',
      lockedColor: '#009688',
      referenceColor: '#9c27b0'
    }
  }
};
const idraw = new iDraw(app, options);
idraw.setData(data);
idraw.centerContent();
idraw.selectElements([data.elements[1].uuid]);
