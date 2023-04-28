-- MySQL dump 10.13  Distrib 8.0.32, for Linux (aarch64)
--
-- Host: localhost    Database: hbnb_dev_db
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `amenities`
--

DROP TABLE IF EXISTS `amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `amenities` (
  `name` varchar(128) NOT NULL,
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amenities`
--

LOCK TABLES `amenities` WRITE;
/*!40000 ALTER TABLE `amenities` DISABLE KEYS */;
INSERT INTO `amenities` VALUES ('24-hour check-in','ameni-01','2023-04-28 17:17:06','2023-04-28 17:17:06'),('Air conditioning','ameni-02','2023-04-28 17:17:06','2023-04-28 17:17:06'),('Breakfast','ameni-03','2023-04-28 17:17:06','2023-04-28 17:17:06'),('Parking','ameni-04','2023-04-28 17:17:06','2023-04-28 17:17:06'),('Swimming pool','ameni-05','2023-04-28 17:17:06','2023-04-28 17:17:06'),('Cable TV','ameni-06','2023-04-28 17:17:06','2023-04-28 17:17:06'),('Cat(s)','ameni-07','2023-04-28 17:17:06','2023-04-28 17:17:06'),('Dog(s)','ameni-08','2023-04-28 17:17:06','2023-04-28 17:17:06'),('Sea view','ameni-09','2023-04-28 17:17:06','2023-04-28 17:17:06'),('Jacuzzi','ameni-10','2023-04-28 17:17:06','2023-04-28 17:17:06'),('King size bed','ameni-11','2023-04-28 17:17:06','2023-04-28 17:17:06'),('Bar','ameni-12','2023-04-28 17:17:06','2023-04-28 17:17:06'),('Internet','ameni-13','2023-04-28 17:17:06','2023-04-28 17:17:06'),('Barbecue','ameni-14','2023-04-28 17:17:06','2023-04-28 17:17:06');
/*!40000 ALTER TABLE `amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `state_id` varchar(60) NOT NULL,
  `name` varchar(128) NOT NULL,
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `state_id` (`state_id`),
  CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES ('6f0df714-91c9-4155-901d-8c378b24a1c0','Los Angeles','california6f0df714-91c9-4155-901d-8c378b24a1c0','2023-04-28 17:19:06','2023-04-28 17:19:06'),('6f0df714-91c9-4155-901d-8c378b24a1c0','San Francisco','california6f0df714-91c9-4155-901d-8c378b24a1c1','2023-04-28 17:19:06','2023-04-28 17:19:06'),('6f0df714-91c9-4155-901d-8c378b24a1c0','Anaheim','california6f0df714-91c9-4155-901d-8c378b24a1c2','2023-04-28 17:19:06','2023-04-28 17:19:06'),('6f0df714-91c9-4155-901d-8c378b24a1c0','San José','california6f0df714-91c9-4155-901d-8c378b24a1c3','2023-04-28 17:19:06','2023-04-28 17:19:06'),('808851e1-dc6d-4d0e-aaa5-cc80195082b4','Miami','florida6f0df714-91c9-4155-901d-8c378b24a1c0','2023-04-28 17:19:06','2023-04-28 17:19:06'),('808851e1-dc6d-4d0e-aaa5-cc80195082b4','Orlando','florida6f0df714-91c9-4155-901d-8c378b24a1c1','2023-04-28 17:19:06','2023-04-28 17:19:06'),('808851e1-dc6d-4d0e-aaa5-cc80195082b4','Tampa','florida6f0df714-91c9-4155-901d-8c378b24a1c2','2023-04-28 17:19:06','2023-04-28 17:19:06'),('808851e1-dc6d-4d0e-aaa5-cc80195082b4','Cocoa Beach','florida6f0df714-91c9-4155-901d-8c378b24a1c3','2023-04-28 17:19:06','2023-04-28 17:19:06'),('eeb887e1-60c4-41e3-a066-77010ca9d504','Las Vegas','nevada6f0df714-91c9-4155-901d-8c378b24a1c0','2023-04-28 17:19:06','2023-04-28 17:19:06'),('eeb887e1-60c4-41e3-a066-77010ca9d504','Reno','nevada6f0df714-91c9-4155-901d-8c378b24a1c1','2023-04-28 17:19:06','2023-04-28 17:19:06'),('eeb887e1-60c4-41e3-a066-77010ca9d504','Henderson ','nevada6f0df714-91c9-4155-901d-8c378b24a1c2','2023-04-28 17:19:06','2023-04-28 17:19:06'),('eeb887e1-60c4-41e3-a066-77010ca9d504','Carson City ','nevada6f0df714-91c9-4155-901d-8c378b24a1c3','2023-04-28 17:19:06','2023-04-28 17:19:06'),('eeb887e1-60c4-41e3-a066-77010ca9d506','Houston','texas6f0df714-91c9-4155-901d-8c378b24a1c0','2023-04-28 17:19:06','2023-04-28 17:19:06'),('eeb887e1-60c4-41e3-a066-77010ca9d506','Austin','texas6f0df714-91c9-4155-901d-8c378b24a1c1','2023-04-28 17:19:06','2023-04-28 17:19:06'),('eeb887e1-60c4-41e3-a066-77010ca9d506','Dallas','texas6f0df714-91c9-4155-901d-8c378b24a1c2','2023-04-28 17:19:06','2023-04-28 17:19:06'),('eeb887e1-60c4-41e3-a066-77010ca9d506','San Antonio','texas6f0df714-91c9-4155-901d-8c378b24a1c3','2023-04-28 17:19:06','2023-04-28 17:19:06');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `place_amenity`
--

DROP TABLE IF EXISTS `place_amenity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `place_amenity` (
  `place_id` varchar(60) NOT NULL,
  `amenity_id` varchar(60) NOT NULL,
  PRIMARY KEY (`place_id`,`amenity_id`),
  KEY `amenity_id` (`amenity_id`),
  CONSTRAINT `place_amenity_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `place_amenity_ibfk_2` FOREIGN KEY (`amenity_id`) REFERENCES `amenities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `place_amenity`
--

LOCK TABLES `place_amenity` WRITE;
/*!40000 ALTER TABLE `place_amenity` DISABLE KEYS */;
INSERT INTO `place_amenity` VALUES ('places-03','ameni-01'),('places-05','ameni-01'),('places-01','ameni-02'),('places-03','ameni-02'),('places-04','ameni-02'),('places-02','ameni-03'),('places-04','ameni-04'),('places-05','ameni-04'),('places-06','ameni-04'),('places-05','ameni-05'),('places-06','ameni-05'),('places-02','ameni-06'),('places-04','ameni-06'),('places-05','ameni-06'),('places-06','ameni-07'),('places-06','ameni-08'),('places-01','ameni-09'),('places-03','ameni-09'),('places-02','ameni-10'),('places-05','ameni-10'),('places-06','ameni-10'),('places-01','ameni-11'),('places-03','ameni-11'),('places-04','ameni-11'),('places-03','ameni-12'),('places-05','ameni-12'),('places-01','ameni-13'),('places-05','ameni-13'),('places-06','ameni-13'),('places-02','ameni-14'),('places-04','ameni-14');
/*!40000 ALTER TABLE `place_amenity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `places`
--

DROP TABLE IF EXISTS `places`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `places` (
  `city_id` varchar(60) NOT NULL,
  `user_id` varchar(60) NOT NULL,
  `name` varchar(128) NOT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `number_rooms` int NOT NULL,
  `number_bathrooms` int NOT NULL,
  `max_guest` int NOT NULL,
  `price_by_night` int NOT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `city_id` (`city_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `places_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`),
  CONSTRAINT `places_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `places`
--

LOCK TABLES `places` WRITE;
/*!40000 ALTER TABLE `places` DISABLE KEYS */;
INSERT INTO `places` VALUES ('california6f0df714-91c9-4155-901d-8c378b24a1c0','user-01','Luxury apartment with sea view','A luxury apartment with a breathtaking view of the Pacific Ocean. The apartment has a fully equipped kitchen, a spacious bedroom with a king-size bed, a full bathroom and a large living room with a sofa bed for two additional people. The private terrace offers a panoramic view of the beach and the ocean, with sun loungers to relax and enjoy the sunset.',1,1,4,300,33.6846,-118.163,'places-01','2023-04-28 17:21:06','2023-04-28 17:21:06'),('nevada6f0df714-91c9-4155-901d-8c378b24a1c1','user-04','House with a mountains view','A beautiful holiday home with a breathtaking view of the mountains of the State of Nevada. The house has a large kitchen, three spacious bedrooms, two full bathrooms and a large living room with a fireplace. The well-maintained garden includes a barbecue, a relaxation area and a private swimming pool.',3,2,6,200,39.3042,-119.712,'places-02','2023-04-28 17:21:06','2023-04-28 17:21:06'),('florida6f0df714-91c9-4155-901d-8c378b24a1c0','user-02','Modern beach apartment','A modern and elegant beach apartment located in the trendy Miami Beach district. The apartment has a fully equipped open kitchen, a bedroom with a queen-size bed, a full bathroom and a bright living room with a sofa bed for two additional people. The private terrace offers stunning views of the Atlantic Ocean and the white sandy beaches of Miami Beach.',1,1,4,250,25.7907,-80.13,'places-03','2023-04-28 17:21:06','2023-04-28 17:21:06'),('texas6f0df714-91c9-4155-901d-8c378b24a1c0','user-05','Big House with swimming pool','A spacious and bright house located in a quiet area of Houston. The house has a large fully equipped kitchen, three comfortable bedrooms with queen-size beds, two full bathrooms and a large living room with a sofa bed for two additional people. The well-kept garden includes a private pool and a barbecue for moments of relaxation with family or friends.',3,2,8,350,29.7604,-95.3698,'places-04','2023-04-28 17:21:06','2023-04-28 17:21:06'),('florida6f0df714-91c9-4155-901d-8c378b24a1c1','user-03','Luxury villa with private water park','An exceptional luxury villa located in the chic Lake Nona district of Orlando. The villa has a fully equipped gourmet kitchen, five beautifully decorated bedrooms with king-size beds, six luxurious bathrooms, a large living room with panoramic views of the golf course and a private cinema room. The highlight of the villa is a private water park with slides, waterfalls and a pool for a unique swimming experience. Also enjoy the sunny terrace, the outdoor kitchen, the massage parlor and the private gym.',5,6,10,900,28.3936,-81.333,'places-05','2023-04-28 17:21:06','2023-04-28 17:21:06'),('california6f0df714-91c9-4155-901d-8c378b24a1c2','user-02','Comfortable studio close to Disneyland','We had a great stay in this studio in Anaheim! The location was perfect, a few minutes drive from Disneyland and many restaurants and shops. The studio was comfortable and clean, with a well-equipped kitchenette and a comfortable bed. We also enjoyed the pool and jacuzzi of the residence to relax. We highly recommend this place for a budget stay in Anaheim!',1,1,3,80,33.8353,-117.914,'places-06','2023-04-28 17:21:06','2023-04-28 17:21:06');
/*!40000 ALTER TABLE `places` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `place_id` varchar(60) NOT NULL,
  `user_id` varchar(60) NOT NULL,
  `text` varchar(1024) NOT NULL,
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `place_id` (`place_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES ('places-02','user-01','We had an incredible time in this luxury villa! The house was impeccably clean and beautifully decorated, with comfortable beds and great views of the mountains. The pool was also a real asset, with comfortable sun loungers and a breathtaking view of the city. We highly recommend this place for a luxury holiday in Las Vegas!','rev-01','2023-04-28 17:23:06','2023-04-28 17:23:06'),('places-03','user-03','We loved our stay in this Miami apartment! The location was perfect, a few steps from the beach and many restaurants and bars. The apartment was comfortable and well equipped, with everything we needed for a pleasant stay. The view of the ocean from the balcony was incredible! We highly recommend this place for a stay in Miami.','rev-02','2023-04-28 17:23:06','2023-04-28 17:23:06'),('places-04','user-02','We had a great stay in this house in Houston! The house was clean and spacious, with a large kitchen and a dining room to accommodate the whole family. We also enjoyed the large garden and the outdoor terrace to relax. The location was also convenient, with many shops and restaurants nearby. We highly recommend this house for a family stay in Houston.','rev-03','2023-04-28 17:23:06','2023-04-28 17:23:06'),('places-06','user-05','We loved our stay in this studio in Anaheim! The location was perfect, a few minutes drive from Disneyland and many restaurants and shops. The studio was comfortable and clean, with a well-equipped kitchenette and a comfortable bed. We also enjoyed the pool and jacuzzi of the residence to relax. We highly recommend this place for a budget stay in Anaheim!','rev-04','2023-04-28 17:23:06','2023-04-28 17:23:06'),('places-05','user-04','This luxury house in Orlando was incredible! We loved every minute of our stay. The house was clean, spacious and beautifully decorated, with comfortable beds and luxurious bathrooms. We also enjoyed the large swimming pool and the breathtaking view of the lake. The location was also convenient, a few minutes by car from all the theme parks in Orlando. We highly recommend this house for a luxury stay in Orlando!','rev-05','2023-04-28 17:23:06','2023-04-28 17:23:06'),('places-01','user-03','We had an incredible stay in this luxury apartment with sea view! The view was absolutely incredible, with breathtaking sunsets over the ocean. The apartment was spacious and well equipped, with a full kitchen and a large terrace to relax. The room was comfortable with a king-size bed and the bathroom was clean and modern. We highly recommend this place for a luxury stay at the beach!','rev-06','2023-04-28 17:23:06','2023-04-28 17:23:06');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `states` (
  `name` varchar(128) NOT NULL,
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES ('California','6f0df714-91c9-4155-901d-8c378b24a1c0','2023-04-28 11:57:12','2023-04-28 11:57:12'),('Florida','808851e1-dc6d-4d0e-aaa5-cc80195082b4','2023-04-28 11:58:32','2023-04-28 11:58:32'),('Nevada','eeb887e1-60c4-41e3-a066-77010ca9d504','2023-04-28 12:01:14','2023-04-28 12:01:14'),('Texas','eeb887e1-60c4-41e3-a066-77010ca9d506','2023-04-28 14:07:23','2023-04-28 14:07:23');
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `first_name` varchar(128) DEFAULT NULL,
  `last_name` varchar(128) DEFAULT NULL,
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('mkj@test.com','billie','Mickael','Jackson','user-01','2023-04-28 17:26:06','2023-04-28 17:26:06'),('caro@gmail.com','caro','Caroline','Chochoy','user-02','2023-04-28 17:26:06','2023-04-28 17:26:06'),('matt@aol.com','mat','Mathieu','Morel','user-03','2023-04-28 17:26:06','2023-04-28 17:26:06'),('billg@hotmail.fr','bill03','Bill','Gates','user-04','2023-04-28 17:26:06','2023-04-28 17:26:06'),('john@test.com','wars','John','Rambo','user-05','2023-04-28 17:26:06','2023-04-28 17:26:06');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-28 19:17:24
