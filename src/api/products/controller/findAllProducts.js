const findAll = async (req, res) => {
  // const data = await products.insertMany([])
  // console.log(data);
  const result = await products.find();
  console.log(result);
  res.send(result);
};

module.exports = findAll