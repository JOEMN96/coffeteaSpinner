const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(process.env.MONGODB_URI);
const clientPromise = mongoClient.connect();

const handler = async (event) => {
  if (
    event.headers.origin !== "https://promotion.coffetea.in" ||
    event.headers.origin !== "https://promotion.coffetea.in" ||
    event.headers.origin !== "https://comforting-valkyrie-76a612.netlify.app"
  ) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Invalid Request",
        prize: "Better luck Next time",
        index: 8,
        origin: event.headers.origin,
      }),
    };
  }

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
    date: "2024-12-24T00:00:00+00:00",
  },
  {
    labelText: "Choice of Pasta",
    image: "./spinnerImages/ChoiceofPasta.svg",
    date: "2024-12-25T00:00:00+00:00",
  },
  {
    labelText: "250 gms cookies",
    image: "./spinnerImages/cookies.svg",
    date: "2024-12-26T00:00:00+00:00",
  },
  {
    labelText: "500 gms cake ",
    image: "./spinnerImages/cake.svg",
    date: "2024-12-27T00:00:00+00:00",
  },
  {
    labelText: "Movie Ticket",
    image: "./spinnerImages/ticket.svg",
    date: "2024-12-28T00:00:00+00:00",
  },
  {
    labelText: "Boat Airdopes",
    image: "./spinnerImages/boat.svg",
    date: "2024-12-29T00:00:00+00:00",
  },
  {
    labelText: "Rs 500 Voucher",
    image: "./spinnerImages/voucher.svg",
    date: "2024-12-30T00:00:00+00:00",
  },
  {
    labelText: "Creamy Cappuccino",
    image: "./spinnerImages/cappuccino.svg",
    date: "2024-12-31T00:00:00+00:00",
  },
  {
    labelText: "Better luck Next time",
    image: "./spinnerImages/bl.svg",
    date: "2024-11-01T00:00:00+00:00",
  },
  {
    labelText: "Creamy Cold Coffee",
    image: "./spinnerImages/cold-coffee.svg",
    date: "2024-12-02T00:00:00+00:00",
  },
];

module.exports = { handler };
