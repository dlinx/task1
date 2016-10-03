(function () {
    class _homeController {
        constructor($uibModal, locationService, $state) {
            this.$uibModal = $uibModal;
            this.$state = $state;
            locationService
                .getCurrentPosition()
                .then((e) => { this.locationSuccess(e) }, () => this.locationError())
        }
        locationSuccess(d) {
            this.$state.go('report', {
                type: 'location',
                latitude: d.coords.latitude,
                longitude: d.coords.longitude
            });
        }
        locationError() {
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