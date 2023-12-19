const { Parents } = require("../config/db");

const createNewUserParent = async ({
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
}) => {
  const newUserParent = await Parents.create({
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

  return newUserParent;
};

module.exports = {
  createNewUserParent,
};
