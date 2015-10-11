Games = new Mongo.Collection("games");

const GameSchema = new SimpleSchema({
  name: {
    type: String,
  },

  ships: {
    type: [String],
    defaultValue: [],
  },

  bodies: {
    type: [String],
    defaultValue: [],
  }
});

Games.attachSchema(GameSchema);
