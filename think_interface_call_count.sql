/*
 Navicat Premium Data Transfer

 Source Server         : mysqlconnect
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost
 Source Database       : business_pros_thinkjs

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : utf-8

 Date: 11/13/2018 23:32:14 PM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `think_interface_call_count`
-- ----------------------------
DROP TABLE IF EXISTS `think_interface_call_count`;
CREATE TABLE `think_interface_call_count` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `visitDate` date DEFAULT NULL,
  `visitNumb` int(11) NOT NULL DEFAULT '0',
  `interfaceName` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=195 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
