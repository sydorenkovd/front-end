angular.module("studyModule", [])
.controller("studyCtrl", function ($scope) {

    //изначально отобьражаемая страница
    $scope.displayPage = "loginPage";

    $scope.accountExist = false;    

    //хранилище данных
    $scope.storage = [
        { name: "Default", password: "Default" }
    ];

    //метод используется для входа пользователя в систему или перенаправления его на страницу создания аккаунта
    $scope.logIn = function (user) {
        var storage = $scope.storage;
        if ($scope.containRequiredProp(user)) {            
            for (var i = 0; i < storage.length; i++) {
                if (angular.equals(storage[i], user)) {
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
        $scope.setDefaults(user);
        //используется для обнуления значений полей после перехода со страницы
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
                if (!$scope.checkDuplicates(user)) {
                    $scope.storage.push(angular.copy(user));
                    //метод angular.copy() используется для копирования объекта, так как если его не использоватся то
                    //остаются ссылки на этот объект, которые приводят не к ожидаемому поведению
                    $scope.displayPage = "loginPage";
                    $scope.accountExist = false;
                } else {
                    $scope.accountExist = true;
                }
            }
        }
        $scope.setDefaults(user);
    }

    //проверяет наличие наобходимых свойств
    $scope.containRequiredProp = function (user) {
        return (user && (user.name && user.password));
    }

    //проверяет существующие аккаунты для предотвращения дублирования
    $scope.checkDuplicates = function (user) {
        var storage = $scope.storage;
        for (var i = 0; i < storage.length; i++) {
            if (storage[i].name == user.name) {
                return true;
                break;
            }
        }
        return false;
    }

    //используется для перехода на страницу
    $scope.switchPage = function (page) {
        if ((page == "createAccountPage") || (page == "loginPage")) {
            $scope.displayPage = page;
            $scope.accountExist = false;            
        }
    }
})