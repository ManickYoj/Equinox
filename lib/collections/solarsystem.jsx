SolarSystems = new Mongo.Collection("solar-systems");

const MassiveBody = new SimpleSchema({
  transform: {
    type: CollectionHelpers.transformSchema,
  },

  radius: {
    type: Number,
  },
});


// Public data visible to all ships
const SolarSystemSchema = new SimpleSchema({
  name: {
    type: String
  },

  bodies: {
    type: [MassiveBody]
  },
});

SolarSystems.attachSchema(SolarSystemSchema);
