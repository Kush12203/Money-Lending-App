const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const calculateAge = dob => {
  const diff = Date.now() - dob.getTime();
  const age = new Date(diff);
  return Math.abs(age.getUTCFullYear() - 1970);
};

exports.signup = async (req, res) => {
  const { phoneNumber, email, name, dob, monthlySalary, password } = req.body;

  try {
    const age = calculateAge(new Date(dob));
    if (age < 20) return res.status(400).json({ msg: 'Age of user must be above 20' });
    if (monthlySalary < 25000) return res.status(400).json({ msg: 'Monthly salary must be 25000 or more' });

    const userExists = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (userExists) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      phoneNumber,
      email,
      name,
      dob,
      monthlySalary,
      password: hashedPassword,
      status: 'Approved',
      purchasePower: monthlySalary * 0.5 
    });
    await newUser.save();
    res.status(201).json({ msg: 'User registered successfully' });

  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { userId: user._id };
    const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });
    res.json({ token });

  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
