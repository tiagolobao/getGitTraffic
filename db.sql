-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 13-Set-2018 às 14:11
-- Versão do servidor: 5.7.23-0ubuntu0.16.04.1
-- PHP Version: 7.0.30-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gh-traffic`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `Clones`
--

CREATE TABLE `Clones` (
  `ID` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `uniques` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `ClonesWeek`
--

CREATE TABLE `ClonesWeek` (
  `uniques` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `Paths`
--

CREATE TABLE `Paths` (
  `ID` int(11) NOT NULL,
  `path` text NOT NULL,
  `title` text NOT NULL,
  `count` int(11) NOT NULL,
  `uniques` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `Referrers`
--

CREATE TABLE `Referrers` (
  `referrer` text NOT NULL,
  `count` int(11) NOT NULL,
  `uniques` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `Views`
--

CREATE TABLE `Views` (
  `ID` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `uniques` int(11) NOT NULL,
  `timestamp` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `ViewsWeek`
--

CREATE TABLE `ViewsWeek` (
  `uniques` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Clones`
--
ALTER TABLE `Clones`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Paths`
--
ALTER TABLE `Paths`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Views`
--
ALTER TABLE `Views`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Clones`
--
ALTER TABLE `Clones`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Paths`
--
ALTER TABLE `Paths`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Views`
--
ALTER TABLE `Views`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
