module.exports = (req, res) => {
  const code = Math.floor(10000000 + Math.random() * 90000000);

  res.status(200).json({
    status: "success",
    code: code.toString()
  });
};
