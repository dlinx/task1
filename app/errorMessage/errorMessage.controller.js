(function () {
    class _errorController {
        controller() {

        }
    }

    _errorController.$inject = [];
    angular
        .module('weatherApp')
        .controller('errorMessage', _errorController);
} ());