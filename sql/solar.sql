-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 05, 2021 at 05:27 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `solar`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `salt` char(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `batterypower`
--

CREATE TABLE `batterypower` (
  `id` int(11) NOT NULL,
  `configID` int(11) NOT NULL,
  `employeeID` int(11) NOT NULL,
  `customerID` int(11) NOT NULL,
  `watts` int(11) NOT NULL,
  `battEff` decimal(3,3) NOT NULL,
  `pdmEff` decimal(3,3) NOT NULL,
  `battCap` int(11) NOT NULL,
  `voltage` int(11) NOT NULL,
  `sunPower` int(11) NOT NULL,
  `dischargeSummer` varchar(1000) NOT NULL,
  `dischargeWinter` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `batterypower`
--

INSERT INTO `batterypower` (`id`, `configID`, `employeeID`, `customerID`, `watts`, `battEff`, `pdmEff`, `battCap`, `voltage`, `sunPower`, `dischargeSummer`, `dischargeWinter`) VALUES
(20, 21, 1, 6, 300, '0.850', '0.900', 250, 12, 1000, 'a:24:{i:0;s:5:\"12.10\";i:1;s:5:\"24.20\";i:2;s:5:\"36.30\";i:3;s:5:\"48.40\";i:4;s:5:\"41.21\";i:5;s:5:\"29.54\";i:6;s:5:\"12.65\";i:7;s:4:\"0.00\";i:8;s:4:\"0.00\";i:9;s:4:\"0.00\";i:10;s:4:\"0.00\";i:11;s:4:\"0.00\";i:12;s:4:\"0.00\";i:13;s:4:\"0.00\";i:14;s:4:\"0.00\";i:15;s:4:\"0.00\";i:16;s:4:\"0.00\";i:17;s:4:\"0.00\";i:18;s:4:\"0.00\";i:19;s:4:\"0.00\";i:20;s:4:\"0.00\";i:21;s:5:\"12.10\";i:22;s:5:\"24.20\";i:23;s:5:\"36.30\";}', 'a:24:{i:0;s:5:\"12.10\";i:1;s:5:\"24.20\";i:2;s:5:\"36.30\";i:3;s:5:\"48.40\";i:4;s:5:\"60.50\";i:5;s:5:\"72.60\";i:6;s:5:\"84.70\";i:7;s:5:\"96.80\";i:8;s:6:\"100.00\";i:9;s:5:\"90.21\";i:10;s:5:\"77.33\";i:11;s:5:\"62.68\";i:12;s:5:\"47.47\";i:13;s:5:\"32.82\";i:14;s:5:\"19.94\";i:15;s:5:\"10.15\";i:16;s:5:\"22.25\";i:17;s:5:\"34.35\";i:18;s:5:\"46.45\";i:19;s:5:\"58.55\";i:20;s:5:\"70.65\";i:21;s:5:\"82.75\";i:22;s:5:\"94.85\";i:23;s:6:\"100.00\";}'),
(21, 22, 1, 6, 300, '0.850', '0.900', 250, 12, 1000, 'a:24:{i:0;s:5:\"12.10\";i:1;s:5:\"24.20\";i:2;s:5:\"36.30\";i:3;s:5:\"48.40\";i:4;s:5:\"48.07\";i:5;s:5:\"42.89\";i:6;s:5:\"31.84\";i:7;s:5:\"15.50\";i:8;s:4:\"0.00\";i:9;s:4:\"0.00\";i:10;s:4:\"0.00\";i:11;s:4:\"0.00\";i:12;s:4:\"0.00\";i:13;s:4:\"0.00\";i:14;s:4:\"0.00\";i:15;s:4:\"0.00\";i:16;s:4:\"0.00\";i:17;s:4:\"0.00\";i:18;s:4:\"0.00\";i:19;s:4:\"0.00\";i:20;s:4:\"0.00\";i:21;s:5:\"12.10\";i:22;s:5:\"24.20\";i:23;s:5:\"36.30\";}', 'a:24:{i:0;s:5:\"12.10\";i:1;s:5:\"24.20\";i:2;s:5:\"36.30\";i:3;s:5:\"48.40\";i:4;s:5:\"60.50\";i:5;s:5:\"72.60\";i:6;s:5:\"84.70\";i:7;s:5:\"96.80\";i:8;s:6:\"100.00\";i:9;s:5:\"96.87\";i:10;s:5:\"90.34\";i:11;s:5:\"81.83\";i:12;s:5:\"72.68\";i:13;s:5:\"64.18\";i:14;s:5:\"57.65\";i:15;s:5:\"54.52\";i:16;s:5:\"66.62\";i:17;s:5:\"78.72\";i:18;s:5:\"90.82\";i:19;s:6:\"100.00\";i:20;s:6:\"100.00\";i:21;s:6:\"100.00\";i:22;s:6:\"100.00\";i:23;s:6:\"100.00\";}');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `fname` varchar(50) DEFAULT NULL,
  `lname` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(64) NOT NULL,
  `salt` char(128) NOT NULL,
  `postcode` varchar(8) NOT NULL,
  `budget` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `fname`, `lname`, `email`, `password`, `salt`, `postcode`, `budget`) VALUES
(6, 'Thomas', 'Breese', 'breese_thomas@yahoo.com', 'ac21df4c81f5907b69f3b9596f8343875455c8c1297795115f86cb30d179e3a4', 'ea1', 'SY2 5LY', 400),
(7, 'Peter', 'Ekwueme', 'ilovearsenal@gmail.com', 'd262d0575a91943e8e6242016853ebfabcf0b0da8ca6acb87183aa174c02c1b6', '7de', 'BS2 9QP', 60),
(8, 'Thomas', 'Breese', 'fierceclaws@hotmail.com', 'ca65e831dadc5e303c7a5c095cbd4518d788403a12c300e2a8a61bf58dee1151', 'dd2', 'SY2 5LY', 400);

-- --------------------------------------------------------

--
-- Table structure for table `powergeneration`
--

CREATE TABLE `powergeneration` (
  `id` int(11) NOT NULL,
  `configID` int(11) NOT NULL,
  `employeeID` int(11) NOT NULL,
  `customerID` int(11) NOT NULL,
  `roofAngle` int(3) NOT NULL,
  `solarEfficiency` decimal(3,3) NOT NULL,
  `temperature` int(3) NOT NULL,
  `roofArea` int(3) NOT NULL,
  `panelCost` float NOT NULL,
  `sunPower` int(4) NOT NULL,
  `elevationAngleSummer` int(3) NOT NULL,
  `elevationAngleWinter` int(3) NOT NULL,
  `panelPowerSummer` int(100) NOT NULL,
  `panelPowerWinter` int(100) NOT NULL,
  `installCost` float NOT NULL,
  `powerCostSummer` float NOT NULL,
  `powerCostWinter` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `powergeneration`
--

INSERT INTO `powergeneration` (`id`, `configID`, `employeeID`, `customerID`, `roofAngle`, `solarEfficiency`, `temperature`, `roofArea`, `panelCost`, `sunPower`, `elevationAngleSummer`, `elevationAngleWinter`, `panelPowerSummer`, `panelPowerWinter`, `installCost`, `powerCostSummer`, `powerCostWinter`) VALUES
(25, 20, 1, 6, 25, '0.150', 10, 10, 100, 1000, 85, 40, 1494, 964, 1000, 0.67, 1.04),
(26, 21, 1, 6, 25, '0.150', 14, 10, 100, 1000, 85, 40, 1494, 964, 1000, 0.67, 1.04),
(27, 22, 1, 6, 15, '0.150', 15, 10, 120, 1000, 75, 30, 1449, 750, 1200, 0.83, 1.6);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `batterypower`
--
ALTER TABLE `batterypower`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `powergeneration`
--
ALTER TABLE `powergeneration`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `batterypower`
--
ALTER TABLE `batterypower`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `powergeneration`
--
ALTER TABLE `powergeneration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
