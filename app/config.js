(function () {
    class _config {
        constructor($stateProvider,$urlRouterProvider) {
            let _homeState = {
                name: 'home',
                url: '/',
                controller: "home",
                controllerAs: "home"
            };

            let _reportState = {
                name: 'report',
                url: '/report/:type/?latitude&longitude&city&zip',
                templateUrl: 'views/weatherReport/weatherReport.html',
                controller: 'weatherReport',
                controllerAs: 'weather',
                resolve: {
                    apiKey: function ($http) {
                        return $http
                            .get('/getAPIKey');
                    }
                }
            }
            
            $stateProvider.state(_homeState);
            $stateProvider.state(_reportState);
            $urlRouterProvider.when('','/');
        }
    }
    _config.$inject = ['$stateProvider','$urlRouterProvider'];
    angular.module('weatherApp')
        .config(_config);
} ());