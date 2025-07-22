const express = require('express');
const router = express.Router();
const Calendar = require('./calendar.model');

// Route to get a calendar by profileId
const getCalendar = async (req, res) => {
  try {
    const profileId = req.params.profileId;
    console.log(profileId)
    const calendar = await Calendar.findOne({ profileId:profileId });

    if (!calendar) {
      return res.status(404).json({ message: 'Calendar not found' });
    }

    res.json(calendar);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}
const resetCalendar = async (req, res) => {
  try {
    const profileId = req.params.profileId;
      const calenderFound =   await Calendar.find({ profileId });
  if (!calenderFound) {
      return res.status(404).json({ message: 'Calendar not found' });
    }
    await Calendar.deleteOne({ profileId });
    console.log(profileId)

  
 const calendar =   await  Calendar.create({
  profileId:profileId,  // Pass the profile ID
});
    res.json(calendar);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

const updateCalendarValues = async (req, res) => {
  const { profileId } = req.params;
  const { weekNumber, dayUpdates } = req.body;

  try {
    // Find the calendar by profileId
    const calendar = await Calendar.findOne({ profileId });

    if (!calendar) {
      return res.status(404).json({ message: 'Calendar not found' });
    }

    // Validate weekNumber is within the allowed range (1 to 4)
    if (weekNumber < 1 || weekNumber > 4) {
      return res.status(400).json({ message: 'Invalid week number. Must be between 1 and 4.' });
    }

    // Dynamically update the days in the specified week
    const weekKey = `week${weekNumber}`;
    
    // Update the specific days (day1 to day7) based on the request body (dayUpdates)
    for (const [day, value] of Object.entries(dayUpdates)) {
      if (calendar.weeks[weekKey][day] !== undefined) {
        calendar.weeks[weekKey][day] = value;  // Update the day (e.g., day1, day2, etc.)
      }
    }

    // Save the updated calendar
    await calendar.save();

    res.json({ message: 'Calendar updated successfully', calendar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getCalendar,resetCalendar,updateCalendarValues
};
