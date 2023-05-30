# Архитектура и технологии

### Git

-   git-flow (`master`/`develop`)
-   [commit style](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit) :recycle: :new:

### Каталоги, файлы

-   [quasar](https://quasar.dev/quasar-cli-webpack/directory-structure)
-   `pages` именуются как в [nuxt](https://nuxt.com/docs/guide/directory-structure/pages#dynamic-routes) :recycle:
-   семантически похоже на [feature-sliced design](https://habr.com/ru/companies/inDrive/articles/693768/)
-   имена **всех** файлов/каталогов в [**kebab-case**](https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing), исключения лишь для vendor specific  
    _one case to rule them all_
-   [см. дополнительно](/src/README.md)

### Синтаксис

-   `ES latest === all Stage 4 (Finished) ES Proposals`  
    _and nothing else matters (иначе боль при смене синтаксиса в связи со Stage bump, когда отсутствует codemod)_
-   `babel`
-   `core-js`
-   `lodash`
-   **vue3 SFC** `Options API`
-   `scss`
-   `postcss`
-   `browserslist`
-   **w/o** `pug` _не нравится синтаксис_
-   **w/o** `jsx` _здесь нам не `react`_

### Lint

-   `eslint` `js,vue,md`
-   `stylelint` `css,scss,vue`
-   `prettier` `css,scss,js,json,vue,md,html`
-   `husky` для git client hook == `невалидное не попадает в repo`

### Vue-specific

-   `quasar` (`UI Kit`, `PWA/HMA/SSR/BEX/MPDA` etc. :outbox_tray:) with `webpack` (module bundler)
-   `Options API` (`Composition API` именно для сложных случаев composition, для остального [не хорошо влияет на архитектуру](https://tproger.ru/articles/obzor-vue-composition-api-realnost-okazalas-slozhnee/))
-   `pinia`
-   `scss` [scoped styling](https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling), import variables from ([js to scss](https://vuejs.org/api/sfc-css-features.html#v-bind-in-css) | [scss to js](/src/css/variables.module.scss))
-   `unplugin-vue-components`
-   `vueuse`

### Misc libs

-   `axios`
-   `dayjs`:recycle: , API очень похож на популярный [ранее](https://momentjs.com/docs/#/-project-status/) :skull: `moment.js`
-   [ag-grid](https://www.ag-grid.com/example), если не хватит возможностей [QTable](https://quasar.dev/vue-components/table/)

### TODO Misc && important :new:

-   [yarn](https://habr.com/ru/companies/gazprombank/articles/725992/)/`npm`/[pnpm](https://habr.com/ru/articles/587254/) :grey_question:
-   типизированные `service`/`api`, видимо, `typescript` ([несмотря](https://t.me/vuejs_club/998995) [на](https://t.me/vuejs_club/996462)) :new:  
    _`TODO` через `BFF` (возможно, [Zod](https://github.com/colinhacks/zod) :new: ) автоматизировать изменения в моделях_
-   [web-vitals](https://github.com/GoogleChrome/web-vitals#basic-usage) для удобной отладки просадки performance :new:  
    _через `CI` запускать тесты для измерения метрик, вести лог результатов_
-   мониторинг ошибок - видимо, [sentry](https://habr.com/ru/articles/557138/) (можно [локально](https://develop.sentry.dev/self-hosted/)) :new:  
    _описывают нередко на habr в проектах_
-   типизированные routes, возможно, [ts-routes](https://github.com/leancodepl/ts-routes) :new:
-   security - не удалось [подключить плагины](https://habr.com/ru/articles/445932/) :new:
    > A strong Content Security Policy (CSP) significantly reduces the risk of cross-site scripting (XSS) attacks. [Learn more](https://developer.chrome.com/docs/lighthouse/best-practices/csp-xss/)

### TODO

-   протестировать [webpack/esbuild-loader](https://www.npmjs.com/package/esbuild-loader) :new:

## Дополнения и изменения, welcome!

---

:grey_question: в раздумьях  
:new: недостаточно опыта  
:eyeglasses: по моему опыту  
:recycle: уменьшение проектных знаний  
:skull: EOL/RIP  
:outbox_tray: out-of-the-box
