# nitro-nuxt-app

## 项目开发经历

1. `postgresql` 设置 `docker` 时需要设置时区
2. `users` 支持用户登录注册以及登录记录
3. 支持邀请码注册
4. 支持字典与字典项
5. 支持文件上传
6. 需下载城镇 `csv`

## 技术细节

### postgres docker 安装

在 `postgres/` 执行

```
docker compose up -d
```

> 注意将密码文件的如果存在两行多余的最后一行移除

### minio docker 安装

在 `minio/` 执行

```
docker compose up -d
```

用账户与密码登录 9001 web 端口
新建bucket以及获取 `accessKey` 与 `secretKey`
