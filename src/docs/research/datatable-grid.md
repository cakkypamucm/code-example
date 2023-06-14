# Дефолтный [QTable](https://quasar.dev/vue-components/table#qtable-api) из quasar - соответствие критериям отбора решения

### Редактирование данных строки через форму:

Из коробки только edit in place (для одной ячейки)
самим добавить несложно:

-   подписаться на событие @row-click (см. таб Events из [QTable API](https://quasar.dev/vue-components/table#qtable-api))
-   отрисовать в [стиле](https://codepen.io/mickey58/pen/eYYVqWv) (нажать Add Row)

### Фильтр/поиск по данным

-   [клиентский](https://codepen.io/b0otable/pen/PozWLYR)
-   [серверный](https://quasar.dev/vue-components/table#server-side-pagination-filter-and-sorting) (демо из оф. документации, мне непонятно, работает ли демо)

### Сортировка

[есть](https://quasar.dev/vue-components/table#basic-usage) (столбец Calories, например)

### Виртуальный скроллинг

[есть](https://quasar.dev/vue-components/table#virtual-scrolling)

### Edit in place (для одной ячейки)

[есть](https://quasar.dev/vue-components/table#popup-editing)

### Частичный ререндер, websockets

Проблем не должно возникнуть, т.к. мы полностью контролируем [сами данные](https://github.com/quasarframework/quasar/blob/dev/docs/src/examples/QTable/Basic.vue#L32)

### Меню по правой кнопке (на всякий случай):

-   подписаться на событие @row-contextmenu (см. таб Events из [QTable API](https://quasar.dev/vue-components/table#qtable-api))
-   отрисовать в [стиле](https://quasar.dev/vue-components/menu/#context-menu)
-   единственное, у меня в Chrome не работает (возможно, из-за chrome extension), в Firefox - все ок

### Альтернативы (соответствие критериям отбора решения не исследовано)

-   [datatables](https://datatables.net/) - [бесплатная](https://datatables.net/purchase/index), работал на проектах и больше не хочу
-   [ag-grid](https://www.ag-grid.com/) - [платная](https://www.ag-grid.com/license-pricing/)  
    чаще других grid видел в вакансиях (распространена, востребована на рынке т.е.)  
    Других standalone grid и не встречалось там, только в составе UI Kit:
-   [Kendo UI](https://www.telerik.com/kendo-vue-ui/grid) | [DevExtreme](https://js.devexpress.com/Overview/DataGrid/) | [Webix](https://webix.com/widget/datatable/) - все платные
-   [Prime Vue](https://primevue.org/datatable/) | [Naive UI](https://www.naiveui.com/en-US/os-theme/components/table) | [Element Plus](https://element-plus.org/en-US/component/table.html) - все бесплатные
-   [awesome-vue#table](https://github.com/vuejs/awesome-vue#table)

_// у нас quasar, в т.ч. т.к. он больше, чем просто UI KIt (например, SSR, PWA)_
