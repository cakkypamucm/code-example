# [Highcharts Gantt](https://www.highcharts.com/blog/products/gantt/) - соответствие критериям отбора решения

### Отслеживание событий на объектах либо полотне

-   события типа `click`[есть](https://api.highcharts.com/highcharts/plotOptions.series.events), правый `click` (`contextmenu`) можно [добавить](https://github.com/highcharts/highcharts/issues/15038#issuecomment-772469400)
-   `drag`/`move` [есть](https://www.highcharts.com/demo/gantt/interactive-gantt) (_отсутствует, понимание как на mobile не просто перемещать, а изменять начало/конец -  
    в худшем случае, будет добавлено расширение для библиотеки_)
-   `select` [есть](https://www.highcharts.com/demo/gantt/interactive-gantt), точно умеет `multiple` через `Ctrl`+`click`

### Возможность спуститься на уровень работы с объектом Canvas

[Есть](https://api.highcharts.com/class-reference/Highcharts.Point#graphic), только надо иметь в виду, что графики `highcharts` рендерят в `SVG`, а не `canvas`

### Возможность написания расширений для библиотеки

[есть](https://www.highcharts.com/docs/extending-highcharts/extending-highcharts)

### Отсутствие артефактов при рендеринге

-   у других графиков `highcharts` не встречалось артефактов.  
    Кроме [задокументированных](https://www.highcharts.com/docs/advanced-chart-features/boost-module#caveats) при подключении модуля `boost`
    для рендеринга [сотен тысяч точек](https://www.highcharts.com/docs/advanced-chart-features/boost-module#samples) с помощью `WebGL`/`canvas`
-   именно для `gantt` модуль `boost` [сейчас недоступен](https://github.com/highcharts/highcharts/issues/17415)
-   открытых issues у `gantt` [хватает](https://github.com/highcharts/highcharts/issues?q=is%3Aissue+is%3Aopen+gantt).  
    _Критичны ли они? Насколько редки? Встретятся ли?_ :new:

### Отсутствие "тормозов" при большом количестве объектов

-   [нагрузочное тестирование 1500 объектов](https://cakkypamucm.github.io/code-example/#/aircraft/flights/highcharts-gantt?aircraftsCount=30&flightsCount=50)
-   [пишут](https://github.com/highcharts/highcharts/issues/17415), что 10 000+ (десять тысяч) объектов уже тормозят

### По возможности низкое потребление оперативной памяти

Не исследовано

### Отрисовка объектов кастомной формы

[есть](https://api.highcharts.com/class-reference/Highcharts.SVGRenderer)

### Возможность реализации прокрутки

[Есть](https://www.highcharts.com/docs/chart-concepts/scrollbar) + [navigator](https://www.highcharts.com/demo/gantt/with-navigation)

### Экспорт расписания (pdf/изображение)

-   [есть](https://www.highcharts.com/docs/export-module/export-module-overview)
    > The downloads can be created on the client side if you use the `offline-exporting.js` module,  
    > otherwise they are generated on Highcharts' featured server or optionally **your own server**
-   [демо](https://www.highcharts.com/demo/gantt/download-pdf)
-   watermark вроде можно [прикрутить](https://www.highcharts.com/forum/viewtopic.php?t=22396)

### Наличие и качество документации по библиотеке

`100/100` (самая лучшая документация, для сравнения `vue == 90/100`, `webpack == 80/100`) :eyeglasses:  
[user-friendly intro](https://www.highcharts.com/blog/tutorials/how-to-learn-highcharts/)

### Лицензия, допускающая коммерческое использование

Библиотека **платная**  
![цены](http://dl3.joxi.net/drive/2023/05/16/0018/2688/1219200/00/3100316323.jpg)

### Скорость разработки

` === 100/100 && DX === 100/100` (для сравнения `vue == 90/100`) :eyeglasses:

### Поддержка responsive

[есть](https://www.highcharts.com/docs/chart-concepts/responsive)

### Совместимость с браузерами

![браузеры](http://dl3.joxi.net/drive/2023/05/16/0018/2688/1219200/00/ca85735361.jpg)

### Интеграция с vue

[есть](https://www.highcharts.com/integrations/vue/)

### TODO

-   zoom [изучить](https://www.highcharts.com/docs/chart-concepts/zooming), [ссылка 1](https://www.highcharts.com/forum/viewtopic.php?t=45829)
-   проверить/допилить выбор всех rect между выбранными началом и концом диапазона через `Shift` + `click`

---

:grey_question: в раздумьях  
:new: недостаточно опыта  
:eyeglasses: по моему опыту  
:recycle: уменьшение проектных знаний  
:skull: EOL/RIP  
:outbox_tray: out-of-the-box
