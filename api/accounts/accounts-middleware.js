const Account = require("./accounts-model");
const db = require("../../data/db-config");
exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  // console.log("checkAccountPayload  middleware!!!")
  // next()
  const err = { status: 400 };
  const { name, budget } = req.body;
  try {
    if (name === undefined || budget === undefined) {
      err.message = "name and budget are required";
      next(err);
    } else if (typeof name !== "string") {
      err.message = "name of account must be a string";
      next(err);
    } else if (name.trim().length < 3 || name.trim().length > 100) {
      err.message = "name of account must be between 3 and 100";
      next(err);
    } else if (typeof budget !== "number") {
      err.message = "budget of account must be a number";
      next(err);
    } else if (budget < 0 || budget > 1000000) {
      err.message = "budget of account is too large or too small";
      next(err);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  // console.log("checkAccountNameUnique  middleware!!!")
  // next()
  try {
    const existName = await db("accounts")
      .where({ name: req.body.name.trim() })
      .first();
    if (!existName) {
      res.status(400).json({ message: "that name is taken" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  // console.log("checkAccountId  middleware!!!")
  // next()
  try {
    const account = await Account.getById(req.params.id);
    if (!account) {
      res.status(404).json({ message: "account not found" });
    } else {
      req.account = account;
      next();
    }
  } catch (err) {
    next(err);
  }
};
