// TODO: Make this script only run in testing

// -- DATA
const ships = [
  {
    name: "USS Phoenix",

    transform: {
      pos: [6371000 + 418000, 0],
      dPos: [0, 8667],
      ang: [0],
      dAng: [0],
      mass: 370131,
    },

    trail: {
      offset: 0,
      points: [],
    }
  },
];

const massiveBodies = [
  {
    name: "Earth",

    transform: {
      pos: [0, 0],      // Position
      dPos: [0, 0],     // Velocity
      ang: [0],           // Angular displacement
      dAng: [0],          // Angular speed
      mass: 5.972 * Math.pow(10, 24),
    },

    radius: 6371000,
  },
];


// -- Utility Functions for Reset
function clearRecords(collection) {
  return new Promise( (resolve, reject) => {
    collection.remove({}, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

function insertRecord(collection, record) {
  return new Promise((resolve, reject) => {
    collection.insert(record, (err, id) => {
      if (err) reject(err);
      else resolve(id);
    });
  });
};

function pushRecord(collection, _id, field, record) {
  const query = {};
  query[field] = record;

  return new Promise( (resolve, reject) => {
    collection.update({_id}, {$push: query}, (err, numUpdates) => {
      if (err) reject(err);
      else resolve(numUpdates);
    })
  });
};


// -- Database Reset Script
Meteor.startup( () => {
  if (Meteor.isServer) {
    console.log("-- Resetting Database --");

    // -- Clear all DB records
    Promise.all([
      clearRecords(Games),
      clearRecords(Ships),
      clearRecords(MassiveBodies),
    ])

    // -- Create a new game, ships, and bodies
    .then(() => {
      return Promise.all([
        // Create new game
        insertRecord(Games, {name: "Sol"}),

        // Create new ships
        Promise.all(
          ships.map(
            (ship) => insertRecord(Ships, ship)
          )
        ),

        // Create new planets
        Promise.all(
          massiveBodies.map(
            (body) => insertRecord(MassiveBodies, body)
          )
        ),
      ]);
    })

    // -- Add new ships and bodies to the game
    .then((values) => {
      const [game_id, ship_ids, body_ids] = values;

      return Promise.all(
        ship_ids.map((ship_id) =>
          pushRecord(Games, game_id, "ships", ship_id)
        ),

        body_ids.map((body_id) =>
          pushRecord(Games, game_id, "bodies",  body_id)
        ),
      );
    })

    // -- Display a success message
    .then(() => {
      console.log("-- Database Reset Successful --");
    })

    // -- Catch any errors during process
    .catch((err) => {
      console.log("ERROR occurred in database population: ", err);
    });
  }
});
