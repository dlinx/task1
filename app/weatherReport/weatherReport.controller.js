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
                        .then(res => this.displayForecastData(res.data), err => this.displayError());
                })
        }
        displayWeatherInfo(wdata) {
            if (wdata.cod == 200)
                this.weatherData = wdata;
            else {
                this.$uibModal.open({
                    templateUrl: 'views/errorMessage/errorMessage.html',
                    controller: 'errorMessage',
                    controllerAs: 'ctrl',
                    backdrop: 'static',
                    resolve: {
                        error: function () {
                            return wdata;
                        }
                    }
                });
            }
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
        displayForecastData(res) {
            if (res.cod == 200) {
                this.forecastData = res;
                this.forecastData.list.splice(0, 1);
            } else {
                this.$uibModal.open({
                    templateUrl: 'views/errorMessage/errorMessage.html',
                    controller: 'errorMessage',
                    controllerAs: 'ctrl',
                    backdrop: 'static',
                    resolve: {
                        error: function () {
                            return res;
                        }
                    }
                });
            }
        }
    }
    _weatherReport.$inject = ['$stateParams', '$uibModal', 'weatherService'];

    angular.module('weatherApp')
        .controller('weatherReport', _weatherReport);

} ());