Games = new Mongo.Collection("games");

const GameSchema = new SimpleSchema({
  name: {
    type: String,
  },

  players: {
    type: [String],
    defaultValue: [],
  },
});

Games.attachSchema(GameSchema);
