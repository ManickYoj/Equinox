const TransformSchema = new SimpleSchema({
  pos: {
    type: [Number],
    label: "position",
  },

  'pos.$': {
    decimal: true,
  },

  dPos: {
    type: [Number],
    label: "velocity",
    defaultValue: [0, 0],
  },

  'dPos.$': {
    decimal: true,
  },

  ang: {
    type: [Number],
    label: "rotation",
    defaultValue: [0],
  },

  'ang.$': {
    decimal: true,
  },

  dAng: {
    type: [Number],
    label: "angular velocity",
    defaultValue: [0],
    decimal: true,
  },

  'dAng.$': {
    decimal: true,
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
