angular.module("additionalModule", [])
    //в данном случае создается полностью новый модуль
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
