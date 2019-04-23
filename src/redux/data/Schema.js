// ToneJS Types at https://tonejs.github.io/docs/r13/Type

export default {

    nodes: [
      {
        id: "master",
        name: "Master Output",
        type: "Tone.Master",
        inputs: [
          {
            id: "volume",
            name: "Master Volume",
            type: "Decibels",
            default: 0
          }
      ]
    }
  ]

}