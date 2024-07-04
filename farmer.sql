-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 04, 2024 at 11:41 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `farmer`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `iBlogId` int(11) NOT NULL,
  `vTitle` varchar(255) NOT NULL,
  `vDescription` varchar(500) NOT NULL,
  `vImage` varchar(255) NOT NULL,
  `dtAddedDate` datetime NOT NULL DEFAULT current_timestamp(),
  `dtUpdatedDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`iBlogId`, `vTitle`, `vDescription`, `vImage`, `dtAddedDate`, `dtUpdatedDate`) VALUES
(9, 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)', 'Under PM-KISAN, eligible farmers receive direct income support of ₹6,000 per year in three equal installments. The scheme aims to ensure financial support to farmers for their cultivation needs and livelihood security. The funds are directly transferred to the bank accounts of the beneficiaries. http://pmkisan.gov.in/', '1711738089190.jpeg', '2024-03-30 00:21:19', '2024-03-30 00:21:19'),
(10, 'Pradhan Mantri Fasal Bima Yojana (PMFBY)', 'PMFBY provides comprehensive coverage against crop failure due to natural calamities, pests, and diseases. Farmers pay a nominal premium, with the remaining premium shared equally by the central and state governments. The scheme encourages farmers to adopt modern agricultural practices and ensures their financial stability. http://agricoop.nic.in/pmfby', '1711769375950.png', '2024-03-30 09:01:54', '2024-03-30 09:01:54'),
(11, 'Kisan Credit Card (KCC) Scheme', 'KCC provides farmers with access to affordable credit for agricultural and allied activities. It simplifies the loan application process and enables timely availability of credit to farmers. Farmers can use the card to meet their agricultural expenses, including the purchase of seeds, fertilizers, and machinery. https://www.pmkisan.gov.in/KCC/', '1711769486778.jpeg', '2024-03-30 09:01:26', '2024-03-30 09:01:26'),
(12, 'Soil Health Card Scheme (SHC)', 'HC provides soil health cards to farmers, containing information about the nutrient status of their soil and recommendations for appropriate fertilizers. The scheme aims to promote balanced and sustainable use of fertilizers, leading to improved soil fertility and higher crop yields. Soil health cards are issued every 2-3 years to all farmers. https://soilhealth.dac.gov.in/', '1711769573024.jpeg', '2024-03-30 09:03:27', '2024-03-30 09:03:27'),
(13, 'National Agriculture Market (eNAM)', 'eNAM is an online trading platform that facilitates transparent and competitive trading of agricultural commodities. It integrates existing APMC mandis across different states, enabling farmers to access a larger market and get better prices for their produce. The platform provides real-time information on prices, arrivals, and quality of agricultural commodities. https://enam.gov.in/web/', '1711769684507.jpeg', '2024-03-30 09:04:44', '2024-03-30 09:04:44'),
(14, 'Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)', 'PMKSY aims to improve farm productivity by ensuring the efficient use of water resources through various irrigation schemes. It includes the development of water storage and distribution infrastructure, promotion of micro-irrigation, and watershed management. The scheme focuses on achieving \"Per Drop More Crop\" by enhancing water use efficiency in agriculture. http://pmksy.gov.in/', '1711769784884.jpeg', '2024-03-30 09:06:24', '2024-03-30 09:06:24'),
(15, 'Rashtriya Krishi Vikas Yojana (RKVY)', 'RKVY provides financial assistance to states and Union Territories for implementing projects aimed at increasing agricultural productivity and income. It supports activities such as the development of agriculture infrastructure, research and extension services, and capacity building of farmers. The scheme encourages states to formulate and implement their agriculture development plans. http://rkvy.nic.in/', '1711769848511.jpeg', '2024-03-30 09:07:28', '2024-03-30 09:07:28');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `iCartId` int(11) NOT NULL,
  `iUserId` int(11) NOT NULL,
  `iProductId` int(11) NOT NULL,
  `iMonth` int(11) NOT NULL,
  `dtAddedDate` datetime NOT NULL DEFAULT current_timestamp(),
  `dtUpdatedDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`iCartId`, `iUserId`, `iProductId`, `iMonth`, `dtAddedDate`, `dtUpdatedDate`) VALUES
