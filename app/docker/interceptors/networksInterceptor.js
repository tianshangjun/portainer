angular.module('portainer.app')
  .factory('NetworksInterceptor', ['$q', 'EndpointProvider', function ($q, EndpointProvider) {
    return {
      responseError: function (rejection) {
        if (rejection.status === 502 || rejection.status === -1) {
          var endpoint = EndpointProvider.currentEndpoint();
          if (endpoint !== undefined) {
            var data = endpoint.Snapshots[0].SnapshotRaw.Networks;
            if (data !== undefined) {
              return data;
            }
          }
        }
        return $q.reject(rejection);
      }
    };
  }]);