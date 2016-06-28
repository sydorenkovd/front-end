//когда вы используете значение свойства определенного непосредственно в scope Angular проверяет это локальное свойство или нет
//если нет то он начинает искать его по иерархии наследования.
//Если вы используете ng-model для изменения такого свойства то Angular проверяет есть ли оно локально и если нет то неявно создается новое свойство,
//это и есть причиной ошибок в предыдущем примере

var app = angular.module("studyModule", []);
app.controller("parentCtrl", function ($scope) {
    $scope.dataObject = {
        value: "Hello"
    };
    //для того чтобы избежать такого поведения при использовании ng-model следует создать объект и работать с его свойством,
    //там как объекты JavaScript используют наследование прототипов(технику похожую на ту которую использует Angular при поиске свойства)
    //в таком случае ошибку удается решить
    $scope.reverseText = function () {
        $scope.dataObject.value = $scope.dataObject.value.split("").reverse().join("");
    };
    $scope.changeCase = function () {
        var result = [];
        angular.forEach($scope.dataObject.value.split(""), function (char, index) {
            result.push(index % 2 == 1 ? char.toString().toUpperCase() : char.toString().toLowerCase());
        });
        $scope.dataObject.value = result.join("");
    };
});
app.controller("firstChildCtrl", function ($scope) {
    $scope.changeCase = function () {
        $scope.dataObject.value = $scope.dataObject.value.toLowerCase();
    };
});
app.controller("secondChildCtrl", function ($scope) {
    $scope.changeCase = function () {
        $scope.value = $scope.value.toLowerCase();
    };    
    $scope.shiftFour = function () {
        var result = [];
        angular.forEach($scope.dataObject.value.split(""), function (char, index) {
            result.push(index < 4 ? char.toUpperCase() : char);
        });
        $scope.dataObject.value = result.join("");
    };
});