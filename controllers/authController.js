const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const calculateAge = dob => {
  const diff = Date.now() - dob.getTime(); // Calculate the difference in milliseconds
  const age = new Date(diff); // Create a new Date object with the difference
  return Math.abs(age.getUTCFullYear() - 1970); // Calculate the age in years
}; // Function to calculate age from Date of Birth

// Signup function
exports.signup = async (req, res) => {
  const { phoneNumber, email, name, dob, monthlySalary, password } = req.body;

  try {
    const age = calculateAge(new Date(dob)); // Validation
    if (age < 20) return res.status(400).json({ msg: 'Age of user must be above 20' }); // Validation
    if (monthlySalary < 25000) return res.status(400).json({ msg: 'Monthly salary must be 25000 or more' }); // Validation

    // Check if user exists
    const userExists = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (userExists) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt

    // Create user
    const newUser = new User({
        phoneNumber,
        email,
        name,
        dob,
        monthlySalary,
        password: hashedPassword,  // Store the hashed password
        status: 'Approved',  // Set the user's status to 'Approved'
        purchasePower: monthlySalary * 0.5  // Calculate the purchase power as 50% of the monthly salary
    })

    await newUser.save(); // Save the new user to the database
    res.status(201).json({ msg: 'User registered successfully' });

  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Login function
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Create JWT
    const payload = { userId: user._id };
    const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });
    res.json({ token });

  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
