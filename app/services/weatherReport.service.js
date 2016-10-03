(function () {
    class _weatherService {
        constructor($http) {
            this.$http = $http;
        }
        getWeatherInfo(_data, apiKey) {
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

            this.params.APPID = apiKey;
            this.params.units = 'metric';
            return this.$http({
                url: 'http://api.openweathermap.org/data/2.5/weather',
                method: "GET",
                params: this.params
            });
        }
        getForecast() {
            this.params.cnt = 8;
            return this.$http({
                url: 'http://api.openweathermap.org/data/2.5/forecast/daily',
                method: "GET",
                params: this.params
            })
        }
        dtof(dTemp) {
            return dTemp * 9 / 5 + 32
        }
        ftod(fTemp) {
            return (fTemp - 32) * 5 / 9;
        }
    }

    _weatherService.$inject = ['$http'];

    angular.module('weatherApp')
        .service('weatherService', _weatherService)
} ());