export default {
    widgets: [
      {
        id: 0,
        name: 'Master',
        type: 'Tone.Master',
        position: {
          x: 600,
          y: 200
        },
        values: [
          {
            id: 'volume',
            value: -10
          }
        ]
      },
      {
        id: 1,
        name: 'Oscillator',
        type: 'Tone.Oscillator',
        position: {
          x: 300,
          y: 100
        }
      },
      {
        id: 2,
        name: 'Noise',
        type: 'Tone.Noise',
        position: {
          x: 100,
          y: 400
        }
      },
      {
        id: 3,
        name: 'LowPassFilter',
        type: 'Tone.Filter',
        position: {
          x: 300,
          y: 300
        }
      }
    ],
  
    cables: [
      {
        id: 'cable0',
        from: {
          id: 1
        },
        to: {
          id: 0
        }
      },
      // {
      //   id: 'cable1',
      //   from: {
      //     id: 2
      //   },
      //   to: {
      //     id: 3
      //   }
      // },
      // {
      //   id: 'cable2',
      //   from: {
      //     id: 3
      //   },
      //   to: {
      //     id: 0
      //   }
      // }
    ]
  }