# [Konva](https://konvajs.org/docs/sandbox/index.html) - соответствие критериям отбора решения

### Отслеживание событий на объектах либо полотне

-   события типа `click`[есть](https://konvajs.org/docs/events/Pointer_Events.html)
-   правый `click` (`contextmenu`) [есть](https://stackoverflow.com/questions/48837250/is-it-possible-to-catch-the-right-click-event-on-a-shape-group-in-konvajs) :new:
-   `drag`/`move` [есть](https://konvajs.org/docs/drag_and_drop/Drag_and_Drop.html)
-   `select` [есть](https://konvajs.org/docs/select_and_transform/Basic_demo.html), точно умеет `multiple` через `Ctrl`+`click` и `Shift` + `click`
-   [есть](https://konvajs.org/docs/sandbox/Gestures.html) поддержка gestures на mobile - см. несколько страниц с демо  
    ![gestures](http://dl3.joxi.net/drive/2023/05/23/0018/2688/1219200/00/4d821e18f9.jpg)
-   события на desktop и mobile - см. 30+ страниц с демо  
    ![events](http://dl4.joxi.net/drive/2023/05/23/0018/2688/1219200/00/68eaa05687.jpg)

### Возможность спуститься на уровень работы с объектом Canvas (она же - отрисовка объектов кастомной формы)

[Есть](https://konvajs.org/docs/shapes/Custom.html)

### Возможность написания расширений для библиотеки

Не документирована. Полагаю, возможно :new:

### Отсутствие артефактов при рендеринге

Например, артефакты с рендерингом шрифта, похожие на `fabric.js` (см. `footer` скриншота)  
![rendering font bug](https://i.gyazo.com/f7da9c4f4a96bc15c00d324e84e40408.gif)

### Отсутствие "тормозов" при большом количестве объектов

[Нагрузочное тестирование 1500 объектов](https://cakkypamucm.github.io/code-example/#/aircraft/flights/?aircraftsCount=30&flightsCount=50)

### По возможности низкое потребление оперативной памяти

_Не исследовано_

### Возможность реализации прокрутки

[есть](https://konvajs.org/docs/sandbox/Canvas_Scrolling.html):

-   пп. 1-3 - **не production-ready**, размер `stage`/`canvas` зависит от количества данных (и performance, обратно пропорциональна, соответственно)
-   пункт 4 - решено остановиться на нем после экспериментальной проверки :new:

### Экспорт расписания (pdf/изображение)

-   [pdf](https://konvajs.org/docs/sandbox/Canvas_to_PDF.html)
-   [изображение](https://konvajs.org/docs/data_and_serialization/High-Quality-Export.html)
-   `watermark` прийдется самим реализовывать

### Наличие и качество документации по библиотеке

` >= 85/100` :new:

### Лицензия, допускающая коммерческое использование

[MIT](https://github.com/konvajs/konva/blob/master/LICENSE) [License](https://github.com/konvajs/vue-konva/blob/master/LICENSE)

### Возможность получить `support`

Есть разные уровни поддержки:

-   free [issues](https://github.com/konvajs/konva/issues)

-   [paid](https://lavrton.com/consulting/#calls)

> `Library maintainer` will answer all your questions.  
> Anything that will help you boost the development process and understand the workflow.  
> If necessary I will provide short demos to explain some aspects of questions.  
> **Price - 4000 USD per two weeks**

### Скорость разработки

` >= 80/100 && DX >= 80/100` :new:

### Поддержка responsive

[есть](https://konvajs.org/docs/sandbox/Responsive_Canvas.html)

### [Совместимость с браузерами](https://konvajs.org/api/#toc2__anchor)

> `Konva` works in all modern mobile and desktop browsers.  
> A browser need to be capable to run javascript code from `ES2015` spec.  
> For older browsers you may need polyfills for missing functions.  
> At the current moment Konva doesn't work in `IE11` directly.  
> To make it work you just need to provide some polyfills such as  
> `Array.prototype.find`, `String.prototype.trimLeft`, `String.prototype.trimRight`, `Array.from`

За `polyfills` в проекте отвечает [core-js](https://github.com/zloirock/core-js) - все OK

### Интеграция с vue

[есть](https://www.highcharts.com/integrations/vue/)

### TODO

-   выяснить, в каком виде есть zoom?
-   научиться использовать для resize rect [Transformer](https://konvajs.org/docs/select_and_transform/Transformer_Styling.html),
    [ссылка 1](https://konvajs.org/docs/select_and_transform/Transform_Events.html), [ссылка 2](https://konvajs.org/docs/select_and_transform/Resize_Snaps.html),
    [ссылка 3](https://konvajs.org/docs/vue/Transformer.html)
-   как реализуются графически связи между rect в духе Gantt?  
    т.е. самому ли low level рисовать связи (как line или path) между rect или есть более высокоуровневое решение?

---

:grey_question: в раздумьях  
:new: недостаточно опыта  
:eyeglasses: по моему опыту  
:recycle: уменьшение проектных знаний  
:skull: EOL/RIP  
:outbox_tray: out-of-the-box