(2, 1, 3, 0, '2024-03-17 00:22:29', '2024-03-17 00:23:01'),
(11, 5, 13, 0, '2024-03-17 13:04:20', '2024-03-17 13:04:20'),
(24, 4, 15, 1, '2024-03-29 22:27:42', '2024-03-29 22:27:42'),
(32, 7, 35, 2, '2024-03-30 21:59:52', '2024-03-30 21:59:52'),
(34, 9, 34, 3, '2024-04-01 11:50:53', '2024-04-01 11:50:53'),
(38, 6, 33, 2, '2024-07-04 14:36:19', '2024-07-04 14:36:19');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `iOrderId` int(11) NOT NULL,
  `iProductId` int(11) DEFAULT NULL,
  `transactionId` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `validTill` datetime DEFAULT NULL,
  `iUserId` int(11) DEFAULT NULL,
  `deliveryStatus` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`iOrderId`, `iProductId`, `transactionId`, `amount`, `validTill`, `iUserId`, `deliveryStatus`) VALUES
(1, NULL, NULL, 1200000, NULL, NULL, NULL),
(2, NULL, 'pi_3P2gnJSBeWSyq0I00y6rddZC', 72000, '2024-03-30 00:09:04', NULL, NULL),
(3, NULL, 'pi_3P2gnJSBeWSyq0I00y6rddZC', 72000, NULL, NULL, NULL),
(4, NULL, 'pi_3P2gqGSBeWSyq0I01KSFcRWn', 72000, '2024-03-30 00:09:04', NULL, NULL),
(5, NULL, 'pi_3P2gqGSBeWSyq0I01KSFcRWn', 72000, NULL, NULL, NULL),
(6, NULL, 'pi_3P2gs0SBeWSyq0I00OaFTYlw', 72000, '2024-03-30 00:09:04', NULL, NULL),
(7, 24, 'pi_3P2hD1SBeWSyq0I01Dlsvdlj', 72000, '2024-03-30 00:09:04', NULL, NULL),
(8, 24, 'pi_3P2hFdSBeWSyq0I00T5m2tx7', 72000, '2024-03-30 00:09:04', NULL, NULL),
(9, 24, 'pi_3P2hMfSBeWSyq0I00aX5dO8D', 72000, '2024-03-30 00:09:04', 6, 'Not Delivered'),
(10, 24, 'pi_3P2hOFSBeWSyq0I01pZnvipb', 72000, '2024-03-30 00:09:04', 6, 'Not Delivered'),
(11, 24, 'pi_3P2hU9SBeWSyq0I00iKaqSov', 72000, '2024-03-30 00:09:04', 6, 'Not Delivered'),
(12, 25, 'pi_3P2mPUSBeWSyq0I01px1jvHp', 8000, '2024-03-30 00:09:04', 6, 'Not Delivered'),
(13, 37, 'pi_3P2n2rSBeWSyq0I007ZxXFBY', 48000, '2024-03-30 00:09:04', 6, 'Not Delivered'),
(14, 37, 'pi_3PYl7BSBeWSyq0I01FlZBTU5', 48000, '2024-03-30 00:09:04', 6, 'Not Delivered'),
(15, 37, 'pi_3PYl80SBeWSyq0I00s43zRNZ', 48000, '2024-03-30 00:09:04', 6, 'Not Delivered'),
(16, 33, 'pi_3PYlhuSBeWSyq0I00lp9w6pR', 10000, '2024-03-30 00:09:04', 6, 'Not Delivered');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `iProductId` int(11) NOT NULL,
  `iUserId` int(11) NOT NULL,
  `vName` varchar(255) DEFAULT NULL,
  `vDescription` varchar(255) DEFAULT NULL,
  `vPrice` varchar(255) NOT NULL,
  `eType` enum('largeTools','Tractorattachments','smallTools','lands') NOT NULL,
  `vImage` varchar(255) NOT NULL,
  `eSold` enum('Rented','UnRented') NOT NULL,
  `vAddress` varchar(255) DEFAULT NULL,
  `dtAddedDate` datetime NOT NULL DEFAULT current_timestamp(),
  `dtUpdatedDate` datetime NOT NULL DEFAULT current_timestamp(),
  `manufacturer` varchar(255) DEFAULT NULL,
  `availableDuration` date DEFAULT NULL,
  `ageOfEquipment` int(11) DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `soilType` varchar(255) DEFAULT NULL,
  `electricitySupply` tinyint(1) DEFAULT NULL,
  `availability` int(11) DEFAULT NULL,
  `waterSupply` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`iProductId`, `iUserId`, `vName`, `vDescription`, `vPrice`, `eType`, `vImage`, `eSold`, `vAddress`, `dtAddedDate`, `dtUpdatedDate`, `manufacturer`, `availableDuration`, `ageOfEquipment`, `area`, `soilType`, `electricitySupply`, `availability`, `waterSupply`) VALUES
