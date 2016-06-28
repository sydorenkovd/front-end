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
});
//фильтр skipItems предназначен для того чтобы пропустить несколько элементов для отображения из массива данных,
//в нем присутствует проверка isArray которая проверяет чтобы аргумент был массивом и isNumber которая проверяет что массив не пустой
//далле после успешного прохождения проверок к массиву данных применяется JavaScript функция slice 