angular.module("studyModule", ["ngResource"])
.constant("baseUrl", "http://localhost:2403/data/")
.controller("studyCtrl", function ($scope, $http, $resource, baseUrl) {
    $scope.displayMode = "list";

    $scope.currentProduct = null;

    $scope.productsResource = $resource(baseUrl + ":id", { id: "@id" });
    //сервис $resource представляет собой функцию которая используется для описания URL 
    //который используется для взаимодействия с REST, сегмент URL который изменяется описывается выражением ": "
    // например адрес http://localhost:2200/items/23, где 23-id элемента, вторым аргументом является конфигнурационный
    // объект который определяет
    // откуда будет взят опциональный параметр, каждое свойство этого объекта должно соответствовать параметру из первого аргумента
    //в данном случае значение опционального параметра привязано к значению свойства id из источника данных
    // результатом работы этой функции является некий объект (access object) который можно использовать для выполнения
    // запросов на сервер, он имеет ряд методов:
        //delete(params, product) тип DELETE удаляет объект по указанному id
        //get(id) тип GET возвращает объект по указанному id
        //query() тип GET возвращает все объекты из массива данных
        //remove(params, product) тип DELETE удаляет объект по указанному id
        //save(product) тип POST сохраняет изменения
    //сервис $resource в результате своей работы создает пустой массив, далее использует сервис $http для запроса на сервер,
    // полученные данные записываются в созданный массив, следует быть осторожным так как запрос выполняется асинхронно
    // и массив проинициализируется данными только после его выполнения


    $scope.listProducts = function () {
        $scope.products = $scope.productsResource.query();
        // метод query() возвращает данные помещая их в объект resource который содержит методы для манипуляции данными:
        //$delete() удаляет объект из сервера(еквивалент $remove())
        //$get() обновляет данные из сервера отменяя все несохраненные локальные изменения
        //$remove() удаляет объект из сервера(еквивалент $delete())
        //$save() сохраняет объект на сервере
        //все указанные методы являются асинхронными и возвращают promise объект который можно использовать для получения уведомления о статусе запроса
    }

    $scope.deleteProduct = function (product) {
        product.$delete().then(function () {
            //проблема в использовании метода $delete() состоит в том что он удаляет данные из сервера но не удаляет их локально
            $scope.products.splice($scope.products.indexOf(product), 1);
        });
        $scope.displayMode = "list";
    }

    $scope.createProduct = function (product) {
        new $scope.productsResource(product).$save().then(function (newProduct) {
            //применение ключевого слова new вызывает функцию apply на productResource, далее используется метод $save() для сохранения данных
            // так же как и $delete() $save() не обновляет данные локально поэтому здесь используется promise для их обновления 
            $scope.products.push(newProduct);
            $scope.displayMode = "list";
        });
    }

    $scope.updateProduct = function (product) {
        product.$save();
        $scope.displayMode = "list";
    }

    $scope.editOrCreateProduct = function (product) {
        $scope.currentProduct = product ? product : {};
        $scope.displayMode = "edit";
    }

    $scope.saveEdit = function (product) {
        if (angular.isDefined(product.id)) {
            $scope.updateProduct(product);
        } else {
            $scope.createProduct(product);
        }
    }

    $scope.cancelEdit = function () {
        if ($scope.currentProduct && $scope.currentProduct.$get) {
            $scope.currentProduct.$get();
        }
        $scope.currentProduct = {};
        $scope.displayMode = "list";
    }
    $scope.listProducts();
})