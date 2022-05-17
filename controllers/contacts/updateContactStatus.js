const { Contact } = require('../../models')
const { NotFound } = require("http-errors")

const updateContactStatus = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { _id } = req.user;
  const result = await Contact.findByIdAndUpdate({ _id: contactId, owner: _id }, {favorite}, {new:true}).populate("owner", "_id email subscription");
  
  if (!result) {
     throw new NotFound(`Contact with id= ${contactId} not found`);
  }
  
  res.json({
    status: "success",
    code: 200,
    message: `Contact with id= ${contactId} update`,
    data: {
      result
    }
  })
}

module.exports = updateContactStatus;