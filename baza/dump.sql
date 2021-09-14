-- MariaDB dump 10.19  Distrib 10.6.4-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: web_ispit_baza
-- ------------------------------------------------------
-- Server version	10.6.4-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `web_ispit_baza`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `web_ispit_baza` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `web_ispit_baza`;

--
-- Table structure for table `anketa`
--

DROP TABLE IF EXISTS `anketa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `anketa` (
  `korisnicki_id` int(11) NOT NULL,
  `pol` enum('muski','zenski','drugo') DEFAULT NULL,
  `uzrast` tinytext DEFAULT NULL,
  `visina` float DEFAULT NULL,
  `telesna_masa` float DEFAULT NULL,
  `obim_struka` float DEFAULT NULL,
  `kcal` int(11) DEFAULT NULL,
  `opis_dnevnih_navika` text DEFAULT NULL,
  `opis_zeljenih_rezultata` text DEFAULT NULL,
  PRIMARY KEY (`korisnicki_id`),
  CONSTRAINT `anketa_ibfk_1` FOREIGN KEY (`korisnicki_id`) REFERENCES `osoba` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anketa`
--

LOCK TABLES `anketa` WRITE;
/*!40000 ALTER TABLE `anketa` DISABLE KEYS */;
INSERT INTO `anketa` VALUES (1,'muski','dete',167,55.2,80,1800,'najpre cokolada onda krompir i u krug','vise cokolade, manje krompira');
/*!40000 ALTER TABLE `anketa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `osoba`
--

DROP TABLE IF EXISTS `osoba`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `osoba` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tip` enum('korisnik','trener','nutricionista') DEFAULT NULL,
  `ime` tinytext DEFAULT NULL,
  `prezime` tinytext DEFAULT NULL,
  `email` tinytext DEFAULT NULL,
  `telefon` tinytext DEFAULT NULL,
  `lozinka` tinytext DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`) USING HASH,
  UNIQUE KEY `telefon` (`telefon`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `osoba`
--

LOCK TABLES `osoba` WRITE;
/*!40000 ALTER TABLE `osoba` DISABLE KEYS */;
INSERT INTO `osoba` VALUES (1,'korisnik','djosa','dodjos','djosa@teretana.com','061','test'),(2,'trener','misa','misic','misko@teretana.com','062','test'),(3,'nutricionista','nutri','bulet','nutri@teretana.com','063','test');
/*!40000 ALTER TABLE `osoba` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `predlog`
--

DROP TABLE IF EXISTS `predlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `predlog` (
  `korisnicki_id` int(11) NOT NULL,
  `specialista_id` int(11) NOT NULL,
  `predlog` text DEFAULT NULL,
  PRIMARY KEY (`korisnicki_id`,`specialista_id`),
  KEY `specialista_id` (`specialista_id`),
  CONSTRAINT `predlog_ibfk_1` FOREIGN KEY (`korisnicki_id`) REFERENCES `osoba` (`id`) ON DELETE CASCADE,
  CONSTRAINT `predlog_ibfk_2` FOREIGN KEY (`specialista_id`) REFERENCES `osoba` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `predlog`
--

LOCK TABLES `predlog` WRITE;
/*!40000 ALTER TABLE `predlog` DISABLE KEYS */;
INSERT INTO `predlog` VALUES (1,2,'samo zgibovi i propadanja!'),(1,3,'jabuke plase doktore');
/*!40000 ALTER TABLE `predlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redovna_obavestavanja`
--

DROP TABLE IF EXISTS `redovna_obavestavanja`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redovna_obavestavanja` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `korisnicki_id` int(11) DEFAULT NULL,
  `telesna_masa` float DEFAULT NULL,
  `obim_struka` float DEFAULT NULL,
  `kcal` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `korisnicki_id` (`korisnicki_id`),
  CONSTRAINT `redovna_obavestavanja_ibfk_1` FOREIGN KEY (`korisnicki_id`) REFERENCES `osoba` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redovna_obavestavanja`
--

LOCK TABLES `redovna_obavestavanja` WRITE;
/*!40000 ALTER TABLE `redovna_obavestavanja` DISABLE KEYS */;
INSERT INTO `redovna_obavestavanja` VALUES (1,1,56,82,NULL),(2,1,58,85,1400),(3,1,56,81,NULL),(4,1,57,88,1600);
/*!40000 ALTER TABLE `redovna_obavestavanja` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-13 21:20:57
