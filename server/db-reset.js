// TODO: Make this script only run in testing

// -- DATA
const game = {
  name: "Sol",
}

const physicsObjects = [
  {
    name: "USS Phoenix",

    transform: {
      pos: [1.49604618 * Math.pow(10, 11) + 6371000 + 418000, 0],
      dPos: [0,  -38667],
      ang: [0],
      dAng: [0],
      mass: 370131,
    },

    type: "ship",

    typeDetails: {
      officers: [],
    },
  },

  {
    name: "Earth",

    transform: {
      pos: [1.49604618 * Math.pow(10, 11), 0],
      dPos: [0, -30000],
      ang: [0],
      dAng: [0],
      mass: 5.972 * Math.pow(10, 24),
    },

    type: "body",

    typeDetails: {
      radius: 6371000,
    },
  },

  {
    name: "Sun",

    transform: {
      pos: [0, 0],
      dPos: [0, 0],
      ang: [0],
      dAng: [0],
      mass: 1.989 * Math.pow(10, 30),
    },

    type: "body",

    typeDetails: {
      radius: 695999437,
    },
  },
]

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

// -- Database Reset Script
Meteor.startup( () => {
  if (Meteor.isServer) {
    console.log("-- Resetting Database --");

    // -- Clear all DB records
    Promise.all([
      clearRecords(Games),
      clearRecords(PhysicsObjects),
    ])

    // -- Create a new game
    .then(() => {
      // Create new game
      return insertRecord(Games, {name: "Sol"})
    })

    // -- Add physics objects to the game
    .then((game_id) => {
      return Promise.all(
        physicsObjects.map((physObj) => {
            physObj.game = game_id
            insertRecord(PhysicsObjects, physObj)
          }
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
