angular.module("studyModule")
.filter("changeCase", function () {
    return function (value, isReverse) {
        if (angular.isString(value)) {
            var processedValue = isReverse ? value.toUpperCase() : value.toLowerCase();
            return (isReverse ? processedValue[0].toLowerCase() : processedValue[0].toUpperCase()) + processedValue.substr(1);
        } else {
            return value;
        }
    };
})
.filter("skipItems", function () {
    return function (value, count) {
        if (angular.isArray(value) && angular.isNumber(count)) {
            if (count > value.length || count < 1) {
                return value;
            } else {
                return value.slice(count);
            }
        } else {
            return value;
        }
    }
})
.filter("change", function ($filter) {
    return function (data, skipCount, takeCount) {
        var skippedData = $filter("skipItems")(data, skipCount);
        return $filter("limitTo")(skippedData, takeCount);
    }
});
//сервис $filter используется для вызова функции фильтрации
//фильтр change не обрабатывает данные он просто служит оберткой 