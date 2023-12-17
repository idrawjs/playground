import { iDraw } from 'idraw';
const data = {
  // background: '#f0f0f0',
  elements: [
    {
      uuid: '8b1fd36e-30b8-f6ab-05e6-7f7773e32c99',
      name: 'rect-001',
      x: 160,
      y: 120,
      w: 200,
      h: 100,
      angle: 30,
      type: 'rect',
      detail: {
        background: '#d5f5f9',
        borderRadius: 20,
        borderWidth: 10,
        borderColor: '#3f51b5'
      }
    }
  ]
};

const app = document.querySelector('#app');
const idraw = new iDraw(app, {
  width: 600,
  height: 400,
  devicePixelRatio: 2
});
idraw.setData(data);
