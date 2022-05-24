const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const avatar = async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  try {
    const realAvatar = await Jimp.read(tmpUpload);
    await realAvatar.resize(250, 250).writeAsync(tmpUpload);

    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL }, { new: true });
    res.json({
      status: "success",
      code: 200,
      message: `Avatar updated`,
      data: {
        user: {
          avatarURL,
        },
      },
    });
  } catch (error) {
    await fs.unlink(tmpUpload);
    throw error;
  }
};

module.exports = avatar;