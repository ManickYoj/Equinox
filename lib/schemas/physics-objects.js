PhysicsObjects = new Mongo.Collection("physics-objects");

const PhysicsObjectSchema = new SimpleSchema({
  name: {
    type: String,
  },

  game: {
    type: String,
  },

  transform: {
    type: CollectionHelpers.transformSchema,
  },

  type: {
    type: String,
    allowedValues: ["ship", "body"],
  },

  typeDetails: {
    type: Object,
    blackbox: true,
    defaultValue: {},
  },
});

PhysicsObjects.attachSchema(PhysicsObjectSchema);


// -- Helper Methods
/**
 * Splits out a group of physics objects based on their type
 * field to an object with the type as key and an array of the
 * physics objects of that type as the value.
 *
 * @param   {Array}  physObjs An array of PhysicsObjects
 * @returns {Object} An array of {type: [PhysicsObjects]} mappings
 */
PhysicsObjects.splitByType = (physObjs) => {
  const objsByType = {};

  physObjs.forEach((obj) => {
    if (obj.type in objsByType) objsByType[obj.type].push(obj);
    else objsByType[obj.type] = [obj];
  });

  return objsByType;
}
