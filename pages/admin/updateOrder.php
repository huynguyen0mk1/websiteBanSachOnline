<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags-->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="au theme template" />

    <meta name="keywords" content="au theme template" />

    <!-- Title Page-->
    <title>Dashboard</title>

    <!-- Fontfaces CSS-->
    <link href="../layout/css/font-face.css" rel="stylesheet" media="all" />
    <link href="../layout/css/datatable.css" rel="stylesheet" media="all" />
    <link href="../layout/vendor/font-awesome-4.7/css/font-awesome.min.css" rel="stylesheet" media="all" />
    <link href="../layout/vendor/font-awesome-5/css/fontawesome-all.min.css" rel="stylesheet" media="all" />
    <link href="../layout/vendor/mdi-font/css/material-design-iconic-font.min.css" rel="stylesheet" media="all" />

    <!-- Bootstrap CSS-->
    <link href="../layout/vendor/bootstrap-4.1/bootstrap.min.css" rel="stylesheet" media="all" />

    <!-- Vendor CSS-->
    <link href="../layout/vendor/animsition/animsition.min.css" rel="stylesheet" media="all" />
    <link href="../layout/vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet"
        media="all" />
    <link href="../layout/vendor/wow/animate.css" rel="stylesheet" media="all" />
    <link href="../layout/vendor/css-hamburgers/hamburgers.min.css" rel="stylesheet" media="all" />
    <link href="../layout/vendor/slick/slick.css" rel="stylesheet" media="all" />
    <link href="../layout/vendor/select2/select2.min.css" rel="stylesheet" media="all" />
    <link href="../layout/vendor/perfect-scrollbar/perfect-scrollbar.css" rel="stylesheet" media="all" />

    <!-- Main CSS-->
    <link href="../layout/css/theme.css" rel="stylesheet" media="all" />
</head>

