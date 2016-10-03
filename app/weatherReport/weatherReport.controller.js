(function () {
    class _weatherReport {
        constructor($stateParams, $uibModal, weatherService) {
            this.$uibModal = $uibModal;
            this.currentDate = new Date().getTime();
            this.day = 0;
            weatherService
                .getWeatherInfo($stateParams)
                .then(res => this.displayWeatherInfo(res.data), err => this.displayError(err))
                .then(() => {
                    weatherService
                        .getForecast()
                        .then(res => {
                            this.forecastData = res.data
                            this.forecastData.list.splice(0, 1);
                        }, err => this.displayError());
                })
        }
        displayWeatherInfo(wdata) {
            this.weatherData = wdata;
        }
        displayError(err) {
            this.$uibModal.open({
                templateUrl: 'views/errorMessage/errorMessage.html',
                controller: 'errorMessage',
                controllerAs: 'ctrl',
                backdrop: 'static'
            });
            console.error(err);
        }
    }
    _weatherReport.$inject = ['$stateParams', '$uibModal', 'weatherService'];

    angular.module('weatherApp')
        .controller('weatherReport', _weatherReport);

} ());