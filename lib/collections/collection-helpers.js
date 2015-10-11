const TransformSchema = new SimpleSchema({
  pos: {
    type: [Number],
    label: "position",
  },

  dPos: {
    type: [Number],
    label: "velocity",
    defaultValue: [0, 0],
  },

  rot: {
    type: [Number],
    label: "rotation",
    defaultValue: [0],
  },

  dRot: {
    type: [Number],
    label: "angular velocity",
    defaultValue: [0],
  },

  mass: {
    type: Number,
    defaultValue: 1,
    decimal: true,
  },
});

CollectionHelpers = {
  transformSchema: TransformSchema,
}
