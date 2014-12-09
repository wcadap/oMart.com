oMartApp.factory('appService',
function () {
    var isFirstRun = true;

    var _checkFirstRun = function () {
        return isFirstRun;
    };

    var _setNotFirstRun = function () {
        isFirstRun = false;
        return isFirstRun;
    };

    //Expose methods and fields through revealing pattern
    return {
        checkFirstRun: _checkFirstRun,
        setNoFirstRun: _setNotFirstRun
    }

});