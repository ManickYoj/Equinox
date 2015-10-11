// -- Massive Bodies
MassiveBodies = new Mongo.Collection("massive-bodies");

const MassiveBodySchema = new SimpleSchema({
  name: {
    type: String,
    optional: true,
  },

  transform: {
    type: CollectionHelpers.transformSchema,
  },

  radius: {
    type: Number,
  },
});

MassiveBodies.attachSchema(MassiveBodySchema);
