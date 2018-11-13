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

 Date: 11/13/2018 23:32:06 PM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `think_img_config`
-- ----------------------------
DROP TABLE IF EXISTS `think_img_config`;
CREATE TABLE `think_img_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img_url` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `view_numbs` int(11) DEFAULT '10',
  `tap_liked_numbs` int(11) DEFAULT '10',
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_modify_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `img_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=latin1;

SET FOREIGN_KEY_CHECKS = 1;
