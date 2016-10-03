(function () {
    function _homeController($uibModal, locationService, $state) {

        this.$uibModal = $uibModal;
        this.$state = $state;
        var _this = this;
        locationService
            .getCurrentPosition()
            .then(function (e) {
                _this.locationSuccess(e);
            }, function () {
                _this.locationError();
            });

        this.locationSuccess = function (d) {
            this.$state.go('report', {
                type: 'location',
                latitude: d.coords.latitude,
                longitude: d.coords.longitude
            });
        }
        this.locationError = function () {
            this.$uibModal.open({
                templateUrl: 'views/getLocation/getLocation.html',
                controller: 'getLocation',
                controllerAs: 'ctrl',
                backdrop: 'static'
            });
        }
    }

    _homeController.$inject = ['$uibModal', 'locationService', '$state']
    angular.module('weatherApp')
        .controller('home', _homeController);
} ());