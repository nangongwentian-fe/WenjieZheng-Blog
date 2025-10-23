# MySQL

MySQL 是世界上最流行的开源关系型数据库管理系统，广泛应用于 Web 应用开发。

## 特性

- 开源免费
- 高性能
- 易于使用
- 跨平台支持
- 可靠的事务支持
- 丰富的存储引擎
- 完善的社区支持
- 广泛的工具生态

## 存储引擎

### InnoDB（默认）
- 支持事务
- 行级锁定
- 外键约束
- 崩溃恢复
- 适合高并发写入

### MyISAM
- 不支持事务
- 表级锁定
- 读取速度快
- 适合读密集型应用

### Memory
- 数据存储在内存中
- 访问速度极快
- 服务器重启数据丢失

## 核心概念

### 索引
- 主键索引 (PRIMARY KEY)
- 唯一索引 (UNIQUE)
- 普通索引 (INDEX)
- 全文索引 (FULLTEXT)
- 组合索引

### 事务隔离级别
- READ UNCOMMITTED
- READ COMMITTED
- REPEATABLE READ（默认）
- SERIALIZABLE

### 性能优化
- 查询缓存
- 索引优化
- 表分区
- 读写分离
- 主从复制

## 应用场景

- Web 应用数据库
- 内容管理系统 (CMS)
- 电子商务平台
- 日志系统
- 数据仓库

## 开始使用

```sql
-- 创建数据库
CREATE DATABASE mydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE mydb;

-- 创建表
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 插入数据
INSERT INTO users (username, email) 
VALUES ('john', 'john@example.com');

-- 查询数据
SELECT * FROM users WHERE username = 'john';
```

## 学习资源

- [MySQL 官方文档](https://dev.mysql.com/doc/)
- [MySQL 中文手册](https://www.mysqlzh.com/)

