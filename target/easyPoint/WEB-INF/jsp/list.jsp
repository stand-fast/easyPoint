<%--
  Created by IntelliJ IDEA.
  User: Lenovo
  Date: 2019/8/5
  Time: 17:55
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    <h3>查询所有</h3>
    <c:forEach items="${list}" var="testPojo">
        ${testPojo.username}<br>
    </c:forEach>
</body>
</html>
