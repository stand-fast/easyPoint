<%--
  Created by IntelliJ IDEA.
  User: Lenovo
  Date: 2019/8/5
  Time: 14:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<a href="test/findAll">查询所有</a>
<form action="test/save" method="post">
    姓名：<input type="text" name="username"/>
    密码：<input type="text" name="password"/>
    年龄：<input type="text" name="age"/>
    <input type="submit" value="保存"/>
</form>
</body>
</html>
