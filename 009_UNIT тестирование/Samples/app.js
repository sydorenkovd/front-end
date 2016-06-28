angular.module("exampleApp", [])
.controller("defaultCtrl", function ($scope, $http, $interval, $timeout) {
    $scope.counter = 0;
    $scope.incrementCounter = function () {
        $scope.counter++;
    }
    
    //выполняет AJAX запрос по указанному адресу
    $http.get("productData.json").success(function (data) {
        $scope.products = data;
    });

    $scope.intervalCounter = 0;
    $scope.timerCounter = 0;

    //иммитация callback функции
    $interval(function () {
        $scope.intervalCounter++;
    }, 5000, 10);

    //иммитация callback функции
    $timeout(function () {
        $scope.timerCounter++;
    }, 5000);
})
.filter("labelCase", function () {
    //данный фильтр используется для изменения регистра переданной ему строки
    return function (value, reverse) {
        if (angular.isString(value)) {
            var intermediate = reverse ? value.toUpperCase() : value.toLowerCase();
            return (reverse ? intermediate[0].toLowerCase() :
            intermediate[0].toUpperCase()) + intermediate.substr(1);
        } else {
            return value;
        }
    };
})
.directive("unorderedList", function () {
   //директива на основе элементов из массива генерирует <ul>
    return function (scope, element, attrs) {
        var data = scope[attrs["unorderedList"]];
        if (angular.isArray(data)) {
            var listElem = angular.element("<ul>");
            element.append(listElem);
            for (var i = 0; i < data.length; i++) {
                listElem.append(angular.element('<li>').text(data[i].name));
            }
        }
    }
})
.factory("counterService", function () {
    //сервис содержит переменную и 2 функции : для инкремента и получения значения
    var counter = 0;
    return {
        incrementCounter: function () {
            counter++;
        },
        getCounter: function () {
            return counter;
        }
    }
});