//Ships = new Mongo.Collection("ships");
//
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
//Ships.attachSchema(ShipSchema);
