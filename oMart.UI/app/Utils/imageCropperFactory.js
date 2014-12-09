oMartApp.factory('imageCropperFactory',
function () {
    var _buildCropper = function () {
        var $image = $(".cropper"),
          $dataX = $("#dataX"),
          $dataY = $("#dataY"),
          $dataHeight = $("#dataHeight"),
          $dataWidth = $("#dataWidth"),
          console = window.console || { log: $.noop },
          cropper;

        $image.cropper({
            
            aspectRatio: 9 / 12,
            resizable: false,
            zoomable: false,
            dragCrop : true,
            autoCropArea: 1,
            data: {
                x: $dataWidth/2,
                y: 100,
                width: 300,
                height: 350
            },
            //preview: ".preview",

            // multiple: FALSE,
            // autoCrop: TRUE,
            // dragCrop: TRUE,
            // dashed: TRUE,
            // modal: TRUE,
            // movable: TRUE,
            // resizable: TRUE,
            // zoomable: TRUE,
            // rotatable: TRUE,

            // maxWidth: 480,
            // maxHeight: 270,
            // minWidth: 160,
            // minHeight: 90,

            done: function (data) {
                $dataX.val(data.x);
                $dataY.val(data.y);
                $dataHeight.val(data.height);
                $dataWidth.val(data.width);
            },

            build: function (e) {
                console.log(e.type);
            },

            built: function (e) {
                console.log(e.type);
            },

            dragstart: function (e) {
                console.log(e.type);
            },

            dragmove: function (e) {
                console.log(e.type);
            },

            dragend: function (e) {
                console.log(e.type);
            }
        });

        cropper = $image.data("cropper");

        var _getImageData = function () {
            return dataURL = $image.cropper("getDataURL");
        }

        return {
            getImageData: _getImageData
        };

        //$("#replace").click(function () {
        //    $image.cropper("replace", $("#replaceWith").val());
        //});

        //$("#getImageData").click(function () {
        //    $("#showImageData").val(JSON.stringify($image.cropper("getImageData")));
        //});

        //$("#setData").click(function () {
        //    $image.cropper("setData", {
        //        x: $dataX.val(),
        //        y: $dataY.val(),
        //        width: $dataWidth.val(),
        //        height: $dataHeight.val()
        //    });
        //});

        //$("#getData").click(function () {
        //    $("#showData").val(JSON.stringify($image.cropper("getData")));
        //});

        //$("#getDataURL").click(function () {
        //    var dataURL = $image.cropper("getDataURL");

        //    $("#dataURL").text(dataURL);
        //    $("#showDataURL").html('<img src="' + dataURL + '">');
        //});

        //$("#getDataURL2").click(function () {
        //    var dataURL = $image.cropper("getDataURL", "image/jpeg");

        //    $("#dataURL").text(dataURL);
        //    $("#showDataURL").html('<img src="' + dataURL + '">');
        //});

        //$("#getDataURL3").click(function () {
        //    var dataURL = $image.cropper("getDataURL", {
        //        width: 160,
        //        height: 90
        //    });

        //    $("#dataURL").text(dataURL);
        //    $("#showDataURL").html('<img src="' + dataURL + '">');
        //});
    }

    return {
        buildCropper: _buildCropper
    }

});