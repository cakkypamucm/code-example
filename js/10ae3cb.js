(self.webpackChunkcode_example=self.webpackChunkcode_example||[]).push([[179],{2822:(e,t,r)=>{"use strict";r.d(t,{Z:()=>o});var a=r(1860),s=r.n(a);const i=window.matchMedia("(any-pointer: coarse)").matches,n={storage:s(),formatter:{normalizePropName:e=>(e.endsWith("ID")&&(e=`${e.slice(0,-2)}Id`),_.camelCase(e)),normalizePropNames:e=>_.isObject(e)?_.isArray(e)?e.map((e=>n.formatter.normalizePropNames(e))):Object.keys(e).reduce(((t,r)=>(t[n.formatter.normalizePropName(r)]=n.formatter.normalizePropNames(e[r]),t)),{}):e,toUniqueSpaces:e=>e.replace(/(\s)+/g,"$1")},sleep:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return new Promise((t=>setTimeout(t,e)))},retry:async(e,t)=>{let{onEachRetryError:r,retries:a,retryIntervalMs:s}=t;try{return await e()}catch(t){if(r(a),a<=0)throw t;return await n.sleep(s),n.retry(e,{onEachRetryError:r,retries:a-1,retryIntervalMs:s})}},isMobileDevice:()=>i},o=n},8532:(e,t,r)=>{"use strict";var a=r(6486),s=r.n(a),i=r(830),n=r(9963),o=r(6168),u=r.n(o),d=r(7484),c=r.n(d),h=(r(600),r(6036)),l=r.n(h),g=r(178),m=r.n(g),p=r(1646),f=r.n(p),y=r(8840),w=r.n(y),v=r(5130),k=r.n(v),P=r(1913),U=r.n(P),b=r(8393),O=r.n(b),A=r(4625),Z=r.n(A),C=r(2929),I=r.n(C),x=r(2861),V=r(8662),S=r(6252);const M={},E=(0,r(3744).Z)(M,[["render",function(e,t){const r=(0,S.up)("router-view");return(0,S.wg)(),(0,S.j4)(r)}]]);var R=r(2201),D=r(129),$=r.n(D),q=r(2262);const N=/Edge?\/(10[7-9]|1[1-9]\d|[2-9]\d{2}|\d{4,})(\.\d+|)(\.\d+|)|Firefox\/(10[7-9]|1[1-9]\d|[2-9]\d{2}|\d{4,})\.\d+(\.\d+|)|Chrom(ium|e)\/(10[89]|1[1-9]\d|[2-9]\d{2}|\d{4,})\.\d+(\.\d+|)|Maci.+ Version\/(1[6-9]|[2-9]\d|\d{3,})\.\d+([,.]\d+|)( Mobile\/\w+|) Safari\/|Chrome.+OPR\/(9[1-9]|\d{3,})\.\d+\.\d+|(CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS|CPU iPad OS)[ +]+(1[5-9]|[2-9]\d|\d{3,})[._]\d+([._]\d+|)|Android:?[ /-](1{2}[1-9]|1[2-9]\d|[2-9]\d{2}|\d{4,})(\.\d+|)(\.\d+|)|Mobile Safari.+OPR\/(7[3-9]|[89]\d|\d{3,})\.\d+\.\d+|Android.+Firefox\/(1{2}\d|1[2-9]\d|[2-9]\d{2}|\d{4,})\.\d+(\.\d+|)|Android.+Chrom(ium|e)\/(1{2}[1-9]|1[2-9]\d|[2-9]\d{2}|\d{4,})\.\d+(\.\d+|)|Android.+(UC? ?Browser|UCWEB|U3)[ /]?(1[3-9]|[2-9]\d|\d{3,})\.\d+\.\d+|SamsungBrowser\/(1[6-9]|[2-9]\d|\d{3,})\.\d+|Android.+MQ{2}Browser\/(1[3-9]|[2-9]\d|\d{3,})(\.\d+|)(\.\d+|)|K[Aa][Ii]OS\/([2-9]|\d{2,})\.\d+(\.\d+|)/;var T=r(6294),Q=r(2822);let j;const z="app.lastVisitedRoute";function B(e){return r(2275)(`./${e}.vue`)}const F="browser-is-not-supported",W=()=>!N.test(navigator.userAgent),K=(0,R.p7)({history:(0,R.r5)("/"),parseQuery:e=>$().parse(e),stringifyQuery:e=>$().stringify(e)||"",routes:[{path:"/",name:"index",redirect:{name:"aircraft.flights.gantt"}},{path:"/aircraft/flights/konva",name:"aircraft.flights.konva",component:()=>B("aircraft/flights/konva/index"),meta:{title:"Перелеты konva"}},{path:"/aircraft/flights/highcharts-gantt",name:"aircraft.flights.gantt",component:()=>B("aircraft/flights/highcharts-gantt/index"),meta:{title:"Перелеты highcharts-gantt"}},{path:"/aircraft",redirect:{path:"/aircraft/flights"}},{path:"/aircraft/flights",redirect:{name:"aircraft.flights.konva"}},{path:"/vehicle/routes",name:"vehicle.routes",component:()=>B("vehicle/routes/index"),meta:{title:"Маршруты транспортных средств"}},{path:"/vehicle/routes/:id(\\d+)",name:"vehicle.routes.id",component:()=>B("vehicle/routes/[id]"),props:e=>({id:+e.params.id}),meta:{title:"Маршрут {{ id }} транспортного средства"}},{path:"/vehicle",redirect:{name:"vehicle.routes"}},{path:"/login",name:"login",component:()=>B("login"),async beforeEnter(e,t,r){await new T.Z(K).isUserAuthenticated()?r({name:"index",replace:!0}):r()},meta:{public:!0,title:"Вход"}},{path:"/logout",name:"logout",async beforeEnter(e,t,r){try{await new T.Z(K).logout()}finally{r({name:"login",query:{redirect:{path:j.path,query:j.query}},replace:!0})}},meta:{public:!0}},{path:"/browser-is-not-supported",name:F,component:()=>B(F),beforeEnter(e,t,r){W()?r():r({name:"index",replace:!0})},meta:{public:!0,title:"Версия браузера не поддерживается"}},{path:"/:pathMatch(.*)*",name:"not-found",component:()=>B("not-found"),meta:{title:"Страница не найдена"}}]});K.beforeEach((async(e,t,r)=>{if(document.title=_.template(e?.meta?.title||"\ufeff")(e.params),j=Q.Z.storage.get(z),Q.Z.storage.remove(z),W()&&e.name!==F)return void r({name:F,replace:!0});const a=new T.Z(K);if(e.matched.some((e=>!e.meta.public)))return await a.isUserAuthenticated()?void r():void r({name:"login",query:{redirect:{path:e.path,query:e.query}}});r()})),window.addEventListener("beforeunload",(()=>{const e=(0,q.SU)(K.currentRoute);Q.Z.storage.set(z,{path:e.path,query:e.query})}));const L=K,G=(0,n.createApp)(E);G.config.globalProperties={productionAbsoluteUrl:"//github.com/cakkypamucm",Math},c().locale("ru"),c().extend(l()),c().extend(m()),c().extend(f()),window.dayjs=c(),U()(w()),O()(w()),Z()(w()),I()(w());const H=new Intl.NumberFormat("ru-RU").formatToParts(99999.99),{value:J}=H.find((e=>"decimal"===e.type)),{value:X}=H.find((e=>"group"===e.type));w().setOptions({lang:{decimalPoint:J,thousandsSep:X,weekdays:c().weekdays(),weekdaysShort:c().weekdaysMin(),months:c().months(),shortMonths:c().monthsShort()}}),G.use((0,i.WB)()).use(L).use(u(),{prefix:"K"}).use(k()).mount("#app"),(0,V.ZP)(x.Z,{retries:2,retryDelay:()=>50}),window.$http=x.Z,s().templateSettings.interpolate=/{{([\S\s]+?)}}/g,s().templateSettings.evaluate=/{#([\S\s]+?)#}/g,window._=s()},6294:(e,t,r)=>{"use strict";r.d(t,{Z:()=>d});r(7658);var a=r(2262),s=r(830),i=(r(1703),r(2822));class n{constructor(){this.storageIds={userData:"app.user.data",firstTime:"app.user.first.time",packageVersion:"app.package.version"},this.userData={id:1,name:"name"}}isUserAuthenticated(){return new Promise((e=>{e(i.Z.storage.has(this.storageIds.userData))}))}login(){return new Promise(((e,t)=>{const r=i.Z.storage.get(this.storageIds.userData);if(r)e(r);else try{const t=n._fakeQueryRetry("login",this.userData);i.Z.storage.set(this.storageIds.userData,t),e(t)}catch(e){t(e)}}))}async logout(){try{return await n._fakeQueryRetry("logout")}finally{i.Z.storage.remove(this.storageIds.userData)}}static async _fakeQueryRetry(e,t){const r=await i.Z.retry((()=>n._fakeQuery(e,t)),{onEachRetryError:t=>{console.debug(`${e}: неудачная попытка, осталось еще ${t} раз(а)`)},retries:2,retryIntervalMs:50});return console.debug(`${e}: успешное получение данных`),r}static _fakeQuery(e,t){return new Promise(((r,a)=>{setTimeout((()=>{Math.random()>.1**(1/3)?r(t):a(new Error(`Не удалось выполнить запрос ${e}`))}),400*Math.random())}))}getPackageVersion(){return new Promise((e=>{e(i.Z.storage.get(this.storageIds.packageVersion))}))}setPackageVersion(e){return new Promise((t=>{i.Z.storage.set(this.storageIds.packageVersion,e),t()}))}isUserNew(){return new Promise((e=>{e(!i.Z.storage.has(this.storageIds.firstTime))}))}setUserOld(){return new Promise((e=>{i.Z.storage.set(this.storageIds.firstTime,!1),e()}))}}const o=new n,u=(0,s.Q_)("auth",{state:()=>({userData:null}),actions:{isUserAuthenticated:()=>o.isUserAuthenticated(),async login(){this.userData=await o.login()},logout:()=>o.logout(),getPackageVersion:()=>o.getPackageVersion(),setPackageVersion:e=>o.setPackageVersion(e),isUserNew:()=>o.isUserNew(),setUserOld:()=>o.setUserOld()}});class d{constructor(e){if(d.instance)return d.instance;d.instance=this,this.$router=e,this.store=u(),this.scheduleTimeoutId=null,this.ensurePackageVersion()}async isUserAuthenticated(){const e=await this.store.isUserAuthenticated();clearTimeout(this.scheduleTimeoutId);const t=this.getCurrentRoute();return t.meta?.public||this.scheduleCheckAuth(),e}scheduleCheckAuth(){this.scheduleTimeoutId=setTimeout((async()=>{if(await this.isUserAuthenticated())this.scheduleCheckAuth();else{"login"!==this.getCurrentRoute().name&&this.$router.push({name:"login"})}}),6e4)}async login(){const e=await this.store.login(),t=this.getCurrentRoute(),{redirect:{path:r,query:a}}=t.query;return r&&r!==t.path?this.$router.push({path:r,query:a,replace:!0}):this.$router.push({name:"index",query:a}),e}logout(){return this.store.logout()}async ensurePackageVersion(){"1.9.2"!==await this.getPackageVersion()&&(await this.setPackageVersion("1.9.2"),this.$router.push({name:"logout"}))}getPackageVersion(){return this.store.getPackageVersion()}setPackageVersion(e){return this.store.setPackageVersion(e)}getCurrentRoute(){return(0,a.SU)(this.$router.currentRoute)}async isUserNew(){const e=await this.store.isUserNew();return e&&await this.setUserOld(),e}setUserOld(){return this.store.setUserOld()}}},2275:(e,t,r)=>{var a={"./aircraft/flights/highcharts-gantt/index.vue":[7526,216,599],"./aircraft/flights/konva/index.vue":[6351,216,295],"./browser-is-not-supported.vue":[3833,174],"./login.vue":[5719,216,44],"./not-found.vue":[3428,19],"./vehicle/routes/[id].vue":[3340,216,971,74],"./vehicle/routes/index.vue":[2887,216,971,72]};function s(e){if(!r.o(a,e))return Promise.resolve().then((()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],s=t[0];return Promise.all(t.slice(1).map(r.e)).then((()=>r(s)))}s.keys=()=>Object.keys(a),s.id=2275,e.exports=s},4654:()=>{}},e=>{e.O(0,[216],(()=>{return t=8532,e(e.s=t);var t}));e.O()}]);
//# sourceMappingURL=10ae3cb.js.map