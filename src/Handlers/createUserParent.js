const {
  createNewUserParent,
} = require("../controllers/createParentsController");

const newParentHandler = async (req, res) => {
  const {
    idDoc,
    fotoDocumento,
    name,
    lastName,
    educationLevel,
    profession,
    address,
    jobAddress,
    telephone,
    jobTelephone,
    contactCellphone,
    email,
    tutor,
  } = req.body;

  try {
    const newUserParent = await createNewUserParent({
      idDoc,
      fotoDocumento,
      name,
      lastName,
      educationLevel,
      profession,
      address,
      jobAddress,
      telephone,
      jobTelephone,
      contactCellphone,
      email,
      tutor,
    });
    res.status(200).json(newUserParent);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  newParentHandler,
};
