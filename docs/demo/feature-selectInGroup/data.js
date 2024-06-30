export default {
  // background: '#f0f0f0',
  elements: [
    {
      uuid: '98e31597-b745-7d6f-4164-920b8a4e8f36',
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
            uuid: '28774435-b994-1016-1c17-95912f719bab',
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
            uuid: '44dbb2c1-3588-385c-6b46-327c6adb438a',
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
