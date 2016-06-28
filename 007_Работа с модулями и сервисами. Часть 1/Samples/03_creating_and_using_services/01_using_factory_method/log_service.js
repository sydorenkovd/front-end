angular.module("additionalModule", [])    
.directive("triButton", function () {
    return {
        scope: { counter: "=counter" },
        link: function (scope, element, attrs) {
            element.on("click", function (event) {
                console.log("Button click: " + event.target.innerText);
                scope.$apply(function () {
                    scope.counter++;;
                });
            });
        }
    }
});
angular.module("customServices", [])
    //самый простой способ создать сервис - использовать метод module.factory()
    //этот метод принимает  2 аргумента : 1)имя сервиса; 2) фабричная функция которая возвращает объект сервиса,
    //этот объект будет использоватся во всем приложении когда он будет нужен, так же важно заметить
    //что объект создается только один раз(singleton) и все пользователи этого сервиса работают с одним и тем же объектом
.factory("logService", function () {
    var messageCount = 0;
    return {
        log: function (msg) {
            console.log("(LOG + " + messageCount++ + ") " + msg);
        }
    };
});