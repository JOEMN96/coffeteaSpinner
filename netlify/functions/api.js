const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(
  "mongodb+srv://spinneradmin:spinneradmin@spinner.tz3q8.mongodb.net/?retryWrites=true&w=majority&appName=Spinner"
);
const clientPromise = mongoClient.connect();

const handler = async (event) => {
  let { name, email, phone } = JSON.parse(event.body);

  try {
    const database = (await clientPromise).db("spinner_data");
    const collection = database.collection("entries");

    const results = await collection
      .find({
        email,
        phone,
      })
      .limit(1)
      .toArray();

    if (results.length === 0) {
      const newUser = { name, email, phone, date: new Date() };

      let result = await getPrize(newUser);
      newUser.prize = result.prize;
      newUser.index = result.index;

      await collection.insertOne(newUser);

      return {
        statusCode: 201,
        body: JSON.stringify({ message: "User added successfully", prize: result }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "User already exists", prize: "Better luck Next time", index: 8 }),
      };
    }
  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: error.toString() };
  }
};

function getPrize() {
  const today = new Date().toISOString().split("T")[0];
  const availablePrizes = prizes.filter((prize) => new Date(prize.date).toISOString().split("T")[0] === today);

  if (availablePrizes.length === 0) {
    return {
      prize: "Better luck Next time",
      index: 8,
    };
  }

  let index = prizes.indexOf(availablePrizes[0]);

  return clientPromise.then(async (client) => {
    const database = client.db("spinner_data");
    const collection = database.collection("entries");

    const prizeGiven = await collection.findOne({ prize: availablePrizes[0].labelText, date: { $gte: new Date(today) } });

    if (!prizeGiven) {
      return {
        prize: availablePrizes[0].labelText,
        index,
      };
    }

    return {
      prize: "Better luck Next time",
      index: 8,
    };
  });
}

const prizes = [
  {
    labelText: "English Breakfast",
    image: "./spinnerImages/english-breakfast.svg",
    date: "2024-12-19T00:00:00+00:00",
  },
  {
    labelText: "Choice of Pasta",
    image: "./spinnerImages/ChoiceofPasta.svg",
    date: "2024-12-20T00:00:00+00:00",
  },
  {
    labelText: "250 gms cookies",
    image: "./spinnerImages/cookies.svg",
    date: "2024-12-21T00:00:00+00:00",
  },
  {
    labelText: "500 gms cake ",
    image: "./spinnerImages/cake.svg",
    date: "2024-12-22T00:00:00+00:00",
  },
  {
    labelText: "Movie Ticket",
    image: "./spinnerImages/ticket.svg",
    date: "2024-12-23T00:00:00+00:00",
  },
  {
    labelText: "Boat Airdopes",
    image: "./spinnerImages/boat.svg",
    date: "2024-12-25T00:00:00+00:00",
  },
  {
    labelText: "Rs 500 Voucher",
    image: "./spinnerImages/voucher.svg",
    date: "2024-12-24T00:00:00+00:00",
  },
  {
    labelText: "Creamy Cappuccino",
    image: "./spinnerImages/cappuccino.svg",
    date: "2024-12-26T00:00:00+00:00",
  },
  {
    labelText: "Better luck Next time",
    image: "./spinnerImages/bl.svg",
    date: "2024-11-27T00:00:00+00:00",
  },
  {
    labelText: "Creamy Cold Coffee",
    image: "./spinnerImages/cold-coffee.svg",
    date: "2024-12-27T00:00:00+00:00",
  },
];

module.exports = { handler };
