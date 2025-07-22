const mongoose = require('mongoose');
const { Schema } = mongoose;

const daySchema = new Schema({
  day1: { type: Boolean, required: true, default: false },
  day2: { type: Boolean, required: true, default: false },
  day3: { type: Boolean, required: true, default: false },
  day4: { type: Boolean, required: true, default: false },
  day5: { type: Boolean, required: true, default: false },
  day6: { type: Boolean, required: true, default: false },
  day7: { type: Boolean, required: true, default: false }
});

const calendarSchema = new Schema({
  profileId: {
    type: String ,
    required: true
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  weeks: {
    type: {
      week1: { type: daySchema, required: true },
      week2: { type: daySchema, required: true },
      week3: { type: daySchema, required: true },
      week4: { type: daySchema, required: true }
    },
    required: true,
    default: {
      week1: { day1: false, day2: false, day3: false, day4: false, day5: false, day6: false, day7: false },
      week2: { day1: false, day2: false, day3: false, day4: false, day5: false, day6: false, day7: false },
      week3: { day1: false, day2: false, day3: false, day4: false, day5: false, day6: false, day7: false },
      week4: { day1: false, day2: false, day3: false, day4: false, day5: false, day6: false, day7: false }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to automatically set startDate and calculate endDate
calendarSchema.pre('save', function (next) {
  // Set startDate to the current date when the document is created
  if (!this.startDate) {
    this.startDate = new Date();
  }

  // Automatically calculate and set endDate 28 days after startDate
  this.endDate = new Date(this.startDate.getTime() + 28 * 24 * 60 * 60 * 1000); // 28 days later

  next();
});

const Calendar = mongoose.model('Calendar', calendarSchema,'Calendar');

module.exports = Calendar;
