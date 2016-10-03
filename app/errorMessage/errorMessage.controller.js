(function () {
    function _errorController(error) {

        this.err = 'An Error Occured while accessing weather Service.';
        if (error) {
            this.err = error.cod.toString() + ": " + error.message;
        }
    }

    _errorController.$inject = ['error'];
    angular
        .module('weatherApp')
        .controller('errorMessage', _errorController);
} ());