import { iDraw } from 'idraw';
const data = {
  // background: '#f0f0f0',
  elements: [
    {
      uuid: 'b0124555-768d-9fb7-eaa3-24ce35ccea4e',
      name: 'circle-001',
      x: 50,
      y: 50,
      w: 100,
      h: 100,
      angle: 0,
      type: 'circle',
      detail: {
        background: '#d5f5f9',
        borderWidth: 10,
        borderColor: '#3f51b5'
      }
    }
  ]
};

const app = document.querySelector('#app');
const idraw = new iDraw(app, {
  width: 320,
  height: 320,
  devicePixelRatio: 2
});
idraw.setData(data);
