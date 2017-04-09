-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Apr 09, 2017 at 10:59 PM
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
  `caractereOK` tinyint(1) NOT NULL,
  `gameOver` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `username` varchar(50) NOT NULL,
  `pword` varchar(6) NOT NULL,
  `role` varchar(20) DEFAULT NULL,
  `score` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`username`, `pword`, `role`, `score`) VALUES
('boss', 'boss', 'boss', 0),
('alan', 'alan', 'boss', 200),
('iris', 'iris', 'guest', 2500),
('host', 'host', 'host', 100),
('guest', 'guest', 'guest', 2300),
('undefined', 'AZERTY', 'guest', 0),
('undefined', 'AZERTY', 'guest', 0),
('aaa', 'azerty', 'guest', 0),
('aaab', 'azerty', 'guest', 0),
('what', 'aaaaaa', 'guest', 1000);
