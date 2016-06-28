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
//module.service() метод так же создает сервис только использует другой подход: AngularJS использует объект который возвращается функцией
//как конструктор и за кулисами для его создания использует ключевое слово new
.service("logService", function () {
    var messageCount = 0;    
    this.log = function (msg) {
      return  console.log("(LOG + " + messageCount++ + ") " + msg);
    };    
});