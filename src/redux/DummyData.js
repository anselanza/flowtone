export default {
    widgets: [
      {
          id: 0,
          name: 'Master',
          type: 'Tone.Master',
          position: {
            x: 400,
            y: 400
          }
      },
      {
          id: 1,
          name: 'Oscillator',
          type: 'Tone.Oscillator'
      },
      {
        id: 2,
        name: 'Noise',
        type: 'Tone.Noise'
      },
      {
        id: 3,
        name: 'LowPassFilter',
        type: 'Tone.Filter'
      }
    ],
  
    cables: [
      {
        from: {
          id: 1
        },
        to: {
          id: 0
        }
      },
      {
        from: {
          id: 2
        },
        to: {
          id: 3
        }
      },
      {
        from: {
          id: 3
        },
        to: {
          id: 0
        }
      }
    ]
  }