const newParentValidation = (req, res, next) => {
  const {
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
  } = req.body;

  const missingFields = [];

  if (!idDoc) {
    missingFields.push("ID Document");
  }
  if (!name) {
    missingFields.push("First Name");
  }
  if (!lastName) {
    missingFields.push("Last Name");
  }
  if (!educationLevel) {
    missingFields.push("Education Level");
  }
  if (!profession) {
    missingFields.push("Profession");
  }
  if (!address) {
    missingFields.push("Address");
  }
  if (!jobAddress) {
    missingFields.push("Job Address");
  }
  if (!telephone) {
    missingFields.push("Home Telephone");
  }
  if (!jobTelephone) {
    missingFields.push("Work Telephone");
  }
  if (!contactCellphone) {
    missingFields.push("Contact Cell Phone");
  }
  if (!email) {
    missingFields.push("Email");
  }

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: `Missing fields: ${missingFields.join(", ")}`,
    });
  }
  next();
};

module.exports = {
  newParentValidation,
};
