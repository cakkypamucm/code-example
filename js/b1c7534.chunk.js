"use strict";(self.webpackChunkcode_example=self.webpackChunkcode_example||[]).push([[295],{4164:(e,t,i)=>{i.d(t,{Z:()=>h});var r=i(6767),n=i.n(r);var a=i(2822);const o="#cecece",s="#8eaaff",l="#c1c1c1",g="HH:mm",d="DD.MM",c=`DD MMM, ${g}`,h={rowHeight:60,stageBackgroundColor:"white",fixedLayerBorderStroke:"black",betweenItemsLineStroke:o,timelinePrimaryColor:n()(o).darken(.4).hex(),mainLayer:{flightRectTimeoutMs:4e3,rect:{regularFill:s,activeFill:n()(s).darken(.25).hex(),padding:6,strokeWidth:2},noAircraftsMessage:{width:245,height:16,text:"Добавьте сюда воздушные суда",fill:"#6c757d"}},fixedAside:{width:110},fixedHeader:{height:40},stageScrollbarLayer:{bar:{minimumGreaterDimension:64,width:a.Z.isMobileDevice()?32:12,padding:0,regularFill:l,activeFill:n()(l).darken(.1).hex(),opacity:.7},aircraftNumber:{y:22,fontSize:12},datetime:{text:"Дата/время",y:5,fontSize:12}},timelineGrid:{opacity:{specialHour:1,regularHour:.3}},timelineLegend:{startOfDay:{underlineY:26,textStartY:8,dateFormat:d},startOfQuarterDay:{underlineY:32,textStartY:18,fontSize:12,dateFormat:g}},chartTitle:"Расписание перелетов",departure:"Вылет",arrival:"Посадка",aircraft:{generateId:()=>+Math.random().toFixed(5).slice(2),number:"Номер борта",prefixName:"RA-"},serviceModes:{availability:{id:"availability",color:"#7f84ea",text:"Availability"},maintenance:{id:"maintenance",color:"#cd7e31",text:"Maintenance"}},arrow:{color:"black",pointerSize:2,strokeWidth:2,mainHeight:20},brackets:{size:10,strokeColor:"blue"},timeFormat:g,shortTimeFormat:"H",dateFormat:c,shortDateFormat:d}},6755:(e,t,i)=>{i.d(t,{Z:()=>o});var r=i(7578),n=i(4164);const a={store:(0,r.Z)(),widthCorrectionPx:n.Z.fixedAside.width,heightCorrectionPx:n.Z.fixedHeader.height,totalHeight(){return this.store.aircrafts.length?this.heightCorrectionPx+this.store.aircrafts.length*n.Z.rowHeight:n.Z.mainLayer.noAircraftsMessage.height},totalWidth(){return this.store.maxArrivalMs?this.widthCorrectionPx+this.dateToPx(new Date(this.store.maxArrivalMs))+this.getTotalWidthCorrection():n.Z.mainLayer.noAircraftsMessage.width},dateToPx(e){const t=new Date(this.store.minDepartureMs);return dayjs(e).diff(t,"minute")},getCurrentXByIndex(e){return this.widthCorrectionPx+this.dateToPx(dayjs(this.store.minDepartureMs).add(1,"hour").startOf("hour").toDate())+(e-1)*this.getHourInPx()},getCurrentDateByIndex(e){return dayjs(this.store.minDepartureMs).add(e,"hour").startOf("hour")},getHourInPx(){return this.dateToPx(dayjs(this.store.minDepartureMs).add(1,"hour").toDate())},getTotalWidthCorrection(){let e=this.getHourInPx()/2;return this.isSpecialHour(dayjs(this.store.maxArrivalMs).hour())&&(e+=this.getHourInPx()/2),e},isSpecialHour:e=>e%6==0},o=new class{constructor(){this.store=(0,r.Z)(),this.timeline=a}async fetch(e,t){const i=await this.store.fetch(e,t);return window.backdoor=this.store,i}getFlightSummary(e){const t=this.store.getAircraftByFlightId(e),i=this.store.getFlight(e);if(null==t||null==i)return"Некорректный flightId";const r=e=>dayjs(e).format(n.Z.dateFormat);return`${n.Z.aircraft.number}: ${t.name}        \n        \n${n.Z.departure}: ${r(i.departureDate)}\n        \n${n.Z.arrival}: ${r(i.arrivalDate)}`}}},7578:(e,t,i)=>{i.d(t,{Z:()=>l});i(7658);var r=i(830),n=i(4164);const a={fetch(e,t){return new Promise((i=>i(this.generate(e,t))))},generate(e,t){e=Number.parseInt(e),(Number.isNaN(e)||e<0)&&(e=12),t=Number.parseInt(t),(Number.isNaN(t)||t<=0)&&(t=10);return _.range(e).map((()=>{const e=n.Z.aircraft.generateId(),i={id:e,name:`${n.Z.aircraft.prefixName+e}`},r=dayjs().subtract(1,"day").startOf("hour");return i.flights=_.range(t).map((e=>{let t=r.add(Math.round(4*(e+Math.random())*4)/4,"hour");const i=t.add(r.add(Math.round(4*(e+1)),"hour").diff(t,"hour"),"hour");i.isSame(t)&&(t=i.subtract(45,"minute"));const a={id:n.Z.aircraft.generateId(),departureDate:t.utc().toDate(),arrivalDate:i.utc().toDate()};return Math.random()>.8&&(a.serviceMode={},a.serviceMode.id=Math.random()>.5?n.Z.serviceModes.availability.id:n.Z.serviceModes.maintenance.id),a})),i}))}},o=new Map,s=new Map,l=(0,r.Q_)("aircraft",{state:()=>({aircrafts:[],alreadyFetched:!1}),getters:{getFlight:e=>t=>{const i=s.get(t);return null==i?null:e.aircrafts[i.aircraftIndex].flights[i.flightIndex]},getAircraftByFlightId:e=>t=>{const i=s.get(t);return null==i?null:e.aircrafts[i.aircraftIndex]},minDepartureMs:e=>e.aircrafts.reduce(((e,t)=>t.flights.reduce(((e,t)=>Math.min(e,t.departureDate.getTime())),e)),Number.MAX_SAFE_INTEGER),maxArrivalMs:e=>e.aircrafts.reduce(((e,t)=>t.flights.reduce(((e,t)=>Math.max(e,t.arrivalDate.getTime())),e)),0)},actions:{async fetch(e,t){this.aircrafts=await a.fetch(e,t),this.alreadyFetched=!0,this.aircrafts.forEach(((e,t)=>{o.set(e.id,{aircraftIndex:t}),e.flights.forEach(((e,i)=>{s.set(e.id,{aircraftIndex:t,flightIndex:i})}))}))},push(e){if(!o.get(e.id)){this.aircrafts.push(e);const t=this.aircrafts.length-1;o.set(e.id,{aircraftIndex:t}),e.flights.forEach(((e,i)=>{s.set(e.id,{aircraftIndex:t,flightIndex:i})}))}},splice(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];this.aircrafts.splice(t).forEach((e=>{o.delete(e.id),e.flights.forEach((e=>{s.delete(e.id)}))}))}}})},2550:(e,t,i)=>{i.d(t,{Z:()=>a});var r=i(3002),n=i(2822);i(4748);const a=new class{constructor(){this.toast=(0,r.NO)({position:"top-right",transition:"none",timeout:5e3,maxToasts:5,pauseOnFocusLoss:!1,pauseOnHover:!1,draggable:!0,draggablePercent:.25,hideProgressBar:!0})}showError(e){this.toast.error(n.Z.formatter.toUniqueSpaces(e))}showInfo(e,t){let{timeout:i}=t;this.toast.info(n.Z.formatter.toUniqueSpaces(e),{timeout:i})}clear(){this.toast.clear()}}},891:(e,t,i)=>{i.d(t,{Z:()=>d});var r=i(6252),n=i(9963);const a={class:"wrapper-page"},o={key:0,class:"main-header"},s={key:1,class:"main"},l={key:2,class:"main-footer"};const g={props:{show:{type:Boolean,default:!0}}};const d=(0,i(3744).Z)(g,[["render",function(e,t,i,g,d,c){return(0,r.wy)(((0,r.wg)(),(0,r.iD)("div",a,[e.$slots.header?((0,r.wg)(),(0,r.iD)("header",o,[(0,r.WI)(e.$slots,"header",{},void 0,!0)])):(0,r.kq)("",!0),e.$slots.default?((0,r.wg)(),(0,r.iD)("main",s,[(0,r.WI)(e.$slots,"default",{},void 0,!0)])):(0,r.kq)("",!0),e.$slots.footer?((0,r.wg)(),(0,r.iD)("footer",l,[(0,r.WI)(e.$slots,"footer",{},void 0,!0)])):(0,r.kq)("",!0)],512)),[[n.vShow,i.show]])}],["__scopeId","data-v-aeb90b02"]])},3723:(e,t,i)=>{i.r(t),i.d(t,{default:()=>V});var r=i(891),n=i(6252),a=i(3577);const o={class:"fps"},s={class:"chart-title"},l=["href"],g={ref:"stageContainer",class:"stage-container"};i(4633);var d=i(5762),c=i(2201),h=i(2550),f=i(6755),u=i(7578),m=i(4164);const p={props:{config:{type:Object,default:()=>{}}},data:()=>({finalConfig:{}}),watch:{config:{deep:!0,immediate:!0,handler(){Object.assign(this.finalConfig,this.config)}}}},y={extends:p,inheritAttrs:!1,data:()=>({finalConfig:{fontSize:16,fontFamily:"Helvetica",verticalAlign:"top",align:"center",fill:"black",wrap:"none",ellipsis:!0}}),created(){this.finalConfig.width||console.warn("нужно задать width для работы ellipsis и align"),"top"===this.finalConfig.verticalAlign||this.finalConfig.height||console.debug("нужно задать height для работы verticalAlign")}};var w=i(3744);const x=(0,w.Z)(y,[["render",function(e,t,i,r,a,o){const s=(0,n.up)("k-text",!0);return(0,n.wg)(),(0,n.j4)(s,(0,n.dG)({config:a.finalConfig},e.$attrs),null,16,["config"])}]]);const b={extends:p,inheritAttrs:!1,data:()=>({finalConfig:{fill:"aquamarine"}})},H=(0,w.Z)(b,[["render",function(e,t,i,r,a,o){const s=(0,n.up)("k-line",!0);return(0,n.wg)(),(0,n.j4)(s,(0,n.dG)({config:a.finalConfig},e.$attrs),null,16,["config"])}]]);const C={extends:p,inheritAttrs:!1,data:()=>({finalConfig:{fill:"aquamarine"}}),methods:{getStage(){return this.$refs.rect.getStage()}}},v=(0,w.Z)(C,[["render",function(e,t,i,r,a,o){const s=(0,n.up)("k-rect",!0);return(0,n.wg)(),(0,n.j4)(s,(0,n.dG)({ref:"rect",config:a.finalConfig},e.$attrs),null,16,["config"])}]]);const k={props:{flight:{type:Object,required:!0},aircraftIndex:{type:Number,required:!0}},emits:{"flight-rect-pointerenter":e=>!!e,"flight-rect-pointerleave":e=>!!e},data:()=>({module:f.Z,config:m.Z})},S=(0,w.Z)(k,[["render",function(e,t,i,r,a,o){const s=v,l=x;return i.flight.serviceMode?((0,n.wg)(),(0,n.iD)(n.HY,{key:0},[(0,n.Wm)(s,{config:{x:a.config.fixedAside.width+a.module.timeline.dateToPx(i.flight.departureDate),y:a.config.fixedHeader.height+a.config.rowHeight*i.aircraftIndex+a.config.mainLayer.rect.padding,width:a.module.timeline.dateToPx(i.flight.arrivalDate)-a.module.timeline.dateToPx(i.flight.departureDate),height:a.config.rowHeight-2*a.config.mainLayer.rect.padding,fill:a.config.serviceModes[i.flight.serviceMode.id].color,stroke:a.config.serviceModes[i.flight.serviceMode.id].color,strokeWidth:a.config.mainLayer.rect.strokeWidth,perfectDrawEnabled:!1}},null,8,["config"]),(0,n.Wm)(l,{config:{dataId:i.flight.id,text:a.config.serviceModes[i.flight.serviceMode.id].text,x:a.config.fixedAside.width+a.module.timeline.dateToPx(i.flight.departureDate),y:a.config.fixedHeader.height+a.config.rowHeight*i.aircraftIndex+a.config.mainLayer.rect.padding,width:a.module.timeline.dateToPx(i.flight.arrivalDate)-a.module.timeline.dateToPx(i.flight.departureDate),height:a.config.rowHeight-2*a.config.mainLayer.rect.padding,verticalAlign:"middle"},onPointerenter:t[0]||(t[0]=t=>e.$emit("flight-rect-pointerenter",i.flight.id)),onPointerleave:t[1]||(t[1]=t=>e.$emit("flight-rect-pointerleave",i.flight.id))},null,8,["config"])],64)):(0,n.kq)("",!0)}]]);const Z={props:{flight:{type:Object,required:!0},pos:{type:Object,required:!0}},data(){return{config:m.Z,baseX:this.pos.start.x+this.pos.padding.x,baseY:this.pos.start.y+this.pos.padding.y,date:dayjs(this.flight.departureDate).format("HH:mm")}}};const D={props:{flight:{type:Object,required:!0},pos:{type:Object,required:!0}},data:()=>({config:m.Z})};const B={props:{flight:{type:Object,required:!0},pos:{type:Object,required:!0}},data(){return{config:m.Z,baseX:this.pos.end.x-this.pos.padding.x,baseY:this.pos.end.y-this.pos.flight.height+this.pos.padding.y,date:dayjs(this.flight.arrivalDate).format("HH:mm")}}},L={components:{FlightStart:(0,w.Z)(Z,[["render",function(e,t,i,r,a,o){const s=H,l=x;return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(s,{config:{points:[a.baseX,a.baseY+a.config.arrow.mainHeight,a.baseX,a.baseY,a.baseX+a.config.arrow.pointerSize,a.baseY+a.config.arrow.pointerSize,a.baseX-a.config.arrow.pointerSize,a.baseY+a.config.arrow.pointerSize],stroke:a.config.arrow.color}},null,8,["config"]),(0,n.Wm)(l,{config:{text:a.date,x:a.baseX+i.pos.padding.date,y:a.baseY+a.config.arrow.pointerSize-5,rotation:90,align:"left",width:50,fontSize:10}},null,8,["config"])],64)}]]),FlightBody:(0,w.Z)(D,[["render",function(e,t,i,r,a,o){const s=H;return(0,n.wg)(),(0,n.j4)(s,{config:{points:[i.pos.start.x,i.pos.start.y+i.pos.flight.height-a.config.brackets.size,i.pos.start.x,i.pos.start.y+i.pos.flight.height,i.pos.start.x+i.pos.flight.width,i.pos.start.y+i.pos.flight.height,i.pos.start.x+i.pos.flight.width,i.pos.start.y+i.pos.flight.height-a.config.brackets.size],stroke:a.config.brackets.strokeColor}},null,8,["config"])}]]),FlightEnd:(0,w.Z)(B,[["render",function(e,t,i,r,a,o){const s=H,l=x;return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(s,{config:{points:[a.baseX,a.baseY,a.baseX,a.baseY+a.config.arrow.mainHeight,a.baseX-a.config.arrow.pointerSize,a.baseY+a.config.arrow.mainHeight-a.config.arrow.pointerSize,a.baseX,a.baseY+a.config.arrow.mainHeight,a.baseX+a.config.arrow.pointerSize,a.baseY+a.config.arrow.mainHeight-a.config.arrow.pointerSize],stroke:a.config.arrow.color}},null,8,["config"]),(0,n.Wm)(l,{config:{text:a.date,x:i.pos.end.x-a.config.arrow.pointerSize-5,y:i.pos.end.y-i.pos.padding.y+a.config.arrow.pointerSize-i.pos.padding.date,rotation:90,align:"left",width:50,fontSize:10}},null,8,["config"])],64)}]])},props:{flight:{type:Object,required:!0},aircraftIndex:{type:Number,required:!0}},emits:{"flight-rect-pointerenter":e=>!!e,"flight-rect-pointerleave":e=>!!e},data(){const e=m.Z.fixedAside.width+f.Z.timeline.dateToPx(this.flight.departureDate),t=m.Z.fixedHeader.height+m.Z.rowHeight*this.aircraftIndex+m.Z.mainLayer.rect.padding,i=f.Z.timeline.dateToPx(this.flight.arrivalDate)-f.Z.timeline.dateToPx(this.flight.departureDate),r=m.Z.rowHeight-2*m.Z.mainLayer.rect.padding;return{module:f.Z,config:m.Z,pos:{padding:{x:m.Z.arrow.strokeWidth+2,y:m.Z.arrow.mainHeight,date:12},start:{x:e,y:t},end:{x:e+i,y:t+r},flight:{width:i,height:r}}}}},M={components:{FlightServiceMode:S,FlightUsualMode:(0,w.Z)(L,[["render",function(e,t,i,r,a,o){const s=(0,n.up)("flight-start"),l=(0,n.up)("flight-body"),g=(0,n.up)("flight-end");return i.flight.serviceMode?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)(n.HY,{key:0},[(0,n.Wm)(s,{flight:i.flight,pos:a.pos},null,8,["flight","pos"]),(0,n.Wm)(l,{flight:i.flight,pos:a.pos},null,8,["flight","pos"]),(0,n.Wm)(g,{flight:i.flight,pos:a.pos},null,8,["flight","pos"])],64))}]])},emits:{"flight-rect-pointerdown":e=>!!e,"flight-rect-pointerenter":e=>!!e,"flight-rect-pointerleave":e=>!!e},data:()=>({module:f.Z,store:(0,u.Z)(),config:m.Z}),methods:{onPointerdownLayerHandler(e){e.target?.attrs?.dataId&&this.onPointerdownRectHandler(e.target.attrs.dataId,e)},onPointerdownRectHandler(e,t){this.$emit("flight-rect-pointerdown",e);const i=t.target;i.fill(this.config.mainLayer.rect.activeFill),i.stroke(this.config.mainLayer.rect.activeFill),setTimeout((()=>{i.fill(this.config.mainLayer.rect.regularFill),i.stroke(this.config.mainLayer.rect.regularFill)}),this.config.mainLayer.flightRectTimeoutMs)},getStage(){return this.$refs.layer.getStage()}}},O=(0,w.Z)(M,[["render",function(e,t,i,r,a,o){const s=H,l=(0,n.up)("flight-service-mode"),g=(0,n.up)("flight-usual-mode"),d=x,c=(0,n.up)("k-layer");return(0,n.wg)(),(0,n.j4)(c,{ref:"layer",onPointerdown:o.onPointerdownLayerHandler},{default:(0,n.w5)((()=>[a.store.aircrafts.length?((0,n.wg)(),(0,n.iD)(n.HY,{key:0},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.store.aircrafts,((e,t)=>((0,n.wg)(),(0,n.j4)(s,{key:e.id,config:{points:[0,a.config.fixedHeader.height+a.config.rowHeight*t,a.module.timeline.totalWidth(),a.config.fixedHeader.height+a.config.rowHeight*t],stroke:a.config.betweenItemsLineStroke}},null,8,["config"])))),128)),(0,n.WI)(e.$slots,"timeline-grid"),((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.store.aircrafts,((t,i)=>((0,n.wg)(),(0,n.iD)(n.HY,{key:t.id},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(t.flights,(t=>((0,n.wg)(),(0,n.iD)(n.HY,{key:t.id},[t.serviceMode?((0,n.wg)(),(0,n.j4)(l,{key:0,flight:t,"aircraft-index":i,onFlightRectPointerenter:i=>e.$emit("flight-rect-pointerenter",t.id),onFlightRectPointerleave:i=>e.$emit("flight-rect-pointerleave",t.id)},null,8,["flight","aircraft-index","onFlightRectPointerenter","onFlightRectPointerleave"])):((0,n.wg)(),(0,n.j4)(g,{key:1,flight:t,"aircraft-index":i},null,8,["flight","aircraft-index"]))],64)))),128))],64)))),128))],64)):((0,n.wg)(),(0,n.j4)(d,{key:1,config:{text:a.config.mainLayer.noAircraftsMessage.text,width:a.config.mainLayer.noAircraftsMessage.width,fill:a.config.mainLayer.noAircraftsMessage.fill}},null,8,["config"]))])),_:3},8,["onPointerdown"])}]]),I=O;const P={inheritAttrs:!1,props:{config:{type:Object,required:!0}},data:()=>({rectConfig:{fill:m.Z.stageBackgroundColor}}),watch:{config:{deep:!0,immediate:!0,handler(){Object.assign(this.rectConfig,this.config)}}}},W=(0,w.Z)(P,[["render",function(e,t,i,r,a,o){const s=v;return(0,n.wg)(),(0,n.j4)(s,(0,n.dG)({config:a.rectConfig},e.$attrs),null,16,["config"])}]]),F={components:{OpaqueRect:W},data:()=>({module:f.Z,store:(0,u.Z)(),config:m.Z}),methods:{getStage(){return this.$refs.layer.getStage()}}},A=(0,w.Z)(F,[["render",function(e,t,i,r,a,o){const s=(0,n.up)("opaque-rect"),l=x,g=H,d=(0,n.up)("k-layer");return(0,n.wg)(),(0,n.j4)(d,{ref:"layer"},{default:(0,n.w5)((()=>[a.store.aircrafts.length?((0,n.wg)(),(0,n.iD)(n.HY,{key:0},[(0,n.Wm)(s,{config:{x:0,y:a.config.fixedHeader.height,width:a.config.fixedAside.width,height:a.module.timeline.totalHeight()}},null,8,["config"]),((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.store.aircrafts,((e,t)=>((0,n.wg)(),(0,n.iD)(n.HY,{key:e.name},[(0,n.Wm)(l,{config:{text:e.name,x:0,y:a.config.fixedHeader.height+a.config.rowHeight*t,width:a.config.fixedAside.width,height:a.config.rowHeight,verticalAlign:"middle"}},null,8,["config"]),(0,n.Wm)(g,{config:{points:[0,a.config.fixedHeader.height+a.config.rowHeight*t,a.config.fixedAside.width-1,a.config.fixedHeader.height+a.config.rowHeight*t],stroke:a.config.betweenItemsLineStroke}},null,8,["config"])],64)))),128)),(0,n.Wm)(g,{config:{points:[a.config.fixedAside.width,0,a.config.fixedAside.width,a.module.timeline.totalHeight()],stroke:a.config.fixedLayerBorderStroke}},null,8,["config"])],64)):(0,n.kq)("",!0)])),_:1},512)}]]),j=A;const Y={components:{OpaqueRect:W},data:()=>({module:f.Z,store:(0,u.Z)(),config:m.Z}),methods:{getStage(){return this.$refs.layer.getStage()}}},z=(0,w.Z)(Y,[["render",function(e,t,i,r,a,o){const s=(0,n.up)("opaque-rect"),l=H,g=(0,n.up)("k-layer");return(0,n.wg)(),(0,n.j4)(g,{ref:"layer"},{default:(0,n.w5)((()=>[a.store.aircrafts.length?((0,n.wg)(),(0,n.iD)(n.HY,{key:0},[(0,n.Wm)(s,{config:{x:0,y:0,width:a.module.timeline.totalWidth(),height:a.config.fixedHeader.height-1}},null,8,["config"]),(0,n.WI)(e.$slots,"timeline-legend"),(0,n.Wm)(l,{config:{points:[a.config.fixedAside.width,a.config.fixedHeader.height-1,a.module.timeline.totalWidth(),a.config.fixedHeader.height-1],stroke:a.config.fixedLayerBorderStroke}},null,8,["config"])],64)):(0,n.kq)("",!0)])),_:3},512)}]]);const q={components:{OpaqueRect:W},props:{stage:{type:Object,required:!0},stageConfig:{type:Object,required:!0},mainLayer:{type:Object,required:!0},verticalScrollableLayers:{type:Array,required:!0},horizontalScrollableLayers:{type:Array,required:!0}},data:()=>({module:f.Z,store:(0,u.Z)(),config:m.Z,scrollBarOptions:{width:m.Z.stageScrollbarLayer.bar.width,padding:m.Z.stageScrollbarLayer.bar.padding,regularFill:m.Z.stageScrollbarLayer.bar.regularFill,activeFill:m.Z.stageScrollbarLayer.bar.activeFill,opacity:m.Z.stageScrollbarLayer.bar.opacity},vBarConfig:null,hBarConfig:null}),created(){const e=this;this.vBarConfig={width:this.scrollBarOptions.width,fill:this.scrollBarOptions.regularFill,y:this.scrollBarOptions.padding,opacity:this.scrollBarOptions.opacity,draggable:!0,dragBoundFunc(t){return t.x=e.stageConfig.width-e.scrollBarOptions.padding-e.scrollBarOptions.width,t.y=Math.max(Math.min(t.y,e.stageConfig.height-this.height()-e.scrollBarOptions.padding),e.scrollBarOptions.padding),t}},this.hBarConfig={height:this.scrollBarOptions.width,fill:this.scrollBarOptions.regularFill,x:this.scrollBarOptions.padding,opacity:this.scrollBarOptions.opacity,draggable:!0,dragBoundFunc(t){return t.x=Math.max(Math.min(t.x,e.stageConfig.width-this.width()-e.scrollBarOptions.padding),e.scrollBarOptions.padding),t.y=e.stageConfig.height-e.scrollBarOptions.padding-e.scrollBarOptions.width,t}},window.addEventListener("resize",_.throttle(this.onWindowResizeHandler,100)),this.onWindowResizeHandler()},mounted(){this.stage.on("wheel",this.onWheelHandler)},methods:{onWindowResizeHandler(){Object.assign(this.vBarConfig,{x:this.stageConfig.width-this.scrollBarOptions.padding-this.scrollBarOptions.width,height:Math.round(this.stageConfig.height*this.stageConfig.height/f.Z.timeline.totalHeight())}),Object.assign(this.hBarConfig,{y:this.stageConfig.height-this.scrollBarOptions.padding-this.scrollBarOptions.width,width:this.ensureComfortableScrollbarSize(Math.ceil(this.stageConfig.width*this.stageConfig.width/f.Z.timeline.totalWidth()))})},onPointerenterHandler(e){e.fill=this.scrollBarOptions.activeFill},onPointerleaveHandler(e){e.fill=this.scrollBarOptions.regularFill},onDragmoveVBarHandler(){const e=this.$refs.vBar.getStage(),t=this.stageConfig.height-2*this.scrollBarOptions.padding-e.height(),i=(e.y()-this.scrollBarOptions.padding)/t;this.verticalScrollableLayers.forEach((e=>e.y(-(f.Z.timeline.totalHeight()-this.stageConfig.height)*i)))},onDragmoveHBarHandler(){const e=this.$refs.hBar.getStage(),t=this.stageConfig.width-2*this.scrollBarOptions.padding-e.width(),i=(e.x()-this.scrollBarOptions.padding)/t;this.horizontalScrollableLayers.forEach((e=>e.x(-(f.Z.timeline.totalWidth()-this.stageConfig.width)*i)))},onWheelHandler(e){let{evt:t}=e;t.preventDefault();const i=t.deltaX,r=t.deltaY,n=this.$refs.vBar?.getStage(),a=this.$refs.hBar?.getStage(),o=-(f.Z.timeline.totalWidth()-this.stageConfig.width),s=Math.max(o,Math.min(this.mainLayer.x()-i,0)),l=-(f.Z.timeline.totalHeight()-this.stageConfig.height),g=Math.max(l,Math.min(this.mainLayer.y()-r,0));n&&this.verticalScrollableLayers.forEach((e=>e.y(g))),a&&this.horizontalScrollableLayers.forEach((e=>e.x(s)));const d=this.stageConfig.height-2*this.scrollBarOptions.padding-(n?.height()||0),c=this.mainLayer.y()/(-f.Z.timeline.totalHeight()+this.stageConfig.height)*d+this.scrollBarOptions.padding;n?.y(c);const h=this.stageConfig.width-2*this.scrollBarOptions.padding-(a?.width()||0),u=this.mainLayer.x()/(-f.Z.timeline.totalWidth()+this.stageConfig.width)*h+this.scrollBarOptions.padding;a?.x(u)},ensureComfortableScrollbarSize:e=>Math.max(m.Z.stageScrollbarLayer.bar.minimumGreaterDimension,e)}},$=(0,w.Z)(q,[["render",function(e,t,i,r,a,o){const s=v,l=(0,n.up)("opaque-rect"),g=H,d=x,c=(0,n.up)("k-layer");return(0,n.wg)(),(0,n.j4)(c,null,{default:(0,n.w5)((()=>[a.store.aircrafts.length?((0,n.wg)(),(0,n.iD)(n.HY,{key:0},[i.stageConfig.height<a.module.timeline.totalHeight()?((0,n.wg)(),(0,n.j4)(s,{key:0,ref:"vBar",config:a.vBarConfig,onPointerenter:t[0]||(t[0]=e=>o.onPointerenterHandler(a.vBarConfig)),onPointerleave:t[1]||(t[1]=e=>o.onPointerleaveHandler(a.vBarConfig)),onDragmove:o.onDragmoveVBarHandler},null,8,["config","onDragmove"])):(0,n.kq)("",!0),i.stageConfig.width<a.module.timeline.totalWidth()?((0,n.wg)(),(0,n.j4)(s,{key:1,ref:"hBar",config:a.hBarConfig,onPointerenter:t[2]||(t[2]=e=>o.onPointerenterHandler(a.hBarConfig)),onPointerleave:t[3]||(t[3]=e=>o.onPointerleaveHandler(a.hBarConfig)),onDragmove:o.onDragmoveHBarHandler},null,8,["config","onDragmove"])):(0,n.kq)("",!0),(0,n.Wm)(l,{config:{x:0,y:0,width:a.config.fixedAside.width+1,height:a.config.fixedHeader.height+1}},null,8,["config"]),(0,n.Wm)(g,{config:{points:[a.config.fixedAside.width,a.config.fixedHeader.height+1,a.config.fixedAside.width,a.config.fixedHeader.height-2],stroke:a.config.fixedLayerBorderStroke}},null,8,["config"]),(0,n.Wm)(d,{config:{text:a.config.aircraft.number,x:0,y:a.config.stageScrollbarLayer.aircraftNumber.y,width:a.config.fixedAside.width,fontSize:a.config.stageScrollbarLayer.aircraftNumber.fontSize}},null,8,["config"]),(0,n.Wm)(d,{config:{text:a.config.stageScrollbarLayer.datetime.text,x:0,y:a.config.stageScrollbarLayer.datetime.y,width:a.config.fixedAside.width,fontSize:a.config.stageScrollbarLayer.datetime.fontSize}},null,8,["config"])],64)):(0,n.kq)("",!0)])),_:1})}]]);const T={data:()=>({config:m.Z,timeline:f.Z.timeline})},X=(0,w.Z)(T,[["render",function(e,t,i,r,a,o){const s=H;return a.timeline.totalWidth()/a.timeline.getHourInPx()>=1?((0,n.wg)(!0),(0,n.iD)(n.HY,{key:0},(0,n.Ko)(Math.floor(a.timeline.totalWidth()/a.timeline.getHourInPx()),(e=>((0,n.wg)(),(0,n.j4)(s,{key:e,config:{points:[a.timeline.getCurrentXByIndex(e),0,a.timeline.getCurrentXByIndex(e),a.timeline.totalHeight()],stroke:a.config.timelinePrimaryColor,opacity:a.timeline.isSpecialHour(a.timeline.getCurrentDateByIndex(e).hour())?a.config.timelineGrid.opacity.specialHour:a.config.timelineGrid.opacity.regularHour}},null,8,["config"])))),128)):(0,n.kq)("",!0)}]]);const R={data:()=>({config:m.Z,timeline:f.Z.timeline})},N=(0,w.Z)(R,[["render",function(e,t,i,r,a,o){const s=H,l=x;return a.timeline.totalWidth()/a.timeline.getHourInPx()>=1?((0,n.wg)(!0),(0,n.iD)(n.HY,{key:0},(0,n.Ko)(Math.floor(a.timeline.totalWidth()/a.timeline.getHourInPx()),(e=>((0,n.wg)(),(0,n.iD)(n.HY,{key:e},[0===a.timeline.getCurrentDateByIndex(e).hour()?((0,n.wg)(),(0,n.iD)(n.HY,{key:0},[(0,n.Wm)(s,{config:{points:[a.timeline.getCurrentXByIndex(e),a.config.timelineLegend.startOfDay.underlineY,a.timeline.getCurrentXByIndex(e),a.config.fixedHeader.height],stroke:a.config.timelinePrimaryColor}},null,8,["config"]),(0,n.Wm)(s,{config:{points:[a.timeline.getCurrentXByIndex(e),a.config.timelineLegend.startOfDay.underlineY,a.timeline.getCurrentXByIndex(e)+a.timeline.getHourInPx(),a.config.timelineLegend.startOfDay.underlineY],stroke:a.config.timelinePrimaryColor}},null,8,["config"]),(0,n.Wm)(l,{config:{text:a.timeline.getCurrentDateByIndex(e).format(a.config.timelineLegend.startOfDay.dateFormat),x:a.timeline.getCurrentXByIndex(e),y:a.config.timelineLegend.startOfDay.textStartY,width:a.timeline.getHourInPx(),fill:a.config.timelinePrimaryColor}},null,8,["config"])],64)):a.timeline.isSpecialHour(a.timeline.getCurrentDateByIndex(e).hour())?((0,n.wg)(),(0,n.iD)(n.HY,{key:1},[(0,n.Wm)(s,{config:{points:[a.timeline.getCurrentXByIndex(e),a.config.timelineLegend.startOfQuarterDay.underlineY,a.timeline.getCurrentXByIndex(e),a.config.fixedHeader.height],stroke:a.config.timelinePrimaryColor}},null,8,["config"]),(0,n.Wm)(s,{config:{points:[a.timeline.getCurrentXByIndex(e),a.config.timelineLegend.startOfQuarterDay.underlineY,a.timeline.getCurrentXByIndex(e)+.6*a.timeline.getHourInPx(),a.config.timelineLegend.startOfQuarterDay.underlineY],stroke:a.config.timelinePrimaryColor}},null,8,["config"]),(0,n.Wm)(l,{config:{text:a.timeline.getCurrentDateByIndex(e).format(a.config.timelineLegend.startOfQuarterDay.dateFormat),x:a.timeline.getCurrentXByIndex(e),y:a.config.timelineLegend.startOfQuarterDay.textStartY,width:.6*a.timeline.getHourInPx(),fontSize:a.config.timelineLegend.startOfQuarterDay.fontSize,fill:a.config.timelinePrimaryColor}},null,8,["config"])],64)):(0,n.kq)("",!0)],64)))),128)):(0,n.kq)("",!0)}]]);var E=i(9963);const G={components:{MainLayer:I,FixedAsideLayer:j,FixedHeaderLayer:z,StageScrollbarLayer:$,TimelineGrid:X,TimelineLegend:N},data:()=>({moduleConfig:m.Z,module:f.Z,store:(0,u.Z)(),toast:h.Z,stage:null,configs:{stage:{width:0,height:0},stageScrollbar:{props:{readyToMount:!1}}},fps:(0,d.sgm)()}),watch:{"store.aircrafts":{handler(){this.actualizeStageDimensions()},deep:!0}},beforeUnmount(){h.Z.clear()},created(){this.init()},methods:{async init(){const{aircraftsCount:e,flightsCount:t}=(0,c.yj)().query;await f.Z.fetch(e,t),await this.initConfigs()},async initConfigs(){window.addEventListener("resize",_.throttle(this.actualizeStageDimensions,100)),this.actualizeStageDimensions(),await this.$nextTick(),this.stage=this.$refs.stage.getStage(),this.stage.container().style.backgroundColor=this.moduleConfig.stageBackgroundColor;const e=this.$refs.main.getStage(),t=this.$refs.fixedAside.getStage(),i=this.$refs.fixedHeader.getStage();Object.assign(this.configs.stageScrollbar.props,{stage:this.stage,stageConfig:this.configs.stage,mainLayer:e,verticalScrollableLayers:[e,t],horizontalScrollableLayers:[e,i]}),this.configs.stageScrollbar.props.readyToMount=!0},actualizeStageDimensions(){this.configs.stage.width=Math.min(f.Z.timeline.totalWidth(),this.$refs.stageContainer.offsetWidth),this.configs.stage.height=Math.min(f.Z.timeline.totalHeight(),this.$refs.stageContainer.offsetHeight),this.stage?this.stage.getContainer().style.border=""+(this.store.aircrafts.length?"1px solid black":"none"):setImmediate(this.actualizeStageDimensions)}}},Q=()=>{(0,E.useCssVars)((e=>({"6dc2d73f":e.moduleConfig.stageBackgroundColor,"8779b2fe":e.moduleConfig.mainLayer.noAircraftsMessage.width})))},K=G.setup;G.setup=K?(e,t)=>(Q(),K(e,t)):Q;const U=G,V=(0,w.Z)(U,[["render",function(e,t,i,d,c,h){const f=(0,n.up)("timeline-grid"),u=(0,n.up)("main-layer"),m=(0,n.up)("fixed-aside-layer"),p=(0,n.up)("timeline-legend"),y=(0,n.up)("fixed-header-layer"),w=(0,n.up)("stage-scrollbar-layer"),x=(0,n.up)("k-stage"),b=r.Z;return(0,n.wg)(),(0,n.j4)(b,null,{default:(0,n.w5)((()=>[(0,n._)("div",o,"FPS: "+(0,a.toDisplayString)(c.fps),1),(0,n._)("h3",s,[(0,n.Uk)((0,a.toDisplayString)(c.moduleConfig.chartTitle)+" - ",1),(0,n._)("a",{href:e.productionAbsoluteUrl+"/code-example/blob/master/src/docs/konva-research.md"},"research",8,l)]),(0,n._)("div",g,[c.configs.stage.height?((0,n.wg)(),(0,n.j4)(x,{key:0,ref:"stage",config:c.configs.stage},{default:(0,n.w5)((()=>[(0,n.Wm)(u,{ref:"main",onFlightRectPointerdown:t[0]||(t[0]=e=>c.toast.showInfo(c.module.getFlightSummary(e),{timeout:c.moduleConfig.mainLayer.flightRectTimeoutMs})),onFlightRectPointerenter:t[1]||(t[1]=e=>c.stage.container().style.cursor="pointer"),onFlightRectPointerleave:t[2]||(t[2]=e=>c.stage.container().style.cursor="default")},{"timeline-grid":(0,n.w5)((()=>[(0,n.Wm)(f)])),_:1},512),(0,n.Wm)(m,{ref:"fixedAside"},null,512),(0,n.Wm)(y,{ref:"fixedHeader"},{"timeline-legend":(0,n.w5)((()=>[(0,n.Wm)(p)])),_:1},512),c.configs.stageScrollbar.props.readyToMount?((0,n.wg)(),(0,n.j4)(w,(0,a.normalizeProps)((0,n.dG)({key:0},c.configs.stageScrollbar.props)),null,16)):(0,n.kq)("",!0)])),_:1},8,["config"])):(0,n.kq)("",!0)],512)])),_:1})}],["__scopeId","data-v-51152279"]])}}]);
//# sourceMappingURL=b1c7534.chunk.js.map