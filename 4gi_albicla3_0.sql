-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 07 Gru 2021, 23:37
-- Wersja serwera: 10.4.21-MariaDB
-- Wersja PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `4gi_albicla3_0`
--
CREATE DATABASE IF NOT EXISTS `4gi_albicla3_0` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `4gi_albicla3_0`;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `brand` varchar(32) NOT NULL,
  `model` varchar(32) NOT NULL,
  `plate_num` varchar(10) NOT NULL,
  `year` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `cars`
--

INSERT INTO `cars` (`id`, `owner_id`, `brand`, `model`, `plate_num`, `year`) VALUES
(1, NULL, 'Nissan', 'GTR', 'LC12345', 2012),
(2, NULL, 'Opel', 'Corsa', 'LC45423', 2000);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `dane_log`
--

CREATE TABLE `dane_log` (
  `id` int(11) NOT NULL,
  `login` varchar(36) NOT NULL,
  `mail` varchar(36) NOT NULL,
  `passwd` varchar(24) NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `dane_log`
--

INSERT INTO `dane_log` (`id`, `login`, `mail`, `passwd`, `admin`) VALUES
(1, '123', '321', '123', 1),
(13, 'dobrylogin', 'normalny.mail@mail.com', 'ABCabc123!@#', 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `dane_szczegoly`
--

CREATE TABLE `dane_szczegoly` (
  `id` int(11) NOT NULL,
  `log_id` int(11) NOT NULL,
  `imie` varchar(24) DEFAULT NULL,
  `nazwisko` varchar(32) DEFAULT NULL,
  `data_ur` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `dane_szczegoly`
--

INSERT INTO `dane_szczegoly` (`id`, `log_id`, `imie`, `nazwisko`, `data_ur`) VALUES
(20, 1, '333', '2323', '2021-03-03');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `owners`
--

CREATE TABLE `owners` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `surname` varchar(32) NOT NULL,
  `PESEL` varchar(11) NOT NULL,
  `city` varchar(32) NOT NULL,
  `street` varchar(32) NOT NULL,
  `home_num` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `owners`
--

INSERT INTO `owners` (`id`, `name`, `surname`, `PESEL`, `city`, `street`, `home_num`) VALUES
(1, 'Reed', 'Moss', '3526412855', 'Toruń', 'Donec', 28),
(2, 'Gavin', 'Underwood', '2343497216', 'Rzeszów', 'sem,', 73),
(3, 'Guinevere', 'Miller', '3522842630', 'Opole', 'eget', 11),
(4, 'Elmo', 'Hoffman', '6454919436', 'Mielec', 'diam', 56),
(5, 'Gretchen', 'Williamson', '9491492685', 'Kraków', 'natoque', 81),
(6, 'Virginia', 'Morales', '8454889627', 'Elbląg', 'euismod', 34),
(7, 'Ferris', 'Burch', '3025684523', 'Koszalin', 'et', 69),
(8, 'Daniel', 'Kidd', '1965442102', 'Kielce', 'blandit', 17),
(9, 'Melyssa', 'Bryant', '6470668293', 'Gorzów Wielkopolski', 'fringilla', 83),
(10, 'James', 'Johns', '2383908931', 'Kraków', 'quis', 32),
(11, 'Ignatius', 'Mosley', '2893796353', 'Starachowice', 'amet,', 100),
(12, 'Uma', 'Potts', '8441436060', 'Ełk', 'malesuada', 87),
(13, 'Fulton', 'Collier', '9761898368', 'Tczew', 'tellus.', 21),
(14, 'Liberty', 'Bailey', '6923605835', 'Jelenia Góra', 'pede,', 91),
(15, 'Zeph', 'Shepard', '3809835536', 'Tomaszów Mazowiecki', 'pretium', 63),
(16, 'Donovan', 'O\'donnell', '9257457672', 'Wrocław', 'quam', 7),
(17, 'Piper', 'Hayden', '3765122481', 'Pabianice', 'ac,', 56),
(18, 'Bruce', 'Mcleod', '6124947655', 'Łódź', 'purus', 85),
(19, 'Leigh', 'Roy', '8282563225', 'Bydgoszcz', 'eleifend,', 22),
(20, 'Yen', 'Shannon', '7521203843', 'Ostrowiec Świętokrzyski', 'facilisi.', 96),
(21, 'Herrod', 'Bailey', '7156072626', 'Łomża', 'amet', 67),
(22, 'Xavier', 'Gibson', '9169033417', 'Jelenia Góra', 'lacinia', 82),
(23, 'Eaton', 'Knapp', '3753673375', 'Bydgoszcz', 'adipiscing', 31),
(24, 'Valentine', 'Serrano', '8576021464', 'Białystok', 'tincidunt', 47),
(25, 'Ferdinand', 'Berry', '3326385750', 'Koszalin', 'vitae,', 22),
(26, 'Vance', 'Byrd', '1966240618', 'Gdynia', 'pede.', 89),
(27, 'Mason', 'Melton', '4726556795', 'Starachowice', 'Curabitur', 10),
(28, 'Hakeem', 'Bennett', '1279515232', 'Tarnów', 'risus', 60),
(29, 'Samuel', 'Lopez', '3533161049', 'Ostrowiec Świętokrzyski', 'amet,', 80),
(30, 'Skyler', 'Molina', '6341889744', 'Słupsk', 'metus.', 17);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_plate` (`plate_num`),
  ADD KEY `f_owner` (`owner_id`);

--
-- Indeksy dla tabeli `dane_log`
--
ALTER TABLE `dane_log`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_login` (`login`,`mail`);

--
-- Indeksy dla tabeli `dane_szczegoly`
--
ALTER TABLE `dane_szczegoly`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `one_to_one` (`id`),
  ADD KEY `fuserdata` (`log_id`);

--
-- Indeksy dla tabeli `owners`
--
ALTER TABLE `owners`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_pesel` (`PESEL`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `dane_log`
--
ALTER TABLE `dane_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT dla tabeli `dane_szczegoly`
--
ALTER TABLE `dane_szczegoly`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT dla tabeli `owners`
--
ALTER TABLE `owners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `f_owner` FOREIGN KEY (`owner_id`) REFERENCES `owners` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `dane_szczegoly`
--
ALTER TABLE `dane_szczegoly`
  ADD CONSTRAINT `fuserdata` FOREIGN KEY (`log_id`) REFERENCES `dane_log` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
