// 

/*

id: use ToneJS Class name, i.e. Title Case
name: can be anything useful, Title Case
type: Tone.x where x is the same as the ID - must match the Widget type!

inputs: (array)
  id: use ToneJS member name, i.e. camelCase
  name: something useful, Title Case
  type: as per ToneJS Types at https://tonejs.github.io/docs/r13/Type
*/

export enum IOscillatorTypes {
  sine = 'sine',
  square = 'square',
  triangle = 'triangle',
  sawtooth = 'sawtooth'
}

export default {

  types: [

    {
      id: 'Decibels',
      postfix: 'dB',
      range: [-Infinity, 0]
    },
    
    {
      id: 'Frequency',
      postfix: 'Hz',
      range: [0, 22000]
    }

  ],

  nodes: [

    {
      id: 'Master',
      name: 'Master Output',
      type: 'Tone.Master',
      inputs: [
        {
          id: 'volume',
          name: 'Master Volume',
          type: 'Decibels',
          default: 0
        }
      ]
    },

    {
      id: 'Oscillator',
      name: 'Oscillator Source',
      type: 'Tone.Oscillator',
      inputs: [
        {
          id: 'frequency',
          name: 'Base Frequency',
          type: 'Frequency',
          default: 440
        },
        {
          id: 'type',
          name: 'Oscillator Type',
          type: 'String',
          default: IOscillatorTypes.sine
        }
      ]
    }
  ]

}