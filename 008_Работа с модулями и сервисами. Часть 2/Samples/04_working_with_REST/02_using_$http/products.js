angular.module("studyModule", [])
.constant("baseUrl", "http://localhost:2403/items/")
.controller("studyCtrl", function ($scope, $http, baseUrl) {
    //изначально отобьражаемая страница
    $scope.displayPage = "loginPage";

    //метод используется для входа пользователя в систему или перенаправления его на страницу создания аккаунта
    $scope.logIn = function (user) {
        $http.get(baseUrl).success(function (data) {
            var storage = data;
            if ($scope.containRequiredProp(user)) {
                for (var i = 0; i < storage.length; i++) {
                    if ((storage[i].name == user.name) && (storage[i].password == user.password)) {
                        //выполняется проверка на равенство объектов, если условие соблюдается и они равны то отображается секретная страница и выполняется выход из цикла
                        $scope.displayPage = "privatePage";
                        break;
                    }
                    if (i == storage.length - 1) {
                        $scope.displayPage = "createAccountPage";
                        //если в хранилище не было найдено пользователя с такими именем и паролем то отображается страница создания аккаунта
                    }
                }
            }
            //используется для обнуления значений полей после перехода со страницы
            $scope.setDefaults(user);
        });
    }

    //используется для указания объекту зачений по умолчанию
    $scope.setDefaults = function (user) {
        if (angular.isDefined(user)) {
            //angular.isDefined проверяет определен ли объект
            user.name = "";
            user.password = "";
        }
    }

    //создает аккаунт
    $scope.createAccount = function (user) {
        if (angular.isObject(user)) {
            //angular.isObject используется для проверки объект ли значение
            if ($scope.containRequiredProp(user)) {
                $http.post(baseUrl, angular.toJson(user));
                $scope.displayPage = "loginPage";
                $scope.accountExist = false;
            }
        }
        $scope.setDefaults(user);
    }

    //проверяет наличие наобходимых свойств
    $scope.containRequiredProp = function (user) {
        return (user && (user.name && user.password));
    }

    //используется для перехода на страницу
    $scope.switchPage = function (page) {
        if ((page == "createAccountPage") || (page == "loginPage")) {
            $scope.displayPage = page;
            $scope.accountExist = false;
        }
    }
})