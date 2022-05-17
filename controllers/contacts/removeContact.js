const { Contact } = require('../../models')
const { NotFound } = require("http-errors");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  
   const result = await Contact.findOneAndRemove({ _id: contactId, owner: _id });
  
  if (!result) {
     throw new NotFound(`Contact with id= ${contactId} not found`);
  }
  
  res.json({
    status: "success",
    code: 200,
    message: `Contact with id= ${contactId} deleted`,
    data: {
      result
    }
  })
}

module.exports = removeContact;