(function () {
    let _locationService = function ($q, $window) {
        function getCurrentPosition() {
            var deferred = $q.defer();
            if (!$window.navigator.geolocation) {
                deferred.reject({ error: 'Geolocation not supported.' });
            } else {
                $window.navigator.geolocation.getCurrentPosition(
                    function (position) {
                        deferred.resolve(position);
                    },
                    function (err) {
                        deferred.reject(err);
                    }
                );
            }
            return deferred.promise;
        }
        return {
            getCurrentPosition: getCurrentPosition
        };
    }

    _locationService.$instance = ['$q', '$window']

    angular.module('weatherApp')
        .factory('locationService', _locationService)
} ());