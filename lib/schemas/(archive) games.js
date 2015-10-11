//const TrailsSchema = new SimpleSchema({
//  offset: {
//    type: Number,
//  },
//
//  points: {
//    type: Array,
//  },
//
//  'points.$': {
//    type: Array,
//  },
//
//  'points.$.$': {
//    type: Number,
//  },
//});
//
//const ShipSchema = new SimpleSchema({
//  name: {
//    type: String,
//  },
//
////  crew: {
////    type: String,
////  },
//
//  transform: {
//    type: CollectionHelpers.transformSchema,
//  },
//
//  trail: {
//    type: TrailsSchema,
//  }
//});
//
//const MassiveBodySchema = new SimpleSchema({
//  name: {
//    type: String,
//    optional: true,
//  },
//
//  transform: {
//    type: CollectionHelpers.transformSchema,
//  },
//
//  radius: {
//    type: Number,
//  },
//});
//
//const GameSchema = new SimpleSchema({
//  name: {
//    type: String,
//  },
//
//  ships: {
//    type: [ShipSchema],
//    defaultValue: [],
//  },
//
//  bodies: {
//    type: [MassiveBodySchema],
//    defaultValue: [],
//  }
//});
