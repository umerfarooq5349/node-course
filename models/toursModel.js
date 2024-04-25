const mongoose = require("mongoose");
const slugify = require("slugify");
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must have a name"],
    trim: true,
  },

  price: {
    type: Number,
    required: [true, "Specify the price"],
  },
  slug: {
    type: String,
  },
  duration: {
    type: Number,
    default: 7,
  },

  maxGroupSize: {
    type: Number,
    required: [true, "Must have atleast 4 persons"],
  },
  difficulty: {
    type: String,
    default: "medium",
  },
  ratingsAverage: {
    type: Number,
    default: 4.7,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },

  summary: {
    type: String,
    required: [true, "Must have a description"],
    trim: true,
  },
  description: {
    type: String,

    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "Must have cover image"],
  },
  images: [
    {
      type: String,
      required: [true, "Must have some images"],
    },
  ],
  priceDiscount: {
    type: Number,
    validate: function (value) {
      return value < this.price;
    },
  },
  startDates: [
    {
      type: Date,
      default: Date.now,
      required: [true, "Must have a valid date"],
    },
  ],
});

// document middleware
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  console.log(`Pre: ${Date.now()}`);
  next();
});

// tourSchema.post("save", function () {
//   console.log(`Post: ${Date.now()}`);
// });

// query middleware

tourSchema.pre(/^find/, function (next) {
  this.find({ price: { $gte: 1200 } });
  // console.log(`Pre: ${Date.now()}`);
  next();
});

// agregate middleware

tourSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { price: { $ne: 1200 } } });
  // console.log(JSON.stringify(this.pipeline()));
  next();
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
