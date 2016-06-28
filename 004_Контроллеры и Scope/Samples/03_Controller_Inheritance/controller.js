var module = angular.module("studyModule", []);
module.controller("parentCtrl", function ($scope) {
    $scope.value = "Hello";
    $scope.reverseText = function () {
        $scope.value = $scope.value.split("").reverse().join("");
    };
    $scope.changeCase = function () {
        var result = [];
        angular.forEach($scope.value.split(""), function (char, index) {
            result.push(index % 2 == 1 ? char.toString().toUpperCase() : char.toString().toLowerCase());
        });
        $scope.value = result.join("");
    };
});
module.controller("firstChildCtrl", function ($scope) {
    $scope.changeCase = function () {
        $scope.value = $scope.value.toLowerCase();
    };
});
module.controller("secondChildCtrl", function ($scope) {
    $scope.changeCase = function () {
        $scope.value = $scope.value.toLowerCase();
    };
    //так же в AngularJS существует возмозность переопределить унаследованные функции и данные на локальные
    //встретив метод Angular ищет его реализацию в текущем контроллере и если не находит то двигается вверх по иерархии контроллеров просматривая каждый,
    //пока не обнаружит нужный метод
    $scope.shiftFour = function () {
        var result = [];
        angular.forEach($scope.value.split(""), function (char, index) {
            result.push(index < 4 ? char.toUpperCase() : char);
        });
        $scope.value = result.join("");
    };
})