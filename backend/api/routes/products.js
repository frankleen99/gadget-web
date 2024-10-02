const express = require("express");
const router = express.Router();
const data = require("../db.json");

// Route handler for the root path ("/") to display all products
router.get("/", (req, res) => {
  res.status(200).json(data);
});


//Route to get products by ID
router.get("/:id", (req, res) => {
  const itemId = parseInt(req.params.id, 10); // Get the ID and convert to a number

  if (isNaN(itemId)) {
    // Check if itemId is a valid number
    return res
      .status(400)
      .json({ success: false, message: "Invalid ID format" });
  }
  const product = data.find((item) => item.id === itemId); // Find the product with the matching ID

  if (product) {
    res.status(200).json({ success: true, product });
  } else {
    res.status(404).json({ success: false, message: "Product not found" });
  }
});


// Route to get products by name
router.get("/name/:name", (req, res) => {
  const { name } = req.params;
  const productsByName = data.filter(
    (products) => products.name.toLowerCase() === name.toLowerCase()
  );
  res.json(productsByName);
});


// Route to get products by category
router.get("/category/:category", (req, res) => {
  const { category } = req.params;
  const productsByCategory = data.filter(
    (products) => products.category.toLowerCase() === category.toLowerCase()
  );
  res.json(productsByCategory);
});


//Route to get products by specific price
router.get("/price/:price", (req, res) => {
  const { price } = req.params; // Extract the price parameter from the URL
  const targetPrice = parseFloat(price); // Convert the price parameter to a number

  if (isNaN(targetPrice)) {
    // Check if targetPrice is a valid number
    return res
      .status(400)
      .json({ success: false, message: "Invalid price format" });
  }
  const parsePrice = (priceString) => {
    // Function to convert price strings to number
    return parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
  };

  const productsByPrice = data.filter(
    (product) => parsePrice(product.price) === targetPrice
  ); // Filter products with price

  if (productsByPrice.length === 0) {
    // If no products are found, return a 404 response
    return res
      .status(404)
      .json({
        success: false,
        message: `No products found at price: ${price}`,
      });
  }

  res.json({ success: true, products: productsByPrice }); // Respond with the filtered products
});

router.post("/", (req, res) => {
  res.status(201).json({
    message: "Handling POST req to /products",
  });
});

module.exports = router;