(20, 6, 'Axe', 'Oblivion Gardening Tools Hatchet Axe Fiberglass Body Rubberized Handle Wood Cutting Axe, Camping Axe, Safety Axe, Pick Axe.', '200', 'smallTools', '1711737544334.jpeg', 'UnRented', NULL, '2024-03-30 00:09:04', '2024-03-30 00:09:04', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(21, 6, NULL, NULL, '20000', 'lands', '1711737880802.jpeg', 'UnRented', '19, Civil Line, Haridwar Road, National Highway 58', '2024-03-30 00:14:40', '2024-03-30 00:14:40', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(22, 6, 'Disc Plough', 'The disc plough is designed to work in all types of soil for functions such as soil breaking, soil raising, soil turning and soil mixing.', '4000', 'Tractorattachments', '1711767980094.webp', 'UnRented', NULL, '2024-03-30 08:36:20', '2024-03-30 08:36:20', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(23, 6, NULL, NULL, '15000', 'lands', '1711768169043.jpeg', 'UnRented', 'New Lashkar Line, opposite new bridge, Bairhana, Prayagraj, Uttar Pradesh 211003, India.', '2024-03-30 08:39:29', '2024-03-30 08:39:29', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(24, 6, NULL, NULL, '12000', 'lands', '1711768305718.webp', 'UnRented', 'Shri Bhuvan, 120 Feet Ring Road Sarvottam Nagar Society Memnagar, Navrangpura, Ahmedabad, Gujarat 380009, India.', '2024-03-30 08:41:45', '2024-03-30 08:41:45', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(25, 6, 'Harvester', 'Made up of about 21 parts including the header, reel, cutter bar, sieves, rotating blades, can be used to harvest, winnow and thresh crops.', '8000', 'largeTools', '1711768465963.jpeg', 'UnRented', NULL, '2024-03-30 08:44:25', '2024-03-30 08:44:25', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(27, 7, 'Air seeder', 'An air seeder is a machine that helps agricultural producers who are looking to make seeding quicker and more efficient. This heavy-duty machine was created in order to eliminate the need to till the soil before seeding.', '10000', 'largeTools', '1711768735221.jpeg', 'UnRented', NULL, '2024-03-30 08:48:55', '2024-03-30 08:48:55', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(28, 7, 'Disc harrows', 'A disc harrow is a harrow whose cutting edges are a row of concave metal discs, which may be scalloped or set at an oblique angle. It is an agricultural implement equipment.', '4000', 'Tractorattachments', '1711768819735.jpeg', 'UnRented', NULL, '2024-03-30 08:50:19', '2024-03-30 08:50:19', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(29, 7, NULL, NULL, '15000', 'lands', '1711768928002.jpeg', 'UnRented', 'Rajiv path, Moon City, B8F2E, Dimna Rd, Mango, Jamshedpur, Jharkhand 831012, India.', '2024-03-30 08:52:08', '2024-03-30 08:52:08', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(30, 7, NULL, NULL, '10000', 'lands', '1711768999025.jpeg', 'UnRented', 'Trinity Complex, N.G. Road, Attavar, Mangalore, Karnataka 575004, India.', '2024-03-30 08:53:19', '2024-03-30 08:53:19', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(31, 7, NULL, NULL, '22000', 'lands', '1711769126185.jpeg', 'UnRented', 'Near Chalakuzhy Road, Lekshmi Nagar, Pattom, Thiruvananthapuram, Kerala 695004, India.', '2024-03-30 08:55:26', '2024-03-30 08:55:26', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(33, 8, 'plough', 'A plow or plough is a tool or machine used for several jobs, including farming and snow removal. It is pushed or pulled across the ground.', '5000', 'Tractorattachments', '1711770119366.jpeg', 'Rented', NULL, '2024-03-30 09:11:59', '2024-03-30 09:11:59', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(34, 8, 'Thresher', 'A threshing machine or a thresher is a piece of farm equipment that separates grain seed from the stalks and husks.', '5000', 'largeTools', '1711770182011.jpeg', 'Rented', NULL, '2024-03-30 09:13:02', '2024-03-30 09:13:02', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(35, 8, 'Water Pump', 'fuel operated water pump machine include diesel, petrol, kerosene, and electrically operated water pump machines.', '6000', 'smallTools', '1711770324243.webp', 'Rented', NULL, '2024-03-30 09:15:24', '2024-03-30 09:15:24', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(36, 8, NULL, NULL, '22000', 'lands', '1711770408227.jpeg', 'UnRented', 'Gulbarga Fort, Khuba Plot, Brhampur, Gulbarga, Karnataka 585102, India.', '2024-03-30 09:16:48', '2024-03-30 09:16:48', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(37, 8, NULL, NULL, '16000', 'lands', '1711770468696.jpeg', 'UnRented', 'Bariatu Rd, Morabadi, Ranchi, Jharkhand 834009, India.', '2024-03-30 09:17:48', '2024-03-30 09:17:48', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(38, 8, NULL, NULL, '25000', 'lands', '1711770948453.jpeg', 'UnRented', 'Circular Rd, behind parijat, New Nagra Toli, Nagra Toli, Ranchi, Jharkhand 834001, India.', '2024-03-30 09:25:48', '2024-03-30 09:25:48', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(41, 9, NULL, NULL, '12000', 'lands', '1711952240441.webp', 'UnRented', '3434/433aiufnufs', '2024-04-01 11:47:20', '2024-04-01 11:47:20', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `iTransactionId` int(11) NOT NULL,
  `transactionId` varchar(255) DEFAULT NULL,
  `sender` int(11) DEFAULT NULL,
  `receiver` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`iTransactionId`, `transactionId`, `sender`, `receiver`, `amount`, `status`) VALUES
(1, 'pi_3P2gs0SBeWSyq0I00OaFTYlw', 6, 6, 72000, 'succeeded'),
(2, 'pi_3P2hD1SBeWSyq0I01Dlsvdlj', 6, 6, 72000, NULL),
(3, 'pi_3P2hFdSBeWSyq0I00T5m2tx7', 6, 6, 72000, 'succeeded'),
(4, 'pi_3P2hMfSBeWSyq0I00aX5dO8D', 6, 6, 72000, 'succeeded'),
(5, 'pi_3P2hOFSBeWSyq0I01pZnvipb', 6, 6, 72000, 'succeeded'),
(6, 'pi_3P2hU9SBeWSyq0I00iKaqSov', 6, 6, 72000, 'succeeded'),
(7, 'pi_3P2mPUSBeWSyq0I01px1jvHp', 6, 6, 8000, 'succeeded'),
(8, 'pi_3P2n2rSBeWSyq0I007ZxXFBY', 6, 6, 48000, 'succeeded'),
(9, 'pi_3PYl7BSBeWSyq0I01FlZBTU5', 6, 6, 48000, 'succeeded'),
(10, 'pi_3PYl80SBeWSyq0I00s43zRNZ', 6, 6, 48000, 'succeeded'),
(11, 'pi_3PYlhuSBeWSyq0I00lp9w6pR', 6, 6, 10000, 'succeeded');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `iUserId` int(11) NOT NULL,
  `vUniqueId` varchar(255) NOT NULL,
  `vSlug` varchar(255) NOT NULL,
  `vFirstName` varchar(255) NOT NULL,
  `vLastName` varchar(255) NOT NULL,
  `vEmail` varchar(255) NOT NULL,
  `vPassword` varchar(255) NOT NULL,
  `vPhone` varchar(255) NOT NULL,
  `vAuthCode` varchar(255) NOT NULL,
  `dtAddedDate` datetime NOT NULL DEFAULT current_timestamp(),
  `dtUpdatedDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`iUserId`, `vUniqueId`, `vSlug`, `vFirstName`, `vLastName`, `vEmail`, `vPassword`, `vPhone`, `vAuthCode`, `dtAddedDate`, `dtUpdatedDate`) VALUES
(6, '9393409568', 'prasadgade9393409568', 'Prasad', 'Gade', 'Prasad@gmail.com', '38d145f092a60fe9a195f714be415aa8', '234567654', 'bf7a43e8-e57e-4535-9c4a-7c2eae805afd', '2024-03-30 00:03:10', '2024-03-30 00:03:10'),
(7, '2520057963', 'prashnatgupta2520057963', 'Prashnat', 'Gupta', 'pg5326@gmail.com', '717740cdddfb3c47557e2af1a610d689', '45676543567', '60af6b50-9e9e-4467-9f4c-cd798fa13c57', '2024-03-30 08:45:46', '2024-03-30 08:45:46'),
(8, '4403696860', 'utsavmandal4403696860', 'utsav', 'mandal', 'utsav@gmail.com', 'fa2a9f112bd219cd6ec7ef8fbc0c5849', '98765789876', '211bc16b-83c2-4a41-80a4-79215a29b15b', '2024-03-30 09:08:33', '2024-03-30 09:08:33'),
(10, '5527592734', 'rootroot5527592734', 'root', 'root', 'root@gmail.com', '628c709b5d084dc6b22a6dbe87665419', '8888888888', '8631bb51-5283-46be-8650-1474023fd207', '2024-04-07 09:59:48', '2024-04-07 09:59:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`iBlogId`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`iCartId`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`iOrderId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`iProductId`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`iTransactionId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`iUserId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `iBlogId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `iCartId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `iOrderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `iProductId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `iTransactionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `iUserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
