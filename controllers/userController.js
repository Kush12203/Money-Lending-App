const User = require('../models/user');

// Get user data
exports.getUserData = async (req, res) => {
  try {
    // Find user by ID and exclude the password field
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Borrow money
exports.borrowMoney = async (req, res) => {
  const { amount, tenure } = req.body; // tenure in months
  try {
    // Find user by ID
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const newPurchasePower = user.purchasePower - amount; // Calculate new purchase power
    const interestRate = 0.08;
    const monthlyRepayment = (amount + (amount * interestRate)) / tenure;

    // Update user's purchase power
    user.purchasePower = newPurchasePower;
    await user.save();
    
    // Return the new purchase power and monthly repayment amount
    res.json({ 
      newPurchasePower, 
      monthlyRepayment 
    });

  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
