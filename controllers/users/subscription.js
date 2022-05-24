const { User } = require("../../models");
const { NotFound } = require("http-errors");

const subscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  if (!result) {
    throw new NotFound(`User not found`);
  }

  res.json({
    status: "success",
    code: 200,
    message: `Subscription update`,
    data: {
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    },
  });
};

module.exports = subscription;