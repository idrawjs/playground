import { iDraw } from 'idraw';
const data = {
  elements: [
    {
      uuid: '44dbb2c1-3588-385c-6b46-327c6adb438a',
      name: 'rect-001',
      x: 60,
      y: 50,
      w: 200,
      h: 200,
      angle: 0,
      type: 'text',
      detail: {
        text: 'Hello\r\nWorld',
        color: '#3f51b5',
        fontSize: 60,
        lineHeight: 80,
        textAlign: 'center',
        verticalAlign: 'middle',
        borderRadius: 10,
        borderWidth: 2,
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
