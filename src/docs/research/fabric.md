# [Fabric.js](http://fabricjs.com/) - соответствие критериям отбора решения

### Наличие и качество документации по библиотеке

Документация - это:

-   [API Reference](http://fabricjs.com/docs/)
-   [40 демо](http://fabricjs.com/demos/) никак не структурированных (в той же konva кол-во - на порядок больше и структурировано!)
-   и [туториалы](http://fabricjs.com/articles/), [часть - 2012г](https://habr.com/ru/articles/162367/), [часть - 2015г](https://habr.com/ru/articles/257401/),
    [часть - 2018г](http://fabricjs.com/clippath-part1#:~:text=In%202.4.0)
-   нет официальных примеров по созданию примитивов Circle, Line/Polyline, Polygon, Rect, Text - за ними либо в google, либо в stackoverflow  
    Ну, ок еще [есть unit тесты](https://github.com/fabricjs/fabric.js/tree/master/test/unit), в них посмотреть можно

Общее качество документации по библиотеке оценил бы как `~ 60/100` :new: - небрежно, несистемно, местами рассинхрон.  
Для сравнения `konva == vue == 90/100`, `webpack == 80/100`, `pixi == 70/100`_(т.к. хорошо, но мало)_

### Скорость разработки

Связанную с документацией, пока оцениваю также `~ 60/100` :new:  
Для сравнения `vue == 90/100`, `konva == 80/100`

### Отсутствие "тормозов" при большом количестве объектов

-   [Цитата создателя fabric на хабре в 2012г](https://habr.com/ru/articles/162367/comments/#comment_5622239)

> Не было особого приоритета оптимизировать тысячи объектов на канвасе.  
> Однако для удобной работы с коллажами Fabric, по-моему, идеален. Именно для этого я и создал его;

-   Цитата его же в вики библиотеки в 2013г - [When to use Fabric](https://github.com/fabricjs/fabric.js/wiki/When-to-use-Fabric)

> Displaying large number of objects on canvas (performance-wise)

-   официальные [бенчмарки](http://fabricjs.com/benchmarks/), в одном из которых видно, что  
    drag объекта тормозит, когда [5000 объектов](http://fabricjs.com//raphael-vs-fabric-simple?n=5000)
-   официальное [optimizing performance](https://github.com/fabricjs/fabric.js/wiki/Optimizing-performance)
-   [Нагрузочное тестирование 1500 объектов](https://cakkypamucm.github.io/code-example/fabric/scrollers/imperative.html/?aircraftsCount=30&flightsCount=50)
-   БАГ - при уходе с таба браузера, содержащего холст с 1500 объектов, при последующем возврате наблюдается несколько секундный лаг  
    ![bug](https://i.gyazo.com/f2fdf5d73cd3722c1d0cdec7b652d3ef.gif)

### Возможность реализации прокрутки

Не удалось найти

### Текст - выравнивание/ellipsis

Пока непонятно, чем [Text](http://fabricjs.com/docs/fabric.Text.html) отличается от [Textbox](http://fabricjs.com/docs/fabric.Textbox.html)  
Ellipsis отсутствует - есть неофициальный [workaround](https://gist.github.com/bruzkovsky/a444af54c9d3715617c1f4855d623764), не проверено, универсальный или костыль.  
Выравнивание [вроде есть](http://fabricjs.com/docs/fabric.Textbox.html#originX), но в условиях ограниченного времени не завелось, да и по продуманности неудобно.  
Удобно когда, как в konva, задаешь верхний левый угол, ширину, высоту, и тип выравнивания по горизонтали/вертикали.
(в fabric [вроде сложнее](https://stackoverflow.com/questions/50656603/fabricjs-vertical-align-text-center))

И снова не приятен уровень качества документации
![docs](http://dl3.joxi.net/drive/2023/06/14/0018/2688/1219200/00/b535fbf92d.jpg)

### По умолчанию включен multiple drag'n'drop объектов

Попадающих в выделенную прямоугольную область с помощью левой кнопки мыши  
Как отключить декларативно через задание `props` у `new fabric.Canvas(canvasNodeId, props)`- непонятно.  
Мне известен способ только императивно:

-   создаются объекты холста
-   через цикл отключается свойство `selectable` у каждого объекта

```javascript
canvas.forEachObject(function (obj) {
    obj.selectable = false;
});
```

Либо каждому объекту при создании прописывать `props.selectable: false` - неудобно,  
но неудобство решаемо, если вокруг `fabric object` сделать `wrapper`, в котором задать как свойство по умолчанию

### Отслеживание событий на объектах либо полотне

Не проверял, вроде бы ок - [события мыши](http://fabricjs.com/events), [события touch](http://fabricjs.com/touch-events), еще [ссылка](https://github.com/fabricjs/fabric.js/wiki/Working-with-events)

### Отрисовка объектов кастомной формы

Не проверял, вроде бы ок
[ссылка 1](http://fabricjs.com/customization), [ссылка 2](http://fabricjs.com/freedrawing), [ссылка 3](http://fabricjs.com/test/svg_import/), [ссылка 4](http://fabricjs.com/controls-customization), [ссылка 5](http://fabricjs.com/custom-control-render)

### Экспорт расписания (pdf/изображение)

Отсутствует. Есть [issue](https://github.com/fabricjs/fabric.js/issues/5906) и [stackoverflow](https://stackoverflow.com/questions/23681325/convert-canvas-to-pdf) c идеями (не проверенными мной)

### Zoom/pan

[есть](http://fabricjs.com/fabric-intro-part-5)

### Интеграция с vue

Отсутствует.  
Есть только сторонняя [частичная](https://github.com/bensladden/vue-fabric-wrapper#currently-implemented-the-following-fabric-objects), последний коммит - в 2020г :skull:  
т.е. взаимодействовать придется либо в императивном стиле, либо самим делать декларативные обертки.

[По словам member](https://github.com/fabricjs/fabric.js/issues/7618#issuecomment-1014688873) библиотеки fabric

> we don't have many VUE3 experts here, probably none

### По возможности низкое потребление оперативной памяти

Не исследовано

### Совместимость с браузерами

Все современные браузеры поддерживаются, а конкретнее можно посмотреть по [ссылке](https://github.com/fabricjs/fabric.js/blob/master/README.md#supported-browsersenvironments)

### Лицензия, допускающая коммерческое использование

[MIT License](https://github.com/fabricjs/fabric.js/blob/master/LICENSE)

---

:grey_question: в раздумьях  
:new: недостаточно опыта  
:eyeglasses: по моему опыту  
:recycle: уменьшение проектных знаний  
:skull: EOL/RIP  
:outbox_tray: out-of-the-box
