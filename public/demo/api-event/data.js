import { createUUID } from 'idraw';

export default {
  elements: [
    {
      uuid: createUUID(),
      name: 'rect-001',
      x: 40,
      y: 80,
      w: 200,
      h: 100,
      type: 'rect',
      detail: {
        background: '#d5f5f9',
        borderRadius: 20,
        borderWidth: 4,
        borderColor: '#3f51b5'
      }
    },
    {
      uuid: createUUID(),
      name: 'rect-002',
      x: 120,
      y: 120,
      w: 200,
      h: 120,
      // angle: 30,
      type: 'rect',
      detail: {
        background: '#d5f5f9',
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#3f51b5'
      }
    },
    {
      uuid: createUUID(),
      name: 'rect-003',
      x: 300,
      y: 200,
      w: 200,
      h: 20,
      type: 'rect',
      angle: 45,
      detail: {
        background: '#c0c0c0',
        borderRadius: 20,
        borderWidth: 4,
        borderColor: '#3f51b5'
      }
    },
    {
      uuid: createUUID(),
      name: 'rect-004',
      x: 400 - 20,
      y: 300 - 20,
      w: 200,
      h: 100,
      type: 'rect',
      locked: true,
      detail: {
        background: '#e0e0e0',
        borderRadius: 20,
        borderWidth: 4,
        borderColor: '#3f51b5'
      }
    }
  ]
};
