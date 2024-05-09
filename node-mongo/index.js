const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 3000;
const MONGO_URL = "mongodb://127.0.0.1/conFusion";

app.use(express.json());

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database is connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

const dishesSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Kietnehihi" },
    decription: { type: String, default: "123123" },
  },
  { versionKey: false }
);

const dishesModel = mongoose.model("dishes", dishesSchema);

app.get("/dishes", async (req, res) => {
  const dishes = await dishesModel.find();
  res.json(dishes);
});

app.post("/dishes", async (req, res) => {
  try {
    const dish = new dishesModel(req.body);
    const savedDish = await dish.save();
    res.status(200).json(savedDish);
  } catch (error) {
    console.error("Error adding dish:", error);
    res.status(500).json({ error: "Error adding dish" });
    // Exit the function after sending the error response
    return;
  }
});
