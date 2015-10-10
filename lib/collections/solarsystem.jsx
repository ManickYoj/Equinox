MassiveBodies = new Mongo.Collection("massive-bodies");
//SolarSystems = new Mongo.Collection("solar-systems");

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

//
//// Public data visible to all ships
//const SolarSystemSchema = new SimpleSchema({
//  name: {
//    type: String
//  },
//
//  bodies: {
//    type: [String]
//  },
//});
//
//SolarSystems.attachSchema(SolarSystemSchema);
MassiveBodies.attachSchema(MassiveBodySchema);
