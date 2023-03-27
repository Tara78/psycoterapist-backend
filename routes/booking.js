import express from "express";
import Booking from "../models/Booking.js";

import {
  adminAuthMiddleFunction,
  userAuthMiddleFunction,
} from "../utils/middleware";

const router = express.Router();

router.get(
  "/free/:year/:month/:day",
  userAuthMiddleFunction,
  async (req, res) => {
    try {
      const calendar = await Booking.find({
        year: req.params.year,
        month: req.params.month,
        day: req.params.day,
      });
      res.status(200).json({
        success: true,
        result: calendar,
      });
    } catch (err) {
      res.status(400).json({ success: false, response: err });
    }
  }
);

router.delete("/calendar", async (req, res) => {
  try {
    const calendar = await Booking.find({});
    res.status(200).json({
      success: true,
      result: calendar,
    });
  } catch (err) {
    res.status(400).json({ success: false, response: err });
  }
});

router.post("/create/:year/:month", async (req, res) => {
  const { year, month } = req.params;
  console.log("year, month", year, month);
  try {
    for (let i = 0; i <= new Date(year, month, 0).getDate(); i++) {
      const date = new Date(year, month, i);
      console.log(i);
      if (date.getDay() == 6) {
        console.log("saturday");
        [14, 15, 16, 17, 18].forEach(async (time) => {
          console.log("time", time);
          const newBooking = new Booking({
            year,
            month,
            day: date.getDay(),
            time,
          });
          await newBooking.save();
        });
      }
    }
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Occupy time (user)
router.post("/:id", userAuthMiddleFunction, async (req, res) => {
  try {
    const calendar = await Booking.find({
      time: req.params.time,
    });
    res.status(200).json({
      success: true,
      result: calendar,
    });
  } catch (err) {
    res.status(400).json({ success: false, response: err });
  }
});

// Occupy time for admin

router.post("/occupay/:id", adminAuthMiddleFunction, async (req, res) => {
  try {
    const calendar = await Booking.find({
      time: req.params.time,
    });
    res.status(200).json({
      success: true,
      result: calendar,
    });
  } catch (err) {
    res.status(400).json({ success: false, response: err });
  }
});

export default router;
