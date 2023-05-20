"use strict";(self.webpackChunkcode_example=self.webpackChunkcode_example||[]).push([[184],{5256:(e,t,i)=>{i.d(t,{Z:()=>g});var r=i(6767),n=i.n(r);var a=i(2822);const o="#cecece",l="#8eaaff",s="#c1c1c1",g={rowHeight:40,stageBackgroundColor:"white",fixedLayerBorderStroke:"black",betweenItemsLineStroke:o,timelinePrimaryColor:n()(o).darken(.4).hex(),fontDefaults:{fontSize:16,fontFamily:"Helvetica",wrap:"none",ellipsis:!0},mainLayer:{flightRectTimeoutMs:4e3,rect:{regularFill:l,activeFill:n()(l).darken(.25).hex(),padding:6,strokeWidth:2},noAirplanesMessage:{width:245,height:16,text:"Добавьте сюда воздушные суда",fill:"#6c757d"}},fixedAside:{width:110,textStartX:15},fixedHeader:{height:40},stageScrollbarLayer:{bar:{minimumGreaterDimension:64,width:a.Z.isMobileDevice()?32:12,padding:0,regularFill:s,activeFill:n()(s).darken(.1).hex(),opacity:.7},airplaneNumber:{y:22,fontSize:12},datetime:{text:"Дата/время",x:35,y:5,fontSize:12}},timelineGrid:{opacity:{specialHour:1,regularHour:.3}},timelineLegend:{startOfDay:{underlineY:26,textStartY:8,dateFormat:"DD MMM"},startOfQuarterDay:{underlineY:32,textStartY:18,fontSize:12,dateFormat:"HH:mm"}},flightSummary:{dateFormat:"DD MMM, HH:mm"},departure:"Вылет",arrival:"Посадка",airplane:{generateId:()=>+Math.random().toFixed(5).slice(2),number:"Номер борта",prefixName:"RA-"}}},1041:(e,t,i)=>{i.d(t,{Z:()=>o});var r=i(4475),n=i(5256);const a={store:(0,r.Z)(),widthCorrectionPx:n.Z.fixedAside.width,heightCorrectionPx:n.Z.fixedHeader.height,totalHeight(){return this.store.airplanes.length?this.heightCorrectionPx+this.store.airplanes.length*n.Z.rowHeight:n.Z.mainLayer.noAirplanesMessage.height},totalWidth(){return this.store.maxArrivalMs?this.widthCorrectionPx+this.dateToPx(new Date(this.store.maxArrivalMs))+this.getTotalWidthCorrection():n.Z.mainLayer.noAirplanesMessage.width},dateToPx(e){const t=new Date(this.store.minDepartureMs);return dayjs(e).diff(t,"minute")},getCurrentXByIndex(e){return this.widthCorrectionPx+this.dateToPx(dayjs(this.store.minDepartureMs).add(1,"hour").startOf("hour").toDate())+(e-1)*this.getHourInPx()},getCurrentDateByIndex(e){return dayjs(this.store.minDepartureMs).add(e,"hour").startOf("hour")},getHourInPx(){return this.dateToPx(dayjs(this.store.minDepartureMs).add(1,"hour").toDate())},getTotalWidthCorrection(){let e=this.getHourInPx()/2;return this.isSpecialHour(dayjs(this.store.maxArrivalMs).hour())&&(e+=this.getHourInPx()/2),e},isSpecialHour:e=>e%6==0,setTextDefaults:e=>_.defaults(e,n.Z.fontDefaults)},o=new class{constructor(){this.store=(0,r.Z)(),this.timeline=a}async fetch(e,t){const i=await this.store.fetch(e,t);return window.backdoor=this.store,i}getFlightSummary(e){const t=this.store.getAirplaneByFlightId(e),i=this.store.getFlight(e);if(null==t||null==i)return"Некорректный flightId";const r=e=>dayjs(e).format(n.Z.flightSummary.dateFormat);return`${n.Z.airplane.number}: ${t.name}        \n        \n${n.Z.departure}: ${r(i.departureDate)}\n        \n${n.Z.arrival}: ${r(i.arrivalDate)}`}}},4475:(e,t,i)=>{i.d(t,{Z:()=>s});i(7658);var r=i(830),n=i(5256);const a={fetch(e,t){return new Promise((i=>i(this.generate(e,t))))},generate(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:12,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;return _.range(e).map((()=>{const e=n.Z.airplane.generateId(),i={id:e,name:`${n.Z.airplane.prefixName+e}`},r=dayjs().subtract(1,"day").startOf("hour");return i.flights=_.range(t).map((e=>{let t=r.add(Math.round(4*(e+Math.random())*4)/4,"hour");const i=t.add(r.add(Math.round(4*(e+1)),"hour").diff(t,"hour"),"hour");return i.isSame(t)&&(t=i.subtract(45,"minute")),{id:n.Z.airplane.generateId(),departureDate:t.toDate(),arrivalDate:i.toDate()}})),i}))}},o=new Map,l=new Map,s=(0,r.Q_)("airplane",{state:()=>({airplanes:[],alreadyFetched:!1}),getters:{getFlight:e=>t=>{const i=o.get(t);if(null==i)return null;return e.airplanes[i.airplaneIndex].flights[i.flightIndex]},getAirplaneByFlightId:e=>t=>{const i=o.get(t);return null==i?null:e.airplanes[i.airplaneIndex]},minDepartureMs:e=>e.airplanes.reduce(((e,t)=>t.flights.reduce(((e,t)=>Math.min(e,t.departureDate.getTime())),e)),Number.MAX_SAFE_INTEGER),maxArrivalMs:e=>e.airplanes.reduce(((e,t)=>t.flights.reduce(((e,t)=>Math.max(e,t.arrivalDate.getTime())),e)),0)},actions:{async fetch(e,t){this.airplanes=await a.fetch(e,t),this.alreadyFetched=!0,this.airplanes.forEach(((e,t)=>{l.set(e.id,{airplaneIndex:t}),e.flights.forEach(((e,i)=>{o.set(e.id,{airplaneIndex:t,flightIndex:i})}))}))},push(e){if(!l.get(e.id)){this.airplanes.push(e);const t=this.airplanes.length-1;l.set(e.id,{airplaneIndex:t}),e.flights.forEach(((e,i)=>{o.set(e.id,{airplaneIndex:t,flightIndex:i})}))}},splice(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];this.airplanes.splice(t).forEach((e=>{l.delete(e.id),e.flights.forEach((e=>{o.delete(e.id)}))}))}}})},2550:(e,t,i)=>{i.d(t,{Z:()=>a});var r=i(3002),n=i(2822);i(4748);const a=new class{constructor(){this.toast=(0,r.NO)({position:"top-right",transition:"none",timeout:5e3,maxToasts:5,pauseOnFocusLoss:!1,pauseOnHover:!1,draggable:!0,draggablePercent:.25,hideProgressBar:!0})}showError(e){this.toast.error(n.Z.formatter.toUniqueSpaces(e))}showInfo(e,t){let{timeout:i}=t;this.toast.info(n.Z.formatter.toUniqueSpaces(e),{timeout:i})}clear(){this.toast.clear()}}},891:(e,t,i)=>{i.d(t,{Z:()=>d});var r=i(6252),n=i(9963);const a={class:"wrapper-page"},o={key:0,class:"main-header"},l={key:1,class:"main"},s={key:2,class:"main-footer"};const g={props:{show:{type:Boolean,default:!0}}};const d=(0,i(3744).Z)(g,[["render",function(e,t,i,g,d,h){return(0,r.wy)(((0,r.wg)(),(0,r.iD)("div",a,[e.$slots.header?((0,r.wg)(),(0,r.iD)("header",o,[(0,r.WI)(e.$slots,"header",{},void 0,!0)])):(0,r.kq)("",!0),e.$slots.default?((0,r.wg)(),(0,r.iD)("main",l,[(0,r.WI)(e.$slots,"default",{},void 0,!0)])):(0,r.kq)("",!0),e.$slots.footer?((0,r.wg)(),(0,r.iD)("footer",s,[(0,r.WI)(e.$slots,"footer",{},void 0,!0)])):(0,r.kq)("",!0)],512)),[[n.vShow,i.show]])}],["__scopeId","data-v-aeb90b02"]])},7414:(e,t,i)=>{i.r(t),i.d(t,{default:()=>F});var r=i(891),n=i(6252),a=i(3577);const o={class:"fps"},l={ref:"stageContainer",class:"stage-container"};i(4633);var s=i(5762),g=i(1041),d=i(4475);var h=i(185),c=i.n(h),f=i(5256);const u={emits:{"flight-rect-pointerdown":e=>!!e,"flight-rect-pointerenter":e=>!!e,"flight-rect-pointerleave":e=>!!e},data:()=>({airplanes:(0,d.Z)().airplanes,config:f.Z,module:g.Z}),methods:{onPointerdownLayerHandler(e){e.target instanceof c().Rect&&this.onPointerdownRectHandler(e.target.attrs.dataId,e)},onPointerdownRectHandler(e,t){this.$emit("flight-rect-pointerdown",e);const i=t.target;i.fill(this.config.mainLayer.rect.activeFill),i.stroke(this.config.mainLayer.rect.activeFill),setTimeout((()=>{i.fill(this.config.mainLayer.rect.regularFill),i.stroke(this.config.mainLayer.rect.regularFill)}),this.config.mainLayer.flightRectTimeoutMs)},getStage(){return this.$refs.layer.getStage()}}};var m=i(3744);const p=(0,m.Z)(u,[["render",function(e,t,i,r,a,o){const l=(0,n.up)("k-line"),s=(0,n.up)("k-rect"),g=(0,n.up)("k-text"),d=(0,n.up)("k-layer");return(0,n.wg)(),(0,n.j4)(d,{ref:"layer",onPointerdown:o.onPointerdownLayerHandler},{default:(0,n.w5)((()=>[a.airplanes.length?((0,n.wg)(),(0,n.iD)(n.HY,{key:0},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.airplanes,((e,t)=>((0,n.wg)(),(0,n.j4)(l,{key:e.id,config:{points:[0,a.config.fixedHeader.height+a.config.rowHeight*t,a.module.timeline.totalWidth(),a.config.fixedHeader.height+a.config.rowHeight*t],stroke:a.config.betweenItemsLineStroke}},null,8,["config"])))),128)),(0,n.WI)(e.$slots,"timeline-grid"),((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.airplanes,((t,i)=>((0,n.wg)(),(0,n.iD)(n.HY,{key:t.id},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(t.flights,(t=>((0,n.wg)(),(0,n.j4)(s,{key:t.id,config:{dataId:t.id,x:a.config.fixedAside.width+a.module.timeline.dateToPx(t.departureDate),y:a.config.fixedHeader.height+a.config.rowHeight*i+a.config.mainLayer.rect.padding,width:a.module.timeline.dateToPx(t.arrivalDate)-a.module.timeline.dateToPx(t.departureDate),height:a.config.rowHeight-2*a.config.mainLayer.rect.padding,fill:a.config.mainLayer.rect.regularFill,stroke:a.config.mainLayer.rect.regularFill,strokeWidth:a.config.mainLayer.rect.strokeWidth,perfectDrawEnabled:!1},onPointerenter:i=>e.$emit("flight-rect-pointerenter",t.id),onPointerleave:i=>e.$emit("flight-rect-pointerleave",t.id)},null,8,["config","onPointerenter","onPointerleave"])))),128))],64)))),128))],64)):((0,n.wg)(),(0,n.j4)(g,{key:1,config:a.module.timeline.setTextDefaults({text:a.config.mainLayer.noAirplanesMessage.text,fill:a.config.mainLayer.noAirplanesMessage.fill})},null,8,["config"]))])),_:3},8,["onPointerdown"])}]]),y=p;const x={data:()=>({airplanes:(0,d.Z)().airplanes,config:f.Z,module:g.Z}),methods:{getStage(){return this.$refs.layer.getStage()}}},w=(0,m.Z)(x,[["render",function(e,t,i,r,a,o){const l=(0,n.up)("k-rect"),s=(0,n.up)("k-text"),g=(0,n.up)("k-line"),d=(0,n.up)("k-layer");return(0,n.wg)(),(0,n.j4)(d,{ref:"layer"},{default:(0,n.w5)((()=>[a.airplanes.length?((0,n.wg)(),(0,n.iD)(n.HY,{key:0},[(0,n.Wm)(l,{config:{x:0,y:a.config.fixedHeader.height,width:a.config.fixedAside.width,height:a.module.timeline.totalHeight(),fill:a.config.stageBackgroundColor}},null,8,["config"]),((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.airplanes,((e,t)=>((0,n.wg)(),(0,n.iD)(n.HY,{key:e.name},[(0,n.Wm)(s,{config:a.module.timeline.setTextDefaults({x:a.config.fixedAside.textStartX,y:a.config.fixedHeader.height+10+a.config.rowHeight*t+4,text:e.name,width:a.config.fixedAside.width-2*a.config.fixedAside.textStartX,fill:a.config.fixedLayerBorderStroke})},null,8,["config"]),(0,n.Wm)(g,{config:{points:[0,a.config.fixedHeader.height+a.config.rowHeight*t,a.config.fixedAside.width-1,a.config.fixedHeader.height+a.config.rowHeight*t],stroke:a.config.betweenItemsLineStroke}},null,8,["config"])],64)))),128)),(0,n.Wm)(g,{config:{points:[a.config.fixedAside.width,0,a.config.fixedAside.width,a.module.timeline.totalHeight()],stroke:a.config.fixedLayerBorderStroke}},null,8,["config"])],64)):(0,n.kq)("",!0)])),_:1},512)}]]),H=w;const k={data:()=>({airplanes:(0,d.Z)().airplanes,config:f.Z,module:g.Z}),methods:{getStage(){return this.$refs.layer.getStage()}}},S=(0,m.Z)(k,[["render",function(e,t,i,r,a,o){const l=(0,n.up)("k-rect"),s=(0,n.up)("k-line"),g=(0,n.up)("k-layer");return(0,n.wg)(),(0,n.j4)(g,{ref:"layer"},{default:(0,n.w5)((()=>[a.airplanes.length?((0,n.wg)(),(0,n.iD)(n.HY,{key:0},[(0,n.Wm)(l,{config:{x:0,y:0,width:a.module.timeline.totalWidth(),height:a.config.fixedHeader.height-1,fill:a.config.stageBackgroundColor}},null,8,["config"]),(0,n.WI)(e.$slots,"timeline-legend"),(0,n.Wm)(s,{config:{points:[a.config.fixedAside.width,a.config.fixedHeader.height-1,a.module.timeline.totalWidth(),a.config.fixedHeader.height-1],stroke:a.config.fixedLayerBorderStroke}},null,8,["config"])],64)):(0,n.kq)("",!0)])),_:3},512)}]]);const C={props:{stage:{type:Object,required:!0},stageConfig:{type:Object,required:!0},mainLayer:{type:Object,required:!0},verticalScrollableLayers:{type:Array,required:!0},horizontalScrollableLayers:{type:Array,required:!0}},data:()=>({airplanes:(0,d.Z)().airplanes,config:f.Z,module:g.Z,scrollBarOptions:{width:f.Z.stageScrollbarLayer.bar.width,padding:f.Z.stageScrollbarLayer.bar.padding,regularFill:f.Z.stageScrollbarLayer.bar.regularFill,activeFill:f.Z.stageScrollbarLayer.bar.activeFill,opacity:f.Z.stageScrollbarLayer.bar.opacity},vBarConfig:null,hBarConfig:null}),created(){const e=this;this.vBarConfig={width:this.scrollBarOptions.width,fill:this.scrollBarOptions.regularFill,y:this.scrollBarOptions.padding,opacity:this.scrollBarOptions.opacity,draggable:!0,dragBoundFunc(t){return t.x=e.stageConfig.width-e.scrollBarOptions.padding-e.scrollBarOptions.width,t.y=Math.max(Math.min(t.y,e.stageConfig.height-this.height()-e.scrollBarOptions.padding),e.scrollBarOptions.padding),t}},this.hBarConfig={height:this.scrollBarOptions.width,fill:this.scrollBarOptions.regularFill,x:this.scrollBarOptions.padding,opacity:this.scrollBarOptions.opacity,draggable:!0,dragBoundFunc(t){return t.x=Math.max(Math.min(t.x,e.stageConfig.width-this.width()-e.scrollBarOptions.padding),e.scrollBarOptions.padding),t.y=e.stageConfig.height-e.scrollBarOptions.padding-e.scrollBarOptions.width,t}},window.addEventListener("resize",_.throttle(this.onWindowResizeHandler,100)),this.onWindowResizeHandler()},mounted(){this.stage.on("wheel",this.onWheelHandler)},methods:{onWindowResizeHandler(){Object.assign(this.vBarConfig,{x:this.stageConfig.width-this.scrollBarOptions.padding-this.scrollBarOptions.width,height:Math.round(this.stageConfig.height*this.stageConfig.height/g.Z.timeline.totalHeight())}),Object.assign(this.hBarConfig,{y:this.stageConfig.height-this.scrollBarOptions.padding-this.scrollBarOptions.width,width:this.ensureComfortableScrollbarSize(Math.ceil(this.stageConfig.width*this.stageConfig.width/g.Z.timeline.totalWidth()))})},onPointerenterHandler(e){e.fill=this.scrollBarOptions.activeFill},onPointerleaveHandler(e){e.fill=this.scrollBarOptions.regularFill},onDragmoveVBarHandler(){const e=this.$refs.vBar.getStage(),t=this.stageConfig.height-2*this.scrollBarOptions.padding-e.height(),i=(e.y()-this.scrollBarOptions.padding)/t;this.verticalScrollableLayers.forEach((e=>e.y(-(g.Z.timeline.totalHeight()-this.stageConfig.height)*i)))},onDragmoveHBarHandler(){const e=this.$refs.hBar.getStage(),t=this.stageConfig.width-2*this.scrollBarOptions.padding-e.width(),i=(e.x()-this.scrollBarOptions.padding)/t;this.horizontalScrollableLayers.forEach((e=>e.x(-(g.Z.timeline.totalWidth()-this.stageConfig.width)*i)))},onWheelHandler(e){let{evt:t}=e;t.preventDefault();const i=t.deltaX,r=t.deltaY,n=this.$refs.vBar?.getStage(),a=this.$refs.hBar?.getStage(),o=-(g.Z.timeline.totalWidth()-this.stageConfig.width),l=Math.max(o,Math.min(this.mainLayer.x()-i,0)),s=-(g.Z.timeline.totalHeight()-this.stageConfig.height),d=Math.max(s,Math.min(this.mainLayer.y()-r,0));n&&this.verticalScrollableLayers.forEach((e=>e.y(d))),a&&this.horizontalScrollableLayers.forEach((e=>e.x(l)));const h=this.stageConfig.height-2*this.scrollBarOptions.padding-(n?.height()||0),c=this.mainLayer.y()/(-g.Z.timeline.totalHeight()+this.stageConfig.height)*h+this.scrollBarOptions.padding;n?.y(c);const f=this.stageConfig.width-2*this.scrollBarOptions.padding-(a?.width()||0),u=this.mainLayer.x()/(-g.Z.timeline.totalWidth()+this.stageConfig.width)*f+this.scrollBarOptions.padding;a?.x(u)},ensureComfortableScrollbarSize:e=>Math.max(f.Z.stageScrollbarLayer.bar.minimumGreaterDimension,e)}},B=(0,m.Z)(C,[["render",function(e,t,i,r,a,o){const l=(0,n.up)("k-rect"),s=(0,n.up)("k-line"),g=(0,n.up)("k-text"),d=(0,n.up)("k-layer");return(0,n.wg)(),(0,n.j4)(d,null,{default:(0,n.w5)((()=>[a.airplanes.length?((0,n.wg)(),(0,n.iD)(n.HY,{key:0},[i.stageConfig.height<a.module.timeline.totalHeight()?((0,n.wg)(),(0,n.j4)(l,{key:0,ref:"vBar",config:a.vBarConfig,onPointerenter:t[0]||(t[0]=e=>o.onPointerenterHandler(a.vBarConfig)),onPointerleave:t[1]||(t[1]=e=>o.onPointerleaveHandler(a.vBarConfig)),onDragmove:o.onDragmoveVBarHandler},null,8,["config","onDragmove"])):(0,n.kq)("",!0),i.stageConfig.width<a.module.timeline.totalWidth()?((0,n.wg)(),(0,n.j4)(l,{key:1,ref:"hBar",config:a.hBarConfig,onPointerenter:t[2]||(t[2]=e=>o.onPointerenterHandler(a.hBarConfig)),onPointerleave:t[3]||(t[3]=e=>o.onPointerleaveHandler(a.hBarConfig)),onDragmove:o.onDragmoveHBarHandler},null,8,["config","onDragmove"])):(0,n.kq)("",!0),(0,n.Wm)(l,{config:{x:0,y:0,width:a.config.fixedAside.width+1,height:a.config.fixedHeader.height+1,fill:a.config.stageBackgroundColor}},null,8,["config"]),(0,n.Wm)(s,{config:{points:[a.config.fixedAside.width,a.config.fixedHeader.height+1,a.config.fixedAside.width,a.config.fixedHeader.height-2],stroke:a.config.fixedLayerBorderStroke}},null,8,["config"]),(0,n.Wm)(g,{config:a.module.timeline.setTextDefaults({x:a.config.fixedAside.textStartX,y:a.config.stageScrollbarLayer.airplaneNumber.y,text:a.config.airplane.number,fill:a.config.fixedLayerBorderStroke,fontSize:a.config.stageScrollbarLayer.airplaneNumber.fontSize})},null,8,["config"]),(0,n.Wm)(g,{config:a.module.timeline.setTextDefaults({x:a.config.stageScrollbarLayer.datetime.x,y:a.config.stageScrollbarLayer.datetime.y,text:a.config.stageScrollbarLayer.datetime.text,fill:a.config.fixedLayerBorderStroke,fontSize:a.config.stageScrollbarLayer.datetime.fontSize})},null,8,["config"])],64)):(0,n.kq)("",!0)])),_:1})}]]);const D={data:()=>({config:f.Z,timeline:g.Z.timeline,floor:Math.floor})},v=(0,m.Z)(D,[["render",function(e,t,i,r,a,o){const l=(0,n.up)("k-line");return a.timeline.totalWidth()/a.timeline.getHourInPx()>=1?((0,n.wg)(!0),(0,n.iD)(n.HY,{key:0},(0,n.Ko)(a.floor(a.timeline.totalWidth()/a.timeline.getHourInPx()),(e=>((0,n.wg)(),(0,n.j4)(l,{key:e,config:{points:[a.timeline.getCurrentXByIndex(e),0,a.timeline.getCurrentXByIndex(e),a.timeline.totalHeight()],stroke:a.config.timelinePrimaryColor,opacity:a.timeline.isSpecialHour(a.timeline.getCurrentDateByIndex(e).hour())?a.config.timelineGrid.opacity.specialHour:a.config.timelineGrid.opacity.regularHour}},null,8,["config"])))),128)):(0,n.kq)("",!0)}]]);const L={data:()=>({config:f.Z,timeline:g.Z.timeline,floor:Math.floor})},b=(0,m.Z)(L,[["render",function(e,t,i,r,a,o){const l=(0,n.up)("k-line"),s=(0,n.up)("k-text");return a.timeline.totalWidth()/a.timeline.getHourInPx()>=1?((0,n.wg)(!0),(0,n.iD)(n.HY,{key:0},(0,n.Ko)(a.floor(a.timeline.totalWidth()/a.timeline.getHourInPx()),(e=>((0,n.wg)(),(0,n.iD)(n.HY,{key:e},[0===a.timeline.getCurrentDateByIndex(e).hour()?((0,n.wg)(),(0,n.iD)(n.HY,{key:0},[(0,n.Wm)(l,{config:{points:[a.timeline.getCurrentXByIndex(e),a.config.timelineLegend.startOfDay.underlineY,a.timeline.getCurrentXByIndex(e),a.config.fixedHeader.height],stroke:a.config.timelinePrimaryColor}},null,8,["config"]),(0,n.Wm)(l,{config:{points:[a.timeline.getCurrentXByIndex(e),a.config.timelineLegend.startOfDay.underlineY,a.timeline.getCurrentXByIndex(e)+a.timeline.getHourInPx(),a.config.timelineLegend.startOfDay.underlineY],stroke:a.config.timelinePrimaryColor}},null,8,["config"]),(0,n.Wm)(s,{config:a.timeline.setTextDefaults({x:a.timeline.getCurrentXByIndex(e),y:a.config.timelineLegend.startOfDay.textStartY,text:a.timeline.getCurrentDateByIndex(e).format(a.config.timelineLegend.startOfDay.dateFormat),fill:a.config.timelinePrimaryColor})},null,8,["config"])],64)):a.timeline.isSpecialHour(a.timeline.getCurrentDateByIndex(e).hour())?((0,n.wg)(),(0,n.iD)(n.HY,{key:1},[(0,n.Wm)(l,{config:{points:[a.timeline.getCurrentXByIndex(e),a.config.timelineLegend.startOfQuarterDay.underlineY,a.timeline.getCurrentXByIndex(e),a.config.fixedHeader.height],stroke:a.config.timelinePrimaryColor}},null,8,["config"]),(0,n.Wm)(l,{config:{points:[a.timeline.getCurrentXByIndex(e),a.config.timelineLegend.startOfQuarterDay.underlineY,a.timeline.getCurrentXByIndex(e)+a.timeline.getHourInPx()/2,a.config.timelineLegend.startOfQuarterDay.underlineY],stroke:a.config.timelinePrimaryColor}},null,8,["config"]),(0,n.Wm)(s,{config:a.timeline.setTextDefaults({x:a.timeline.getCurrentXByIndex(e),y:a.config.timelineLegend.startOfQuarterDay.textStartY,fontSize:a.config.timelineLegend.startOfQuarterDay.fontSize,text:a.timeline.getCurrentDateByIndex(e).format(a.config.timelineLegend.startOfQuarterDay.dateFormat),fill:a.config.timelinePrimaryColor})},null,8,["config"])],64)):(0,n.kq)("",!0)],64)))),128)):(0,n.kq)("",!0)}]]);var Z=i(2550),I=i(9963);const P={components:{MainLayer:y,FixedAsideLayer:H,FixedHeaderLayer:S,StageScrollbarLayer:B,TimelineGrid:v,TimelineLegend:b},data:()=>({moduleConfig:f.Z,module:g.Z,store:(0,d.Z)(),toast:Z.Z,stage:null,configs:{stage:{width:0,height:0},stageScrollbar:{props:{readyToMount:!1}}},fps:(0,s.sgm)()}),watch:{"store.airplanes":{handler(){this.actualizeStageDimensions()},deep:!0}},beforeUnmount(){Z.Z.clear()},created(){this.init()},methods:{async init(){await g.Z.fetch(),await this.initConfigs()},async initConfigs(){window.addEventListener("resize",_.throttle(this.actualizeStageDimensions,100)),this.actualizeStageDimensions(),await this.$nextTick(),this.stage=this.$refs.stage.getStage(),this.stage.container().style.backgroundColor=this.moduleConfig.stageBackgroundColor;const e=this.$refs.main.getStage(),t=this.$refs.fixedAside.getStage(),i=this.$refs.fixedHeader.getStage();Object.assign(this.configs.stageScrollbar.props,{stage:this.stage,stageConfig:this.configs.stage,mainLayer:e,verticalScrollableLayers:[e,t],horizontalScrollableLayers:[e,i]}),this.configs.stageScrollbar.props.readyToMount=!0},actualizeStageDimensions(){this.configs.stage.width=Math.min(g.Z.timeline.totalWidth(),this.$refs.stageContainer.offsetWidth),this.configs.stage.height=Math.min(g.Z.timeline.totalHeight(),this.$refs.stageContainer.offsetHeight),this.stage?this.stage.getContainer().style.border=""+(this.store.airplanes.length?"1px solid black":"none"):setImmediate(this.actualizeStageDimensions)}}},O=()=>{(0,I.useCssVars)((e=>({b178873c:e.moduleConfig.stageBackgroundColor,f8839cc0:e.moduleConfig.mainLayer.noAirplanesMessage.width})))},M=P.setup;P.setup=M?(e,t)=>(O(),M(e,t)):O;const W=P,F=(0,m.Z)(W,[["render",function(e,t,i,s,g,d){const h=(0,n.up)("timeline-grid"),c=(0,n.up)("main-layer"),f=(0,n.up)("fixed-aside-layer"),u=(0,n.up)("timeline-legend"),m=(0,n.up)("fixed-header-layer"),p=(0,n.up)("stage-scrollbar-layer"),y=(0,n.up)("k-stage"),x=r.Z;return(0,n.wg)(),(0,n.j4)(x,null,{default:(0,n.w5)((()=>[(0,n._)("div",o,"FPS: "+(0,a.toDisplayString)(g.fps),1),(0,n._)("div",l,[g.configs.stage.height?((0,n.wg)(),(0,n.j4)(y,{key:0,ref:"stage",config:g.configs.stage},{default:(0,n.w5)((()=>[(0,n.Wm)(c,{ref:"main",onFlightRectPointerdown:t[0]||(t[0]=e=>g.toast.showInfo(g.module.getFlightSummary(e),{timeout:g.moduleConfig.mainLayer.flightRectTimeoutMs})),onFlightRectPointerenter:t[1]||(t[1]=e=>g.stage.container().style.cursor="pointer"),onFlightRectPointerleave:t[2]||(t[2]=e=>g.stage.container().style.cursor="default")},{"timeline-grid":(0,n.w5)((()=>[(0,n.Wm)(h)])),_:1},512),(0,n.Wm)(f,{ref:"fixedAside"},null,512),(0,n.Wm)(m,{ref:"fixedHeader"},{"timeline-legend":(0,n.w5)((()=>[(0,n.Wm)(u)])),_:1},512),g.configs.stageScrollbar.props.readyToMount?((0,n.wg)(),(0,n.j4)(p,(0,a.normalizeProps)((0,n.dG)({key:0},g.configs.stageScrollbar.props)),null,16)):(0,n.kq)("",!0)])),_:1},8,["config"])):(0,n.kq)("",!0)],512)])),_:1})}],["__scopeId","data-v-71b9a780"]])}}]);
//# sourceMappingURL=99715d7.chunk.js.map