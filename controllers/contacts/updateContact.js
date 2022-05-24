const { Contact } = require('../../models')
const { NotFound } = require("http-errors")

const updateContact = async (req, res) => {
  const { contactId } = req.params;
   const { _id } = req.user;
  
  const result = await Contact.findByIdAndUpdate({ _id: contactId, owner: _id }, req.body, {new:true})
  
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

module.exports = updateContact;