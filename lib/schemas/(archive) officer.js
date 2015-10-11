//Officers = new Mongo.Collection("officers");
//
//const Roles = {
//  "navigation": {
//    displayName: "Navigation Officer",
//  },
//
//  "captain": {
//    displayName: "Ship's Captain",
//  },
//
//  "squadron": {
//    displayName: "Squadron Commander",
//  }
//};
//
//const OfficerSchema = new SimpleSchema({
//  user: {
//    type: String,
//  },
//
//  ship: {
//    type: String,
//  },
//
//  name: {
//    type: String,
//  },
//
//  role: {
//    type: String,
//    allowedValues: Object.keys(Roles),
//  },
//
//  entry: {
//    type: Number,
//    defaultValue: 0,
//  },
//});
//
//Officers.attachSchema(OfficerSchema);
