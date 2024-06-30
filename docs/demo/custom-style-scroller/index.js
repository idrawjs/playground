import { iDraw } from 'idraw';
import data from './data';

const app = document.querySelector('#app');
const options = {
  width: 320,
  height: 320,
  devicePixelRatio: 2,
  styles: {
    scroller: {
      thumbBackground: '#FF00003A',
      thumbBorderColor: '#FF00008A',
      hoverThumbBackground: '#FF00006E',
      hoverThumbBorderColor: '#FF0000E0',
      activeThumbBackground: '#FF0000E0',
      activeThumbBorderColor: '#FF0000F0'
    }
  }
};
const idraw = new iDraw(app, options);
idraw.setData(data);
idraw.centerContent();
idraw.selectElements([data.elements[1].uuid]);
