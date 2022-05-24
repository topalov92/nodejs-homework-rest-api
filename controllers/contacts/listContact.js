const { Contact } = require('../../models')

const listContact = async (req, res) => {
  const { _id } = req.user;
   const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter = (favorite) => {
    if (!favorite) {
      return null;
    }
    return { favorite };
  };

  const result = await Contact.find({ owner: _id, ...filter(favorite) }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email subscription");
  
  res.json({
    status: "success",
    code: 200,
    data: {
      result
    }
  });
};

module.exports = listContact;