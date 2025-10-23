# PostgreSQL

PostgreSQL 是一个功能强大的开源对象关系型数据库系统，以其可靠性、功能丰富性和性能著称。

> - [PostgreSQL 官方文档](https://www.postgresql.org/docs/)
> - [PostgreSQL 中文社区](http://www.postgres.cn/)

## 一、特性

- 完全开源
- ACID 事务支持
- 复杂查询支持
- 外键约束
- 触发器和存储过程
- 多版本并发控制 (MVCC)
- 丰富的数据类型（JSON、数组、地理空间等）
- 高度可扩展

## 二、核心功能

### 高级数据类型
- JSON/JSONB - 原生 JSON 支持
- 数组类型
- hstore - 键值对存储
- UUID - 唯一标识符
- PostGIS - 地理空间数据扩展

### 性能优化
- 查询优化器
- 索引类型（B-tree、Hash、GiST、GIN 等）
- 分区表
- 并行查询

### 高可用性
- 流复制
- 逻辑复制
- 自动故障转移
- 热备份

## 三、应用场景

- Web 应用后端数据库
- 地理信息系统 (GIS)
- 数据仓库和分析
- 金融交易系统
- 需要复杂查询的应用

## 四、开始使用

```sql
-- 创建数据库
CREATE DATABASE mydb;

-- 创建表
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入数据
INSERT INTO users (username, email) 
VALUES ('john', 'john@example.com');
```

## 五、后端连接PostgreSQL需要什么信息？

连接PostgreSQL数据库需要以下5个关键信息：

```python
DATABASE_URL = "postgresql://用户名:密码@主机地址:端口/数据库名"
# 示例：
# DATABASE_URL = "postgresql://postgres:mypassword@localhost:5432/agent_management"
```

1. **主机地址（Host）**：本机通常是 `localhost` 或 `127.0.0.1`
2. **端口号（Port）**：默认是 `5432`
3. **数据库名（Database）**：你要连接的数据库名称
4. **用户名（Username）**：默认是 `postgres`
5. **密码（Password）**：安装时设置的密码

## 六、忘记密码？

### 方法一：通过pgAdmin重置密码（最简单，推荐！）

如果你能打开pgAdmin并连接到PostgreSQL服务器（pgAdmin保存了密码），可以直接在图形界面中重置：

#### 详细步骤：

1. **打开pgAdmin**
   - 在Windows开始菜单搜索并打开 "pgAdmin"

2. **连接到服务器**
   - 在左侧面板中，展开 "Servers"
   - 点击你的PostgreSQL服务器（例如："PostgreSQL 15"）
   - 如果弹出密码输入框，直接点"确定"（pgAdmin会使用保存的密码）

3. **打开用户属性**
   - 展开服务器后，找到并展开 **"Login/Group Roles"**（登录/组角色）
   - 在用户列表中找到 **"postgres"**
   - **右键点击** "postgres" → 选择 **"Properties"**（属性）

4. **修改密码**
   - 在弹出的属性窗口中，点击 **"Definition"**（定义）标签页
   - 找到 **"Password"** 字段
   - 输入你的**新密码**
   - 在 **"Password again"** 字段中**再次输入**新密码（确认）
   - 点击窗口右下角的 **"Save"** 按钮

5. **完成！**
   - 看到成功提示，密码已重置
   - **立即记录新密码**到安全的地方

6. **测试新密码（可选）**
   - 在pgAdmin中右键点击服务器 → "Disconnect"
   - 再次点击服务器连接
   - 输入新密码测试是否成功

#### 图示说明：

```
pgAdmin界面结构：
│
├─ Servers
│  └─ PostgreSQL 15
│     ├─ Databases
│     ├─ Login/Group Roles  ← 在这里
│     │  ├─ postgres  ← 右键点击这个
│     │  └─ 其他用户...
│     └─ ...
```

#### 优点：
- ✅ 最简单，全图形界面操作
- ✅ 不需要修改配置文件
- ✅ 不需要重启服务
- ✅ 安全，不需要临时降低认证级别

## 七、如何配置Postgre SQL允许远程连接？

在pg_hba.conf文件末尾添加如下配置：

```conf
# 远程连接配置
host    all             all             0.0.0.0/0               md5
host    all             all             ::/0                    md5
```

在cmd命令行重启pgsql服务

```bash
# 停止服务
net stop postgresql-x64-14

# 启动服务
net start postgresql-x64-14
```
