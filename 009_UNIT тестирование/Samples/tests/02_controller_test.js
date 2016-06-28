describe("Controller Test", function () {
    // Arrange
    var mockScope = {};
    var controller;
    beforeEach(angular.mock.module("exampleApp"));
    //(angular.mock.module("exampleApp") используется для загрузки модуля "exampleApp"
    beforeEach(angular.mock.inject(function ($controller, $rootScope) {
        //angular.mock.inject предоставляет возможность использования DI в тестах а так же использование сервисов
        mockScope = $rootScope.$new();
        //с помощью $new() $rootScope можно создать scope,
        controller = $controller("defaultCtrl", {
            $scope: mockScope
        });
        //сервис $controller испольльзуется для инстанциирования объекта контроллера
        //метод принимает 2 аргумента имя контроллера и объект содержащий свойства которые используются для разрешения зависимостей
    }));
    // Act and Assess
    it("Creates variable", function () {
        expect(mockScope.counter).toEqual(0);
    })
    it("Increments counter", function () {
        mockScope.incrementCounter();
        expect(mockScope.counter).toEqual(1);
    });
});