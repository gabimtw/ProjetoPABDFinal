-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 08-Dez-2025 às 12:20
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `tbsagsuperherois`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbameacamissao`
--

CREATE TABLE `tbameacamissao` (
  `IdMissao` int(11) NOT NULL,
  `IdVilao` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbequipemissao`
--

CREATE TABLE `tbequipemissao` (
  `IdMissao` int(11) NOT NULL,
  `IdHeroi` int(11) NOT NULL,
  `FuncaoNaEquipe` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbheroi`
--

CREATE TABLE `tbheroi` (
  `IdHeroi` int(11) NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `Codinome` varchar(100) DEFAULT NULL,
  `IdentidadeSecreta` varchar(150) DEFAULT NULL,
  `DataNascimento` date DEFAULT NULL,
  `StatusAtividade` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbheroipoder`
--

CREATE TABLE `tbheroipoder` (
  `IdHeroi` int(11) NOT NULL,
  `IdPoder` int(11) NOT NULL,
  `NivelDominio` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbmissao`
--

CREATE TABLE `tbmissao` (
  `IdMissao` int(11) NOT NULL,
  `NomeMissao` varchar(150) NOT NULL,
  `DataSolicitacao` date DEFAULT NULL,
  `NivelAmeaca` varchar(50) DEFAULT NULL,
  `Localizacao` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbpoder`
--

CREATE TABLE `tbpoder` (
  `IdPoder` int(11) NOT NULL,
  `NomePoder` varchar(100) NOT NULL,
  `Descricao` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbvilao`
--

CREATE TABLE `tbvilao` (
  `IdVilao` int(11) NOT NULL,
  `NomeVilao` varchar(100) NOT NULL,
  `Afiliacao` varchar(100) DEFAULT NULL,
  `NivelPerigo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tbameacamissao`
--
ALTER TABLE `tbameacamissao`
  ADD PRIMARY KEY (`IdMissao`,`IdVilao`),
  ADD KEY `IdVilao` (`IdVilao`);

--
-- Índices para tabela `tbequipemissao`
--
ALTER TABLE `tbequipemissao`
  ADD PRIMARY KEY (`IdMissao`,`IdHeroi`),
  ADD KEY `IdHeroi` (`IdHeroi`);

--
-- Índices para tabela `tbheroi`
--
ALTER TABLE `tbheroi`
  ADD PRIMARY KEY (`IdHeroi`);

--
-- Índices para tabela `tbheroipoder`
--
ALTER TABLE `tbheroipoder`
  ADD PRIMARY KEY (`IdHeroi`,`IdPoder`),
  ADD KEY `IdPoder` (`IdPoder`);

--
-- Índices para tabela `tbmissao`
--
ALTER TABLE `tbmissao`
  ADD PRIMARY KEY (`IdMissao`);

--
-- Índices para tabela `tbpoder`
--
ALTER TABLE `tbpoder`
  ADD PRIMARY KEY (`IdPoder`);

--
-- Índices para tabela `tbvilao`
--
ALTER TABLE `tbvilao`
  ADD PRIMARY KEY (`IdVilao`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tbheroi`
--
ALTER TABLE `tbheroi`
  MODIFY `IdHeroi` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbmissao`
--
ALTER TABLE `tbmissao`
  MODIFY `IdMissao` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbpoder`
--
ALTER TABLE `tbpoder`
  MODIFY `IdPoder` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbvilao`
--
ALTER TABLE `tbvilao`
  MODIFY `IdVilao` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `tbameacamissao`
--
ALTER TABLE `tbameacamissao`
  ADD CONSTRAINT `tbameacamissao_ibfk_1` FOREIGN KEY (`IdMissao`) REFERENCES `tbmissao` (`IdMissao`),
  ADD CONSTRAINT `tbameacamissao_ibfk_2` FOREIGN KEY (`IdVilao`) REFERENCES `tbvilao` (`IdVilao`);

--
-- Limitadores para a tabela `tbequipemissao`
--
ALTER TABLE `tbequipemissao`
  ADD CONSTRAINT `tbequipemissao_ibfk_1` FOREIGN KEY (`IdMissao`) REFERENCES `tbmissao` (`IdMissao`),
  ADD CONSTRAINT `tbequipemissao_ibfk_2` FOREIGN KEY (`IdHeroi`) REFERENCES `tbheroi` (`IdHeroi`);

--
-- Limitadores para a tabela `tbheroipoder`
--
ALTER TABLE `tbheroipoder`
  ADD CONSTRAINT `tbheroipoder_ibfk_1` FOREIGN KEY (`IdHeroi`) REFERENCES `tbheroi` (`IdHeroi`),
  ADD CONSTRAINT `tbheroipoder_ibfk_2` FOREIGN KEY (`IdPoder`) REFERENCES `tbpoder` (`IdPoder`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
