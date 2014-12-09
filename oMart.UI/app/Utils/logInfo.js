oMartApp.factory("logInfo", function () {

    toastr.options = {
        "debug": false,
        "positionClass": "toast-top-right",
        "onclick": null,
        "fadeIn": 300,
        "fadeOut": 1000,
        "timeOut": 3000,
        "extendedTimeOut": 1000
    };

    var _info = function (_infoTxt) {
        toastr.info(_infoTxt);
    };

    var _error = function (_infoTxt) {
        toastr.error(_infoTxt);
    };

    var _success = function (_infoTxt) {
        toastr.success(_infoTxt);
    };

    var _warning = function (_infoTxt) {
        toastr.warning(_infoTxt);
    };

    return {
        info: _info,
        error: _error,
        success: _success,
        warning : _warning
    };
});
