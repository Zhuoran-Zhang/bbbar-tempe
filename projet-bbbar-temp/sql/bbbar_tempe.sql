-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Apr 08, 2017 at 09:32 PM
-- Server version: 5.5.42
-- PHP Version: 5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `bbbar_tempe`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_games`
--

CREATE TABLE `tbl_games` (
  `roomId` int(5) NOT NULL,
  `playerName` varchar(20) NOT NULL,
  `score` int(10) NOT NULL,
  `allPlayersOK` tinyint(1) NOT NULL,
  `caractereOK` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_games`
--

INSERT INTO `tbl_games` (`roomId`, `playerName`, `score`, `allPlayersOK`, `caractereOK`) VALUES
(2, 'dsss', 200, 1, 0),
(2, 'dqsqsqsd', 0, 1, 0),
(1, 'bhbiu', 600, 0, 0),
(1, 'knkjnlkn', 100, 0, 0),
(1, 'vjhvh', 100, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `pword` varchar(6) NOT NULL,
  `role` varchar(20) DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `username`, `pword`, `role`) VALUES
(1, 'boss', 'boss', 'boss'),
(2, 'alan', 'alan', 'boss'),
(3, 'iris', 'iris', 'guest'),
(4, 'host', 'host', 'host'),
(5, 'guest', 'guest', 'guest');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;