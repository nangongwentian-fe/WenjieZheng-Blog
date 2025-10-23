# MCP (Model Context Protocol)

Model Context Protocol (MCP) 是一个开放协议，用于在大语言模型应用与外部数据源和工具之间建立标准化连接。

## 一、什么是 MCP？

MCP 是由 Anthropic 开发的一个标准化协议，旨在解决 AI 应用与外部系统集成的碎片化问题。通过 MCP，开发者可以：

- 构建一次集成，在多个 AI 应用中使用
- 让 AI 应用安全地访问本地和远程资源
- 标准化工具调用和数据访问的方式

## 二、核心概念

### MCP Hosts（主机）
运行 MCP 客户端的应用程序，例如：
- Claude Desktop
- IDE 插件
- AI 工具和平台

### MCP Servers（服务器）
提供特定功能的轻量级服务程序，可以：
- 暴露数据源（文件系统、数据库、API）
- 提供工具能力（搜索、计算、操作）
- 返回上下文信息

### MCP Clients（客户端）
在主机应用中运行，负责：
- 连接 MCP 服务器
- 管理通信协议
- 处理请求和响应

## 三、核心功能

### Resources（资源）
- 暴露文件、数据库记录等数据
- 提供结构化的上下文信息
- 支持 URI 方案的资源定位

### Tools（工具）
- 让 AI 执行特定操作
- 支持参数化调用
- 返回结构化结果

### Prompts（提示词模板）
- 预定义的提示词模板
- 支持参数化配置
- 便于重复使用常见工作流

### Sampling（采样）
- 让服务器请求 LLM 补全
- 支持代理模式
- 实现复杂的交互流程

## 四、技术特点

### 标准化协议
- 基于 JSON-RPC 2.0
- 支持 stdio 和 HTTP SSE 传输
- 清晰的消息格式定义

### 安全性
- 用户授权和审核机制
- 细粒度的权限控制
- 隔离的执行环境

### 灵活性
- 支持本地和远程服务器
- 可扩展的能力系统
- 多种编程语言支持

## 五、使用场景

### 数据集成
- 连接企业数据库
- 访问本地文件系统
- 集成第三方 API

### 工具增强
- Web 搜索能力
- 代码执行环境
- 内容生成工具

### 工作流自动化
- 文档处理
- 数据分析
- 系统管理任务

## 六、开发 MCP Server

### Python 示例

```python
from mcp.server import Server
from mcp.server.stdio import stdio_server

# 创建服务器实例
app = Server("my-mcp-server")

# 注册工具
@app.tool()
async def get_weather(city: str) -> str:
    """获取指定城市的天气信息"""
    # 实现天气查询逻辑
    return f"{city}的天气：晴天，25°C"

# 运行服务器
async def main():
    async with stdio_server() as (read_stream, write_stream):
        await app.run(
            read_stream,
            write_stream,
            app.create_initialization_options()
        )
```

### TypeScript 示例

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({
  name: "my-mcp-server",
  version: "1.0.0",
});

// 注册工具
server.setRequestHandler("tools/call", async (request) => {
  if (request.params.name === "get_weather") {
    const city = request.params.arguments.city;
    return {
      content: [
        {
          type: "text",
          text: `${city}的天气：晴天，25°C`,
        },
      ],
    };
  }
});

// 运行服务器
const transport = new StdioServerTransport();
await server.connect(transport);
```

## 七、流行的 MCP Servers

### 官方服务器
- **filesystem** - 本地文件系统访问
- **github** - GitHub API 集成
- **google-drive** - Google Drive 集成
- **postgresql** - PostgreSQL 数据库访问
- **slack** - Slack 集成

### 社区服务器
- **brave-search** - Brave 搜索引擎
- **puppeteer** - 浏览器自动化
- **sqlite** - SQLite 数据库
- **git** - Git 操作工具
- **youtube-transcript** - YouTube 字幕提取

## 八、配置 MCP（以 Claude Desktop 为例）

编辑配置文件 `~/Library/Application Support/Claude/claude_desktop_config.json`：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/Documents"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token-here"
      }
    }
  }
}
```

## 九、优势

### 对开发者
- ✅ 一次开发，多处使用
- ✅ 标准化的接口定义
- ✅ 丰富的社区生态
- ✅ 降低集成复杂度

### 对用户
- ✅ 统一的使用体验
- ✅ 更强大的 AI 能力
- ✅ 安全可控的数据访问
- ✅ 灵活的工具组合

## 十、学习资源

- [MCP 官方文档](https://modelcontextprotocol.io/)
- [MCP GitHub 仓库](https://github.com/modelcontextprotocol)
- [MCP Servers 列表](https://github.com/modelcontextprotocol/servers)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk)

## 十一、快速开始

1. **安装 SDK**
   ```bash
   # Python
   pip install mcp
   
   # TypeScript
   npm install @modelcontextprotocol/sdk
   ```

2. **创建简单的服务器**（参考上面的代码示例）

3. **配置客户端应用**（如 Claude Desktop）

4. **测试连接和功能**

通过 MCP，你可以让 AI 应用无缝访问各种数据源和工具，构建更强大的 AI 工作流！

