(function () {
    function _getLocation($uibModalInstance, $state) {

        this.type = 'City';
        this.$state = $state;
        this.$uibModalInstance = $uibModalInstance;

        this.ok=function() {
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
        this.selectType=function(type) {
            this.type = type;
        }
    }

    _getLocation.$inject = ['$uibModalInstance', '$state'];

    angular.module('weatherApp')
        .controller('getLocation', _getLocation);
} ());