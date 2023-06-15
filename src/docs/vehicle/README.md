# Задача - визуализация маршрутов транспортных средств

### Принцип работы

При переходе на страницу маршрутов до загрузки данных отображается preloader.  
После загрузки данных экран делится на две части.  
В левой части (sidebar с фиксированной шириной) отображается таблица `AgGrid` со списком маршрутов.  
Над таблицей расположены две кнопки: &laquo;маршруты&raquo;, &laquo;остановки&raquo;. Кнопка &laquo;маршруты&raquo; активна.  
При клике на кнопку &laquo;остановки&raquo; в таблице `AgGrid` отображаются остановки.

В правой части отображается карта `leaflet` со всеми маршрутами и их остановками.  
Остановки в прямом направлении используют синий маркер, в обратном - красный.  
При наведении на маршрут или остановку на карте появляется tooltip с именем маршрута или остановки.

При клике на маршрут в таблице или на его путь на карте отображается только он.  
Карта центрируется на маршруте таким образом, чтобы использовать максимальный зум и полностью вместить маршрут.

При [клике правой кнопкой мыши (или долгом тапе на mobile)](https://www.ag-grid.com/javascript-data-grid/context-menu/) на маршруте в таблице  
открывается выпадающее меню с одним пунктом &laquo;подробно&raquo;.  
При клике на кнопку &laquo;остановки&raquo; на карте отображаются только остановки.  
При клике на остановку в таблице остановок на карте отображается только она.
Карта центрируется на этой остановке.

При клике на пункт &laquo;подробно&raquo; открывается страница с адресом `/vehicle/routes/{id}` маршрута.  
На которой в левой части отображается имя маршрута, описание, кол-во остановок в прямом и
обратном направлении.  
В правой части - список остановок сначала в прямом направлении (текст выделен
синим), а затем - в обратном (текст выделен красным).  
И кнопка &laquo;назад&raquo; - для возврата к странице маршрутов.

### Детали реализации

Таблица маршрутов содержит колонки: Имя, Кол-во остановок.  
Таблица остановок содержит колонки Имя, Кол-во маршрутов, Направление (прямое/обратное).  
В качестве имени маршрута используется поле Name объекта маршрута.  
В качестве имени остановки используется поле Name объекта остановки.  
В качестве флага прямого/обратного направления для остановки используется поле
Forward объекта остановки.

### Механизм получения и описание входных данных

В качестве источника данных маршрутов и остановок используется [файл](/public/vehicle/routes-data.json).

### Дополнительные материалы

##### Маркер остановки в прямом направлении

```
<svg width="26" height="26" viewBox="0 0 26 26" fill="none"
xmlns="http://www.w3.org/2000/svg">
<path d="M13 17C15.2091 17 17 15.2091 17 13C17 10.7909 15.2091 9 13 9C10.7909 9 9
10.7909 9 13C9 15.2091 10.7909 17 13 17Z" stroke="blue" stroke-width="2"
stroke-miterlimit="10"/></svg>
```

##### Маркер остановки в обратном направлении

```
<svg width="26" height="26" viewBox="0 0 26 26" fill="none"
xmlns="http://www.w3.org/2000/svg">
<path d="M13 17C15.2091 17 17 15.2091 17 13C17 10.7909 15.2091 9 13 9C10.7909 9 9
10.7909 9 13C9 15.2091 10.7909 17 13 17Z" stroke="red" stroke-width="2"
stroke-miterlimit="10"/></svg>
```