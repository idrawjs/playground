import { iDraw, createUUID } from 'idraw';
const data = {
  // background: '#f0f0f0',
  elements: [
    {
      uuid: createUUID(),
      name: 'rect-001',
      x: 120,
      y: 120,
      w: 300,
      h: 200,
      type: 'group',
      detail: {
        background: '#d5f5f9',
        borderWidth: 2,
        borderColor: '#3f51b5',
        children: [
          {
            uuid: createUUID(),
            name: 'rect-001',
            x: 50,
            y: 50,
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
            x: 150,
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
  width: 600,
  height: 400,
  devicePixelRatio: 2
});
idraw.setData(data);
