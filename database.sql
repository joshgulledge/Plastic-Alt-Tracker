
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- database name is plastic_alt_tracker

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
     "authority" VARCHAR (80) NOT NULL DEFAULT 'USER'
);

CREATE TABLE "products" (
	"id" SERIAL PRIMARY KEY,
	"brand" VARCHAR (800) NOT NULL,
	"category" VARCHAR (800) NOT NULL,
	"image_url" VARCHAR (1000) NOT NULL,
	"website_link" VARCHAR (1000) NOT NULL,
	"description" VARCHAR (1040) NOT NULL,
	"asin_number" VARCHAR (800)
);

CREATE TABLE "product_user" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"product_id" INT REFERENCES "products",
	"user_preferences" INT DEFAULT 0,
	"reason" VARCHAR (1024) -- 1 for like, 2 for dislike
	);


-- basic data to start with
INSERT INTO "products"
("brand", "category", "image_url", "website_link", "description", "asin_number")
VALUES
('Plasticless', 'utensils', 'https://images-na.ssl-images-amazon.com/images/I/51hISROrY9L._AC_SL1051_.jpg', 'https://www.amazon.com/200-Pack-100-Plant-Based-Compostable-Straws/dp/B07MZLLDZD/ref=sr_1_2?crid=1XXTLH01HW855&dchild=1&keywords=non+plastic+straws&qid=1615848397&sprefix=non+plastic+stra%2Caps%2C201&sr=8-2', '200 Count 100% Plant-Based Compostable Straws - Plasticless Biodegradable Flexible Drinking Straws - A Fantastic Eco Friendly Alternative to Plastic Straws', 'B07MZLLDZD'),
('NextClimb', 'utensils', 'https://images-na.ssl-images-amazon.com/images/I/81JEipUwF3L._AC_SL1500_.jpg', 'https://www.amazon.com/NextClimb-WATERPROOF-Eco-Friendly-Biodegradable-Compostable/dp/B07ZCLVF6V/ref=sr_1_5?crid=1XXTLH01HW855&dchild=1&keywords=non+plastic+straws&qid=1615848847&sprefix=non+plastic+stra%2Caps%2C201&sr=8-5', 'Silver Paper Straws - WATERPROOF Paper Drinking Straws - Biodegradable Compostable Eco Friendly Disposable Plasticless Non Plastic Straw For Kids, Party, Wedding (100-Pack, Silver)', 'B07ZCLVF6V'),
('Efiwasi', 'utensils', 'https://images-na.ssl-images-amazon.com/images/I/71hTTklmIVL._AC_SL1500_.jpg', 'https://www.amazon.com/Biodegradable-Wheat-Drinking-Straws-Pack/dp/B084WKMKPT/ref=sr_1_7?crid=1XXTLH01HW855&dchild=1&keywords=non+plastic+straws&qid=1615848847&sprefix=non+plastic+stra%2Caps%2C201&sr=8-7', 'Efiwasi - Biodegradable Drinking Straws, Pack of 200 – Non-Soggy, Flavorless, BPA-Free, Compostable Straws Alternative to Plastic Straws – Sustainable Products by Efiwasi', 'B084WKMKPT');

