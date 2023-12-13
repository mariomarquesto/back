const { Parents } = require("../config/db");

const createNewUserParent = async ({
  idDoc,
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
