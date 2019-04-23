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
            type: "value",
            units: "decibels"
          }
      ]
    }
  ]

}