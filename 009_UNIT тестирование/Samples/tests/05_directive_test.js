describe("Directive Tests", function () {

    var mockScope;
    var compileService;

    beforeEach(angular.mock.module("exampleApp"));

    beforeEach(angular.mock.inject(function ($rootScope, $compile) {
        // с помощью метода inject получены сервисы $rootScope и $compile
        mockScope = $rootScope.$new();
        //создается новый scope
        compileService = $compile;
        //$compile используется для компиляции разметки с angular кодом
        mockScope.data = [
            { name: "Apples", category: "Fruit", price: 1.20, expiry: 10 },
            { name: "Bananas", category: "Fruit", price: 2.42, expiry: 7 },
            { name: "Pears", category: "Fruit", price: 2.02, expiry: 6 }];
    }));

    it("Generates list elements", function () {

        var compileFn = compileService("<div unordered-list='data'></div>");
        //выполняем компиляцию разметки 
        var elem = compileFn(mockScope);
        //передаем в скомпилированное выражение scope который содержит массив объектов data,
        //далее data будет использоватся в директиве

       // с пмощью jqLite далее можно проверить работу директивы
        expect(elem.children("ul").length).toEqual(1);
        expect(elem.find("li").length).toEqual(3);
        expect(elem.find("li").eq(0).text()).toEqual("Apples");
        expect(elem.find("li").eq(1).text()).toEqual("Bananas");
        expect(elem.find("li").eq(2).text()).toEqual("Pears");
    });

});
