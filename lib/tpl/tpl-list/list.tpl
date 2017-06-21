<!DOCTYPE html>
<html>

<head>
    <title>当前路径</title>
<style>
*{
  margin:0;padding:0;
}
ul li{
  margin-left:20px;
}
</style>
</head>

<body>
   <h1>ara 组件当前开发路径</h1>
   <ul>
    {%for: ${list} as  ${file} , ${index}%}
       <li> <a href="/dev/${file}"> ${file}</a> </li>
      {%/for%}
   </ul>

</body>

</html>
