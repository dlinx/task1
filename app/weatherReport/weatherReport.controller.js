(function () {
    function _weatherReport($stateParams, $uibModal, weatherService) {

        this.$uibModal = $uibModal;
        this.currentDate = new Date().getTime();
        this.day = 0;
        var _this = this;
        weatherService
            .getWeatherInfo($stateParams)
            .then(function (res) {
                _this.displayWeatherInfo(res.data);
            }, function (err) {
                _this.displayError(err)
            })
            .then(function () {
                weatherService
                    .getForecast()
                    .then(function (res) {
                        _this.displayForecastData(res.data);
                    }, function (err) {
                        _this.displayError();
                    });
            });

        this.displayWeatherInfo = function (wdata) {
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
        this.displayError = function (err) {
            this.$uibModal.open({
                templateUrl: 'views/errorMessage/errorMessage.html',
                controller: 'errorMessage',
                controllerAs: 'ctrl',
                backdrop: 'static'
            });
            console.error(err);
        }
        this.displayForecastData = function (res) {
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