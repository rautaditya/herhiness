const mongoose = require("mongoose");
const Staff = require("../models/Staff");

mongoose
  .connect("mongodb://127.0.0.1:27017/cw1")
  .then(async () => {
    const adminExists = await Staff.findOne({ role: "Admin" });

    if (adminExists) {
      console.log("Admin already exists");
      process.exit(0);
    }

    await Staff.create({
      name: "Super Admin",
      email: "admin@example.com",
      mobile: "9876543210",
      role: "Admin",
      password: "Admin@123",
    });

    console.log("Admin created successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
