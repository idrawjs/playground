import { iDraw, createUUID } from 'idraw';
const data = {
  // background: '#f0f0f0',
  elements: [
    {
      uuid: createUUID(),
      name: 'rect-001',
      x: 50,
      y: 50,
      w: 200,
      h: 150,
      type: 'group',
      detail: {
        background: '#d5f5f9',
        borderWidth: 2,
        borderColor: '#3f51b5',
        children: [
          {
            uuid: createUUID(),
            name: 'rect-001',
            x: 20,
            y: 20,
            w: 100,
            h: 50,
            type: 'rect',
            detail: {
              background: '#8bc34a',
              borderRadius: 10,
              borderWidth: 4,
              borderColor: '#386a3a'
            }
          },
          {
            uuid: createUUID(),
            name: 'circle-001',
            x: 100,
            y: 80,
            w: 100,
            h: 100,
            angle: 0,
            type: 'circle',
            detail: {
              background: '#ff9800'
            }
          }
        ]
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
