import { iDraw } from 'idraw';
import data from './data';

const app = document.querySelector('#app');
const options = {
  width: 320,
  height: 320,
  devicePixelRatio: 2,
  styles: {
    ruler: {
      background: '#0000FF1A',
      borderColor: '#0000FF',
      scaleColor: '#FF0000',
      textColor: '#000000',
      gridColor: '#0000FF1C',
      gridPrimaryColor: '#0000FF6C',
      selectedAreaColor: '#FF0000CC'
    }
  }
};
const idraw = new iDraw(app, options);
idraw.setData(data);
idraw.centerContent();
idraw.selectElements([data.elements[1].uuid]);
