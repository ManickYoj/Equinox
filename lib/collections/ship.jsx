Ships = new Mongo.Collection("ships");

const TrailsSchema = new SimpleSchema({
  offset: {
    type: Number,
  },

  points: {
    type: Array,
  },

  'points.$': {
    type: Array,
  },

  'points.$.$': {
    type: Number,
  },
});

const ShipSchema = new SimpleSchema({
  name: {
    type: String,
  },

  transform: {
    type: CollectionHelpers.transformSchema,
  },

  mass: {
    type: Number,
  },

  trails: {
    type: TrailsSchema,
  }
});

Ships.attachSchema(ShipSchema);
