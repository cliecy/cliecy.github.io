# 论坛项目运行指南

这是一个完整的全栈论坛系统，前端使用React + TypeScript + Ant Design，后端使用Spring Boot + SQLite。

## 项目结构

```
cliecy.github.io/
├── back/demo/              # Spring Boot后端
│   ├── src/
│   │   └── main/
│   │       ├── java/com/cliecy/demo/
│   │       │   ├── model/          # 数据模型（User, Post, Reply）
│   │       │   ├── controller/     # REST API控制器
│   │       │   ├── service/        # 业务逻辑层
│   │       │   ├── repository/     # 数据访问层
│   │       │   ├── config/         # 配置类（Security, CORS）
│   │       │   └── dto/            # 数据传输对象
│   │       └── resources/
│   │           └── application.properties
│   └── build.gradle        # Gradle依赖配置
├── src/                    # React前端
│   ├── Pages/              # 页面组件
│   ├── UI/                 # UI组件
│   └── Lib/                # API和工具函数
├── package.json            # npm依赖配置
└── springboot-sqlite-jpa.db  # SQLite数据库文件
```

## 前置要求

### 后端运行要求
- Java 17 或更高版本
- Gradle（项目自带Gradle Wrapper）

### 前端运行要求
- Node.js 14+
- npm 或 yarn

## 安装和运行步骤

### 1. 后端设置和运行

#### 方式一：使用Gradle Wrapper（推荐）

```bash
# 进入后端目录
cd back/demo

# Linux/Mac系统
./gradlew bootRun

# Windows系统
gradlew.bat bootRun
```

#### 方式二：使用Gradle命令

```bash
cd back/demo
gradle bootRun
```

#### 验证后端是否启动成功

后端默认运行在 `http://localhost:8080`

访问测试：
```bash
curl http://localhost:8080/api/users
```

如果返回JSON数据（即使是空数组），说明后端启动成功。

### 2. 前端设置和运行

在**新的终端窗口**中：

```bash
# 回到项目根目录
cd /home/user/cliecy.github.io

# 安装依赖（首次运行或package.json更新后）
npm install

# 启动前端开发服务器
npm start
```

前端默认运行在 `http://localhost:3000`，浏览器会自动打开。

### 3. 同时运行前后端（推荐）

**终端1 - 后端**:
```bash
cd back/demo
./gradlew bootRun
```

**终端2 - 前端**:
```bash
npm start
```

## API接口说明

### 认证相关
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/user/{userName}` - 根据用户名获取用户信息

### 用户相关
- `GET /api/users` - 获取所有用户
- `GET /api/users/{id}` - 根据ID获取用户
- `POST /api/users` - 创建用户
- `PUT /api/users/{id}` - 更新用户
- `DELETE /api/users/{id}` - 删除用户

### 帖子相关
- `GET /api/posts` - 获取帖子列表（支持分页：?page=0&size=10）
- `GET /api/posts/{id}` - 根据ID获取帖子
- `POST /api/posts` - 创建新帖子
- `PUT /api/posts/{id}` - 更新帖子
- `DELETE /api/posts/{id}` - 物理删除帖子
- `DELETE /api/posts/{id}/safe` - 软删除帖子

### 回复相关
- `GET /api/replies/post/{postId}` - 获取帖子的所有回复
- `GET /api/replies/author/{authorId}` - 获取用户的所有回复
- `GET /api/replies/{id}` - 根据ID获取回复
- `POST /api/replies` - 创建新回复
- `PUT /api/replies/{id}` - 更新回复
- `DELETE /api/replies/{id}` - 物理删除回复
- `DELETE /api/replies/{id}/safe` - 软删除回复

## 功能特性

### 用户系统
- ✅ 用户注册（密码BCrypt加密）
- ✅ 用户登录（密码验证）
- ✅ 用户信息管理
- ✅ 会话持久化（LocalStorage）

### 帖子系统
- ✅ 发布帖子
- ✅ 浏览帖子列表（分页）
- ✅ 查看帖子详情
- ✅ 编辑帖子
- ✅ 删除帖子（支持软删除和物理删除）
- ✅ 帖子置顶
- ✅ 帖子锁定

### 回复系统
- ✅ 发布回复
- ✅ 嵌套回复（支持@回复）
- ✅ 查看回复列表
- ✅ 编辑回复
- ✅ 删除回复

## 数据库

项目使用SQLite数据库，数据文件为 `springboot-sqlite-jpa.db`。

### 查看数据库内容

```bash
# 安装sqlite3（如果未安装）
sudo apt-get install sqlite3  # Ubuntu/Debian
brew install sqlite3           # macOS

# 打开数据库
sqlite3 springboot-sqlite-jpa.db

# 查看所有表
.tables

# 查看用户表
SELECT * FROM user;

# 查看帖子表
SELECT * FROM post;

# 查看回复表
SELECT * FROM reply;

# 退出
.quit
```

### 重置数据库

如果需要清空数据库重新开始：

```bash
# 删除数据库文件
rm springboot-sqlite-jpa.db

# 重新启动后端，会自动创建新数据库
cd back/demo
./gradlew bootRun
```

## 常见问题

### 1. 后端启动失败

**问题**: `java.lang.UnsupportedClassVersionError`
**解决**: 确保使用Java 17或更高版本
```bash
java -version
```

### 2. 前端无法连接后端

**问题**: 前端控制台显示CORS错误或网络错误
**解决**:
- 确认后端已启动在8080端口
- 检查 `src/Lib/api.ts` 中的 `API_BASE_URL` 是否正确

### 3. 端口已被占用

**后端端口8080被占用**:
修改 `back/demo/src/main/resources/application.properties`，添加：
```properties
server.port=8081
```
同时修改前端 `src/Lib/api.ts` 中的端口号。

**前端端口3000被占用**:
npm会提示使用其他端口，输入 `y` 即可。

### 4. Gradle下载依赖慢

可以配置国内镜像加速（修改 `back/demo/build.gradle`）：
```gradle
repositories {
    maven { url 'https://maven.aliyun.com/repository/public/' }
    maven { url 'https://maven.aliyun.com/repository/spring/' }
    mavenCentral()
}
```

## 开发提示

### 修改后端代码后
停止后端服务（Ctrl+C），然后重新运行：
```bash
./gradlew bootRun
```

### 修改前端代码后
前端会自动热重载，无需重启。

### 查看后端日志
后端日志会显示所有SQL语句和请求信息，便于调试。

## 生产部署

### 后端打包
```bash
cd back/demo
./gradlew build
```
生成的jar文件在 `build/libs/demo-0.0.1-SNAPSHOT.jar`

运行jar文件：
```bash
java -jar build/libs/demo-0.0.1-SNAPSHOT.jar
```

### 前端打包
```bash
npm run build
```
生成的静态文件在 `build/` 目录。

## 技术栈

### 后端
- Spring Boot 3.4.0-M1
- Spring Data JPA
- Spring Security（密码加密）
- SQLite 数据库
- Lombok（代码简化）

### 前端
- React 18.3.1
- TypeScript 4.9.5
- Ant Design 5.20.1
- Axios（HTTP客户端）
- React Router（路由）

## 许可证

MIT License

## 联系方式

如有问题，请提交Issue或联系项目维护者。
