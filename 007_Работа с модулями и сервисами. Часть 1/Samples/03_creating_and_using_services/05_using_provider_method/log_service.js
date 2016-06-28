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
.provider("logService", function () {
    var counter = true;
    var debug = true;
    return {
        messageCounterEnabled: function (setting) {
            if (angular.isDefined(setting)) {
                counter = setting;
                return this;
            } else {
                return counter;
            }
        },
        debugEnabled: function (setting) {
            if (angular.isDefined(setting)) {
                debug = setting;
                return this;
            } else {
                return debug;
            }
        },
        $get: function () {
            return {
                messageCount: 0,
                log: function (msg) {
                    if (debug) {
                        console.log("(LOG"
                            + (counter ? " + " + this.messageCount++ + ") " : ") ")
                            + msg);
                    }
                }
            };
        }
        //аргументами метода provider являются название сервиса и фабричная функция которая должна возвращать объект provider
        //который содержит метод $get который в свою очередь используется для возврата service объекта
        //когда сервис запрашивают AngularJS использует фабричный метод для получения provider объекта 
        //а на нем в свою очередь вызывается метод $get для того чтобы получить service объект
        //преимуществом использования provider метода является то что вы можете добавить некую функцию в provider метод
        //которая далее может использоватся для конфигурации service объекта
    }
});