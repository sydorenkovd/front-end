//Методы объекта module
//    animation(name, factory) используется для создания анимации
//    config(callback) регистрирует функцию которая используется для конфигурации модуля при его загрузке(init, constructor)
//    constant(key, value) определяет сервис который возвращает константу
//    controller(name, constructor) создает контроллер
//    directive(name, factory) создает директиву
//    factory(name, provider) создает сервис применяя фабричный метод
//    filter(name, factory) создает фильтр
//    provider(name, type) создает сервис применяя метод провайдер
//    name возвращает имя модуля
//    run(callback) регистрирует функцию которая будет вызванан после того как Angular загрузит все модули
//    service(name, constructor) создает сервис применяя сервис метод
//    value(name, value) создает сервис который возвращает константу

angular.module("studyModule")
    //в данном случае в модуль который уже создан будет добавлена директива 
.directive("triButton", function () {
    return {
        scope: { counter: "=counter" },
        link: function (scope, element, attrs) {
            element.on("click", function (event) {
                console.log("Button click: " + event.target.innerText);
                scope.$apply(function () {
                    scope.counter++;
                });
            });
        }
    }
});
