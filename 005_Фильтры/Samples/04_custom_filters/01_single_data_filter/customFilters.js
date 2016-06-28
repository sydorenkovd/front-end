angular.module("studyModule")
//обратите внимание что при указании модуля отсутствует второй аргумент - массив зависимостей
//в данном случае это означает что данный модуль лишь расширяет функционал ранее объявленного модуля в файле с html разметкой
.filter("changeCase", function () {
    return function (value, isReverse) {
        if (angular.isString(value)) {
            //здесь используется метод isString для проверки строка ли входящее значение и если нет то оно просто возвращается без изменений
            var processedValue = isReverse ? value.toUpperCase() : value.toLowerCase();
            return (isReverse ? processedValue[0].toLowerCase() : processedValue[0].toUpperCase()) + processedValue.substr(1);
        } else {
            return value;
        }
    };
});
//этот фильтр называется changeCase, он предназначен для форматирования строки
//worker function принимает 2 аргумента: 1) значение которое нужно отфильтровать(значение будет передано angularjs когда фильтр будет применен)
//2) позволяет применить обратное отображение для строки (первая буква будет в нижнем регистре а остальные в верхнем)