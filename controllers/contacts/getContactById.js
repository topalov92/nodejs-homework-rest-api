const { Contact } = require('../../models')
const { NotFound } = require("http-errors");

const getContactById = async (req, res) => {
    const { contactId } = req.params;
     const { _id } = req.user;
    const result = await Contact.findOne({
    _id: contactId,
    owner: _id,
    }).populate("owner", "_id email subscription");
    
    if (!result) {
        throw new NotFound(`Contact with id= ${contactId} not found`);
       
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
}

module.exports = getContactById;