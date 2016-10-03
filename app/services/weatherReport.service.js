(function () {
    function _weatherService($http) {

        this.$http = $http;

        this.getWeatherInfo = function (_data) {
            this.params = {};
            switch (_data.type) {
                case 'location':
                    this.params = {
                        lon: _data.longitude,
                        lat: _data.latitude,
                    };
                    break;
                case 'city':
                    this.params = {
                        q: _data.city
                    };
                    break;
                case 'zipcode':
                    this.params = {
                        zip: _data.zip,
                    };
                    break;
            }

            this.params.units = 'metric';
            return this.$http({
                url: '/getWeatherInfo',
                method: "GET",
                params: this.params
            });
        }
        this.getForecast = function () {
            this.params.cnt = 8;
            return this.$http({
                url: '/getForecast',
                method: "GET",
                params: this.params
            })
        }
    }

    _weatherService.$inject = ['$http'];

    angular.module('weatherApp')
        .service('weatherService', _weatherService)
} ());