<?php
/**
 * Created by Saroj on 1/3/15
 */

if (!file_exists('dbconfig')) {
  header("Location: install.php");
  exit;
}
?><!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="UTF-8">
    <title>BBBAR-Tempe</title>
    <link href="css/bootstrap.css" rel="stylesheet">
    <link href="css/bootstrap-responsive.css" rel="stylesheet">
    <link href="css/font-awesome.min.css" rel="stylesheet">
    <script type="text/javascript" src="js/angular.min.js"></script>
    <script type="text/javascript" src="js/angular-sanitize.min.js"></script>
  </head>
  <body ng-app="myApp" style="background-image:url('images/Lounge-Bar.jpg');">
    <div class="container container-fluid" ng-controller="taskController">
      <div class="row" >
        <div class="col-mg-12">

           <div class="jumbotron" style="background-color:transparent; margin-top :30px">
              <div class="container">
              <h1 class="display-3">BBBar Tempe</h1>
              <!-- <img src="images/Lounge-Bar.jpg" class="img-rounded" alt="Cinque Terre" width="304" height="236"> -->
            </div>
          </div>

            <div class="container">
            <!-- Example row of columns -->
            <div class="row">
  <!--            <div class="col-md-6">
                <h2></h2>
                <p><button class="btn btn-default btn-lg" type="submit">我是大屏幕</button></p>
              </div>
              <div class="col-md-6">
                <h2>我是主持人</h2>
                <P><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
            </div>
              <div class="col-md-6">
                <h2>我是玩家</h2>
                <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
              </div>
              <div class="col-md-6">
                <h2>我是老板</h2>
                <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
              </div>
-->
              <div class="list-group" style="width: 116px"> 
                <a href="views/iamScreen.html" class="list-group-item ">我是大屏幕</a>
                <a href="views/everyoneLogin.html" class="list-group-item ">我是主持人</a>
                <a href="views/everyoneLogin.html" class="list-group-item ">我是玩家</a>
                <a href="views/everyoneLogin.html" class="list-group-item ">我是老板</a>
                
              </div>
      </div>

        </div>
      </div> 
      <!-- end one collapsible section -->
    </div>
<footer class="footer">
      <div class="container">
        <p class="text-muted">联系我们</p>
      </div>
</footer>

    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/angular-route.min.js"></script>
    <script src="scripts/app.js"></script>
    <script src="scripts/controllers/main.js"></script>
    <script src="scripts/controllers/about.js"></script>
    <script src="scripts/controllers/myroute.js"></script>
    <script src="scripts/controllers/user.js"></script>
    <script src="scripts/directives/mydirective.js"></script>
    <script src="scripts/services/myservice.js"></script>
</body>
 
</html>