<body class="animsition">
    <div class="page-wrapper">
        <!-- HEADER MOBILE-->
        <?php include_once "./component/headermobie.php"; ?>
        <!-- END HEADER MOBILE-->

        <!-- MENU SIDEBAR-->
        <?php include_once "./component/navbar.php"; ?>
        <!-- END MENU SIDEBAR-->

        <!-- PAGE CONTAINER-->
        <div class="page-container">
            <!-- HEADER DESKTOP-->
            <?php include_once "./component/headerpc.php"; ?>
            <!-- HEADER DESKTOP-->

            <!-- MAIN CONTENT-->
            <div class="main-content">
                <div class="section__content section__content--p30">
                    <div class="container-fluid">
                        <div class="card mb-3">
                            <div class="card-header">
                                <h3>Update Order</h3>
                            </div>

                            <div class="card-body">
                                <form autocomplete="off" action="../controller/updateOrder.php" method="POST">
                                    <?php
                                                include_once '../entity/order.php';
                                                
                                                $data = null;
                                                $u = new order();
                                                $data = $u->getadorder($_GET['id']);
                                            ?>

                                    <div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-2 col-form-label">
                                            Date order</label>
                                        <div class="col-sm-9">
                                            <?php echo htmlentities($data->date_added); ?>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-2 col-form-label">
                                            User Name</label>
                                        <div class="col-sm-9">
                                            <?php echo htmlentities($data->name); ?>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-2 col-form-label">
                                            Amount</label>
                                        <div class="col-sm-9">
                                            <?php echo htmlentities($data->amount); ?>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-2 col-form-label">
                                            Status</label>
                                        <div class="col-sm-9">
                                            <select id="productpublishing" name="status" class="form-control">
                                                <option value="???? ?????t"
                                                    <?php if ($data->status == "???? ?????t") echo htmlentities('selected=""');?>>
                                                    ???? ?????t</option>
                                                <option value="???? nh???n h??ng"
                                                    <?php if ($data->status == "???? nh???n h??ng") echo htmlentities('selected=""');?>>
                                                    ???? nh???n h??ng</option>
                                                <option value="??ang giao h??ng"
                                                    <?php if ($data->status == "??ang giao h??ng") echo htmlentities('selected=""');?>>
                                                    ??ang giao h??ng</option>
                                                <option value="????n h??ng t???m ng??ng"
                                                    <?php if ($data->status == "????n h??ng t???m ng??ng") echo htmlentities('selected=""');?>>
                                                    ????n h??ng t???m ng??ng</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-2 col-form-label">
                                            Status payment</label>
                                        <div class="col-sm-9">
                                            <select id="productpublishing" name="status_payment" class="form-control">
                                                <option value="Ch??a thanh to??n"
                                                    <?php if ($data->status_payment == "Ch??a thanh to??n") echo htmlentities('selected=""');?>>
                                                    Ch??a thanh to??n</option>
                                                <option value="???? thanh to??n"
                                                    <?php if ($data->status_payment == "???? thanh to??n") echo htmlentities('selected=""');?>>
                                                    ???? thanh to??n</option>
                                            </select>
                                        </div>
                                    </div>
                                    <input type="hidden" name="id_order"
                                        value="<?php echo htmlentities($data->id_order);?>" />
                                    <div class="form-group row">
                                        <label for="inputPassword3" class="col-sm-2 col-form-label"></label>
                                        <div class="col-sm-9">
                                            <button type="submit" class="btn btn-success btn-sm">
                                                <i class="fa fa-dot-circle-o"></i>Update
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <!-- end table-responsive-->
                            </div>
                            <!-- end card-body-->
                        </div>
                        <div class="card mb-3">
                            <div class="card-header">
                                <h3>Order Detail</h3>

                            </div>

                            <div class="card-body">
                                <div class="table-responsive">
                                    <table id="dataTable"
                                        class="table table-bordered table-hover display dataTable no-footer" role="grid"
                                        aria-describedby="dataTable_info">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Image</th>
                                                <th>Product Name</th>
                                                <th>Quantity</th>
                                                <th>price</th>
                                                <th>Amount</th>
                                                <th>Publishing Company</th>
                                                <th>Category</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php
                                                        include_once "../entity/orderDetail.php";
                                                        $cate  = new orderDetail();
                                                        $i = 1;
                                                        $list = $cate->getallorderwithorderDetail($_GET["id"]);
                                                        if($list!=null)
                                                        foreach ($list as $item) {
                                                        ?>
                                            <tr role="row" class="odd">
                                                <td class="sorting_1"><?php echo htmlentities($i++); ?></td>
                                                <td><?php echo '<img class="ty-pict cm-image"
                                                        id="det_img_1746761672"
                                                        src="../layout/'.htmlentities($item->url).'"
                                                        alt="" title="" style="height: 50px; width: auto;" />'; ?>
                                                </td>
                                                <td><?php echo htmlentities($item->name); ?></td>
                                                <td><?php echo htmlentities($item->quantity); ?></td>
                                                <td><?php echo htmlentities($item->price); ?></td>
                                                <td><?php echo htmlentities($item->total_price); ?></td>
                                                <td><?php echo htmlentities($item->id_publishing_company); ?></td>
                                                <td><?php echo htmlentities($item->id_category); ?></td>
                                            </tr>
                                            <?php
                                                        }
                                                        ?>

                                        </tbody>
                                    </table>
                                    <!-- end table-responsive-->
                                </div>
                            </div>
                            <!-- end card-body-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- END MAIN CONTENT-->
        <!-- END PAGE CONTAINER-->
    </div>
    </div>

    <!-- Jquery JS-->
    <script src="../layout/vendor/jquery-3.2.1.min.js"></script>
    <script src="../layout/js/datatable.js"></script>
    <!-- Bootstrap JS-->
    <script src="../layout/vendor/bootstrap-4.1/popper.min.js"></script>
    <script src="../layout/vendor/bootstrap-4.1/bootstrap.min.js"></script>
    <!-- Vendor JS       -->
    <script src="../layout/vendor/slick/slick.min.js"></script>
    <script src="../layout/vendor/wow/wow.min.js"></script>
    <script src="../layout/vendor/animsition/animsition.min.js"></script>
    <script src="../layout/vendor/bootstrap-progressbar/bootstrap-progressbar.min.js"></script>
    <script src="../layout/vendor/counter-up/jquery.waypoints.min.js"></script>
    <script src="../layout/vendor/counter-up/jquery.counterup.min.js"></script>
    <script src="../layout/vendor/circle-progress/circle-progress.min.js"></script>
    <script src="../layout/vendor/perfect-scrollbar/perfect-scrollbar.js"></script>
    <script src="../layout/vendor/chartjs/Chart.bundle.min.js"></script>
    <script src="../layout/vendor/select2/select2.min.js"></script>

    <!-- Main JS-->
    <script src="../layout/js/main.js"></script>
</body>

</html>