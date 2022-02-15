const router = require("express").Router();
const mw = require("./accounts-middleware");
const Account = require("./accounts-model");

router.get("/", async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    // res.json({ message: "[GET] accounts" });
    const account = await Account.getAll()
    res.json(account)
  } catch (err) {
    next(err);
  }
});

router.get("/:id", mw.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  try {
    // res.json({ message: "[GET] account by id" });
    res.json(req.account)
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  mw.checkAccountPayload,
  mw.checkAccountNameUnique,
  async (req, res, next) => {
    // DO YOUR MAGIC
    try {
      // res.json({ message: "[POST] account" });
      const account = await Account.create({
        name: req.body.name.trim(),
        budget: req.body.budget
      })
      res.status(201).json(account)
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  mw.checkAccountId,
  mw.checkAccountPayload,
  mw.checkAccountNameUnique,
  async (req, res, next) => {
    // DO YOUR MAGIC
    try {
      // res.json({ message: "[PUT] account by id" });
      const account = await Account.updateById(req.params.id, req.body)
      res.json(account)
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", mw.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    // res.json({ message: "[DELETE] account by id" });
    const account = await Account.deleteById(req.params.id)
    res.json(req.account)
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
