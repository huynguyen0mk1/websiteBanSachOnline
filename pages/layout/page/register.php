<?php 
session_start(); 

if(isset($_SESSION['codeSession'])){
    header("location:../../controller/checkLogin.php");
    exit(0);
}


?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet"
        id="bootstrap-css" />
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <style>
    .login-block {
        background: #DE6262;
        /* fallback for old browsers */
        background: -webkit-linear-gradient(to bottom, #FFB88C, #DE6262);
        /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to bottom, #FFB88C, #DE6262);
        /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        float: left;
        width: 100%;
        padding: 50px 0;
        height: 745px;
    }

    .banner-sec {
        background: url('./files') no-repeat left bottom;
        background-size: cover;
        min-height: 500px;
        border-radius: 0 10px 10px 0;
        padding: 0;
    }

    .container {
        background: #fff;
        border-radius: 10px;
        box-shadow: 15px 20px 0px rgba(0, 0, 0, 0.1);
    }

    .carousel-inner {
        border-radius: 0 10px 10px 0;
    }

    .carousel-caption {
        text-align: left;
        left: 5%;
    }

    .login-sec {
        padding: 50px 30px;
        position: relative;
    }

    .login-sec .copy-text {
        position: absolute;
        width: 80%;
        bottom: 20px;
        font-size: 13px;
        text-align: center;
    }

    .login-sec .copy-text i {
        color: #FEB58A;
    }

    .login-sec .copy-text a {
        color: #E36262;
    }

    .login-sec h2 {
        margin-bottom: 30px;
        font-weight: 800;
        font-size: 30px;
        color: #DE6262;
    }

    .login-sec h2:after {
        content: " ";
        width: 100px;
        height: 5px;
        background: #FEB58A;
        display: block;
        margin-top: 20px;
        border-radius: 3px;
        margin-left: auto;
        margin-right: auto
    }

    .btn-login {
        background: #DE6262;
        color: #fff;
        font-weight: 600;
    }

    .banner-text {
        width: 70%;
        position: absolute;
        bottom: 40px;
        padding-left: 20px;
    }

    .banner-text h2 {
        color: #fff;
        font-weight: 600;
    }

    .banner-text h2:after {
        content: " ";
        width: 100px;
        height: 5px;
        background: #FFF;
        display: block;
        margin-top: 20px;
        border-radius: 3px;
    }

    .banner-text p {
        color: #fff;
    }
    </style>
</head>

<body>

    <section class="login-block">
        <div class="container">
            <div class="row">
                <div class="col-md-4 banner-sec">
                    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel"
                        style="height: 100%;">

                        <div class="carousel-item active" style="height: 100%;">
                            <img class="d-block img-fluid" src="https://static.pexels.com/photos/33972/pexels-photo.jpg"
                                alt="First slide" style="height: 100%;">

                        </div>
                    </div>
                </div>

                <div class="col-md-8 login-sec">
                    <h2 class="text-center">Create A New Account</h2>
                    <div class="form-group text-center">
                        <a href="../../controller/login.php"><svg xmlns="http://www.w3.org/2000/svg" width="32"
                                height="32" style="color:blue" fill="currentColor" class="bi bi-facebook"
                                viewBox="0 0 16 16">
                                <path
                                    d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                            </svg></a>
                        <?php 
                            require_once '../../controller/define.php';
                            require_once '../../src/Google/vendor/autoload.php';
                            $client = new Google_Client();
                            $client->setClientId(GOOGLE_APP_ID);
                            $client->setClientSecret(GOOGLE_APP_SECRET);
                            $client->setRedirectUri(GOOGLE_APP_CALLBACK_URL);
                            $client->addScope("email");
                            $client->addScope("profile");
                            echo '<a href="'.$client->createAuthUrl().'">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                                        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                                    </svg>
                                </a>'; 
                        ?>
                    </div>
                    <form class="login-form" action="../../controller/newaccount.php" method="POST">
                        <div class="form-group">
                            <label for="exampleInputFullname1" class="text-uppercase">Full Name</label>
                            <input type="text" maxlength="250" name="name" class="form-control" placeholder="" required>

                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1" class="text-uppercase">Email Address</label>
                            <input type="email" name="emailaddress" class="form-control" placeholder="" required>

                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1" class="text-uppercase">UserName</label>
                            <input type="text" name="username" class="form-control" placeholder="" required>

                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1" class="text-uppercase">Password</label>
                            <input type="password" minlength="8" maxlength="50" class="form-control" name="password"
                                placeholder="" required>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputConfirmPassword1" class="text-uppercase">Confirm Password</label>
                            <input type="password" minlength="8" maxlength="50" class="form-control"
                                name="confirmpassword" placeholder="" required>
                        </div>

                        <div class="form-check">
                            <button type="submit" class="btn btn-login float-right">Register</button>
                        </div>
                        <div class="form-check" style="margin-top: 30px;padding-left: 0;"><label
                                class="form-check-label"></label><small>You have an account?</small><a
                                href="login.php">Login</a>
                            <span style="margin-top: 30px;padding-left: 0;"><label
                                    class="form-check-label"></label><small>Go to </small><a
                                    href="../../customer/home.php">Home</a>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    </section>
</body>

</html>