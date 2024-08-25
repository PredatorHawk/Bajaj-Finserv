import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());

app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: 'Invalid input. "data" should be an array of strings.',
    });
  }

  const numbers = [];
  const alphabets = [];
  let highestLowercaseAlphabet = "";

  data.forEach((item) => {
    if (/^\d+$/.test(item)) {
      numbers.push(item);
    } else if (/^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
      if (
        /^[a-z]$/.test(item) &&
        (!highestLowercaseAlphabet || item > highestLowercaseAlphabet)
      ) {
        highestLowercaseAlphabet = item;
      }
    }
  });

  res.json({
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet
      ? [highestLowercaseAlphabet]
      : [],
  });
});

app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
