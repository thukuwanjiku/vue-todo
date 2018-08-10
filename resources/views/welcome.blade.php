<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
        <link href="css/jquery.growl.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="css/app.css">        
    </head>
    <body>
        
        <div id="app">
            <todos></todos>
        </div>

        <script src="js/app.js"></script>
        <script src="js/jquery.growl.js" type="text/javascript"></script>
        <script>
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })
        </script>
            
    </body>
</html>
