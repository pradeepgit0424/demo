-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: inventory
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `parts`
--

DROP TABLE IF EXISTS `parts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parts` (
  `partId` int NOT NULL AUTO_INCREMENT,
  `companyId` int NOT NULL,
  `sku` varchar(50) NOT NULL,
  `customerSKU` varchar(50) DEFAULT NULL,
  `mfgSKU` varchar(50) DEFAULT NULL,
  `partNo` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `maxQty` double DEFAULT '10',
  `minQty` double DEFAULT '5',
  `criticalQty` double DEFAULT '1',
  `packageQty` double NOT NULL DEFAULT '1',
  `unitWt` double DEFAULT '1',
  `unitOfMeasure` varchar(45) DEFAULT 'count',
  `unitCP` double DEFAULT '1',
  `unitSP` double DEFAULT '1',
  `unitCost` double DEFAULT NULL,
  `notes` varchar(1024) DEFAULT NULL,
  `imageFileName` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`partId`),
  UNIQUE KEY `sku` (`companyId`,`sku`),
  UNIQUE KEY `companyId` (`companyId`,`partNo`),
  KEY `id` (`partId`),
  KEY `FK_parts_unitDescr` (`unitOfMeasure`),
  CONSTRAINT `parts_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `companies` (`companyId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `parts_ibfk_2` FOREIGN KEY (`unitOfMeasure`) REFERENCES `unitsofmeasure` (`unitOfMeasure`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parts`
--

LOCK TABLES `parts` WRITE;
/*!40000 ALTER TABLE `parts` DISABLE KEYS */;
INSERT INTO `parts` VALUES (1,1,'47754342','47754342','47754342','SKU-01','LATCH, DK GY',50,10,5,1,2.225,'count',1,2,NULL,'',NULL),(2,1,'Test','Test','Test',NULL,'Test Part for Demo',100,10,5,1,0.5,'count',0.1,0.25,NULL,'','');
/*!40000 ALTER TABLE `parts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-18 17:00:13
