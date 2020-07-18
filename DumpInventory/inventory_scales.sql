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
-- Table structure for table `scales`
--

DROP TABLE IF EXISTS `scales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scales` (
  `scaleId` int NOT NULL AUTO_INCREMENT,
  `companyId` int NOT NULL,
  `clientId` int NOT NULL,
  `scaleName` varchar(20) NOT NULL,
  `scaleLocation` varchar(80) DEFAULT NULL,
  `warningThresholdWt` double DEFAULT '-0.5',
  `capacity` double DEFAULT '44',
  `binSize` varchar(45) DEFAULT NULL,
  `isTarePending` tinyint unsigned NOT NULL DEFAULT '0',
  `deadScaleEmailSent` tinyint(1) NOT NULL DEFAULT '0',
  `overloadedScaleEmailSent` tinyint unsigned NOT NULL DEFAULT '0',
  `routerAddress` varchar(50) DEFAULT NULL,
  `routerPortNumber` int DEFAULT NULL,
  `alertLevel` int NOT NULL DEFAULT '0',
  `alertEmailSentAtUTC` datetime DEFAULT NULL,
  `emailSentForLevel` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`scaleId`),
  UNIQUE KEY `idx_unique_port` (`scaleName`,`routerAddress`,`routerPortNumber`),
  KEY `id` (`scaleId`),
  KEY `FK_scales_1` (`companyId`),
  KEY `FK_scales_2` (`clientId`),
  CONSTRAINT `FK_scales_1` FOREIGN KEY (`companyId`) REFERENCES `companies` (`companyId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_scales_2` FOREIGN KEY (`clientId`) REFERENCES `clients` (`clientId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scales`
--

LOCK TABLES `scales` WRITE;
/*!40000 ALTER TABLE `scales` DISABLE KEYS */;
INSERT INTO `scales` VALUES (1,1,1,'Rpi-Test','Location 1',-0.5,1000,NULL,0,0,0,NULL,NULL,0,NULL,0);
/*!40000 ALTER TABLE `scales` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-18 17:00:12
