# Архитектура и технологии

### Git

-   git-flow (`master`/`develop`)
-   язык коммитов/комментов - :ru:/:uk: :grey_question:
-   [commit style](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit) :recycle: :new:
-   [`yarn`](https://habr.com/ru/companies/gazprombank/articles/725992/)/`npm`/[`pnpm`](https://habr.com/ru/articles/587254/) :grey_question:

### Семантика/структура/feature-разбиение файлов/каталогов

Похожа :recycle: на:

-   [feature-sliced design](https://habr.com/ru/companies/inDrive/articles/693768/)
-   [`quasar`](https://quasar.dev/quasar-cli-webpack/directory-structure)/[`nuxt`](https://nuxt.com/docs/guide/directory-structure/nuxt)

`pages` именуются как в [`nuxt`](https://nuxt.com/docs/guide/directory-structure/pages#dynamic-routes) :recycle:

### Синтаксис

-   `ES latest === all Stage 4 (Finished) ES Proposals`  
    _and nothing else matters (Stage 3 and so on :put_litter_in_its_place:)_
-   `babel`
-   `core-js`
-   `lodash`
-   **vue3 SFC**
-   `browserslist`
-   `scss`
-   `postcss`
-   **w/o** `pug` _не нравится синтаксис_
-   **w/o** `jsx` _здесь нам не `react`_

### Lint

-   `eslint` `js,vue,md`
-   `stylelint` `css,scss,vue`
-   `prettier` `css,scss,js,json,vue,md,html`
-   имена **всех** файлов/каталогов в [**`kebab-case`**](https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing), исключения лишь для vendor specific  
    _one :ring: to rule them all_
-   git `pre-commit` client hook (`husky` e.g.) == `невалидное не попадает в repo`

### Vue framework `>=` module bundler `+` UI Kit/validating `+` store/routing etc. `+` SPA/PWA/HMA/SSR/BEX/MPDA :outbox_tray:

-   `quasar`/`nuxt`, _если `nuxt` - хочу полный контроль над `router.js`_ :grey_question:
-   `webpack`/`vite` :grey_question:
-   **w/o** `vuetify` [ибо](https://habr.com/ru/articles/709492/) :skull:

### Vue-specific

-   `options api` (`composition api` именно для сложных случаев composition, для остального [не хорошо влияет на архитектуру](https://tproger.ru/articles/obzor-vue-composition-api-realnost-okazalas-slozhnee/))  
    _отдельно заостряет вопрос [ссылка](https://vuejsdevelopers.com/2020/02/17/vue-composition-api-when-to-use/) из статьи выше, как авторитетный источник - интернациональная vue weekly-рассылка_
-   `scss` [scoped styling](https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for),`css vars` based on `v-bind`
-   `unplugin-vue-components`
-   `pinia`
-   `vueuse`

### Misc & important :new:

-   типизированные `service`/`api`, видимо, `typescript` ([несмотря](https://t.me/vuejs_club/998995) [на](https://t.me/vuejs_club/996462)) :new:  
    _`TODO` через `BFF` (возможно, [Zod](https://github.com/colinhacks/zod) :new: ) автоматизировать изменения в моделях_
-   [`web-vitals`](https://github.com/GoogleChrome/web-vitals#basic-usage) для удобной отладки просадки performance :new:  
    _через `CI` запускать тесты для измерения метрик, вести лог результатов_
-   мониторинг ошибок - видимо, [`sentry`](https://habr.com/ru/articles/557138/) (можно [локально](https://develop.sentry.dev/self-hosted/)) :new:  
    _описывают нередко на habr в проектах_
-   типизированные routes, возможно, [ts-routes](https://github.com/leancodepl/ts-routes) :new:

### Misc libs

-   `axios`
-   `dayjs`:recycle: , API очень похож на популярный [ранее](https://momentjs.com/docs/#/-project-status/) :skull: `moment.js`
-   [`ag-grid`](https://www.ag-grid.com/example), если не хватит возможностей [`QTable`](https://quasar.dev/vue-components/table/)

### TODO

-   security - не удалось [подключить плагины](https://habr.com/ru/articles/445932/) :new:
-   протестировать [webpack/esbuild-loader](https://www.npmjs.com/package/esbuild-loader) :new:

### Дополнения и изменения, welcome!

---

:grey_question: в раздумьях  
:new: недостаточно опыта  
:eyeglasses: по моему опыту  
:recycle: уменьшение проектных знаний  
:skull: EOL/RIP  
:outbox_tray: out-of-the-box
