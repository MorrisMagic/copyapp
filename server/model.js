const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  link: {
    type: String,
  },
});

module.exports = mongoose.model("copy", schema);
