describe("Controller Test", function () {
    //Процесс работы с $httpBackend сервисом состоит из этапов:
    //1. Определить запрос и ответ на него
    //2. Ответить на запрос.
    //3. Проверить что все ожидаемые запросы выполнены.
    //4. Проверить результаты.

    // Arrange
    var mockScope, controller, backend;
    beforeEach(angular.mock.module("exampleApp"));
    beforeEach(angular.mock.inject(function ($httpBackend) {
        backend = $httpBackend;
        //сервис $httpBackend используется для реализации низкоуровнего API по работе с AJAX запросами, с помощью этого сервиса можно
        //симулировать ответы от сервера(этот сервис содержится в ngMock) 
        backend.expect("GET", "productData.json").respond(
        [{ "name": "Apples", "category": "Fruit", "price": 1.20 },
        { "name": "Bananas", "category": "Fruit", "price": 2.42 },
        { "name": "Pears", "category": "Fruit", "price": 2.02 }]);
    }));
    //методы которые определяются сервисом $httpBackend :
    //expect(method, url, data, headers) определяет ожидаемый запрос (параметры опциональны)    
    //flush() / flush(count) отправляет результат или указанное колличество ответов, пока этот метод не будет вызван response отправлен не будет
    //verifyNoOutstandingExpectation() проверяет что все ожидаемые запросы были получены
    //respond(data) / response(status, data, headers) определяет ответ на ожидаемый запрос
    beforeEach(angular.mock.inject(function ($controller, $rootScope, $http) {
        mockScope = $rootScope.$new();
        $controller("defaultCtrl", {
            $scope: mockScope,
            $http: $http
        });
        backend.flush();
    }));
    // Act and Assess
    it("Creates variable", function () {
        expect(mockScope.counter).toEqual(0);
    })
    it("Increments counter", function () {
        mockScope.incrementCounter();
        expect(mockScope.counter).toEqual(1);
    });
    it("Makes an Ajax request", function () {
        backend.verifyNoOutstandingExpectation();
    });
    it("Processes the data", function () {
        expect(mockScope.products).toBeDefined();
        expect(mockScope.products.length).toEqual(3);
    });
    it("Preserves the data order", function () {
        expect(mockScope.products[0].name).toEqual("Apples");
        expect(mockScope.products[1].name).toEqual("Bananas");
        expect(mockScope.products[2].name).toEqual("Pears");
    });
});