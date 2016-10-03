(function () {
    class _getLocation {
        constructor($uibModalInstance, $state) {
            this.type = 'City';
            this.$state = $state;
            this.$uibModalInstance = $uibModalInstance;
        }
        ok() {
            if (this.type === "City") {
                this.$state.go('report', {
                    type: 'city',
                    city: this.textVal
                });
            } else if (this.type === "Zip") {
                this.$state.go('report', {
                    type: 'zip',
                    zip: this.textVal
                });
            } else {
                return;
            }
            this.$uibModalInstance.close();
        }
        selectType(type) {
            this.type = type;
        }
    }

    _getLocation.$inject = ['$uibModalInstance', '$state'];

    angular.module('weatherApp')
        .controller('getLocation', _getLocation);
} ());