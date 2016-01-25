!function(o){function e(n){if(t[n])return t[n].exports;var c=t[n]={exports:{},id:n,loaded:!1};return o[n].call(c.exports,c,c.exports,e),c.loaded=!0,c.exports}var t={};return e.m=o,e.c=t,e.p="",e(0)}([function(o,e,t){"use strict";var n=t(11),c=t(12);n.generate(),c.generate();var i=document.querySelector("#play");i.onclick=function(){c.runService("draw"),console.log("running service")}},,,,,,,,,,,function(o,e,t){"use strict";var n={draw:["ff0048","8f00af","ff0048","8f00af","ff0048","8f00af"],camera:["00cc66","ffb600","0097ff","00cc66","ffb600","0097ff"]},c=t(12).getBlocks();e.blockActions=function(){return n},e.generate=function(){var o=document.querySelector("#menu"),e=document.querySelector("#menu-items"),t=!1,i=function(t){var i=document.createElement("li"),r=document.createElement("p");r.textContent=t,i.id="menu-"+t,i.setAttribute("data-service",t),i.onclick=function(){for(var e=i.querySelectorAll(".block"),t=0;t<e.length;t++)console.log(e[t]),c[t].setColor(e[t].getAttribute("data-color"));o.click()},n[t].forEach(function(o){var e=document.createElement("button");e.classList.add("block"),e.style.backgroundColor="#"+o,e.setAttribute("data-color",o),i.appendChild(e),i.appendChild(r)}),e.appendChild(i)};for(var r in n)i(r);o.onclick=function(){t?e.classList.remove("active"):e.classList.add("active"),t=!t}}},function(o,e,t){"use strict";var n=t(13),c=["ff0048","ff6500","ffb600","00cc66","0097ff","8f00af"],i={};e.getBlocks=function(){return i},e.runService=function(o){switch(o){case"draw":n.generate()}},e.generate=function(){function o(o){i[o.count]=new t,i[o.count].color=o.color,i[o.count].colorPosition=o.colorPosition,i[o.count].position=o.position;var n=document.createElement("button");n.classList.add("block"),n.id="block-"+o.count,n.style.backgroundColor="#"+o.color,e.appendChild(n),n.onclick=function(){this.cycleColor()}.bind(i[o.count])}var e=document.querySelector(".terminal"),t=function(){this.setColor=function(o){this.color=o,document.querySelector("#block-"+this.position).style.backgroundColor="#"+this.color,localforage.setItem("blocks",JSON.stringify(i),function(o){o&&console.log(o)})},this.cycleColor=function(){console.log("current position ",i),this.colorPosition++,this.colorPosition>c.length&&(this.colorPosition=0),this.color=c[this.colorPosition],document.querySelector("#block-"+this.position).style.backgroundColor="#"+this.color,localforage.setItem("blocks",JSON.stringify(i),function(o,e){o&&console.log(o)})}.bind(this)};localforage.getItem("blocks",function(e,t){if(e||!t)!function(){var e=0;c.forEach(function(t){o({count:e,color:t,colorPosition:e,position:e}),e++})}();else{t=JSON.parse(t);for(var n in t)o({count:n,color:t[n].color,colorPosition:t[n].colorPosition,position:t[n].position})}})}},function(o,e){"use strict";function t(){i.lineCap="round",i.globalCompositeOperation=g,i.beginPath(),i.moveTo(l,s),i.lineTo(d,u),i.strokeStyle=b,i.lineWidth=k,i.stroke(),i.shadowBlur=10,i.shadowColor="rgba(255, 255, 255, 0.95)",i.stroke(),i.shadowBlur=12,i.shadowColor="rgba(255, 255, 255, 0.85)",i.stroke(),i.shadowBlur=15,i.shadowColor=p,i.stroke(),i.shadowBlur=18,i.shadowColor=p,i.stroke(),i.shadowBlur=30,i.shadowColor=p,i.stroke(),i.closePath()}function n(){function o(o,e){switch(e.touches?(f=e.touches[0].clientX,h=e.touches[0].clientY):(f=e.clientX,h=e.clientY-105),o){case"down":l=d,s=u,d=f,u=h,a=!0,r=!0,r&&(i.beginPath(),i.fillStyle=b,i.fillRect(d,u,2,2),i.closePath(),r=!1);break;case"up":case"out":a=!1;break;case"move":a&&(l=d,s=u,d=f,u=h,t())}}i=c.getContext("2d"),c.addEventListener("mouseup",function(e){o("up",e)},!1),c.addEventListener("mousedown",function(e){o("down",e)},!1),c.addEventListener("mouseout",function(e){o("out",e)},!1),c.addEventListener("mousemove",function(e){o("move",e)},!1)}var c=void 0,i=void 0,r=!1,a=!1,l=0,s=0,d=0,u=0,f=void 0,h=void 0,v=800,m=600,p="rgba(255, 0, 128, 0.8)",g="screen",b="#fff",k=10;e.generate=function(){c=document.createElement("canvas"),c.id="service-draw";var o=document.createElement("div");o.style.width=v+"px",o.style.height=m+"px",c.width=v,c.height=m;var e=document.createElement("div");e.classList.add("handle"),e.style.width=v+"px";var t=document.createElement("div");t.textContent="✖",t.classList.add("close-service"),t.onclick=function(){document.body.removeChild(this.parentNode),p="rgba(255, 0, 128, 0.8)",g="screen"},o.appendChild(t);var r=document.createElement("div");r.textContent="⬇",r.classList.add("save"),r.onclick=function(){i.fillStyle="#111111",i.fill();var o=c.toDataURL("image/jpeg").replace("image/jpeg","image/octet-stream");window.location.href=o},o.appendChild(r);var a={pink:{rgba:"rgba(255, 0, 128, 0.8)"},blue:{rgba:"rgba(0, 134, 255, 0.8)"},green:{rgba:"rgba(0, 220, 0, 0.8)"}},l=void 0;for(var s in a)l=document.createElement("div"),l.classList.add("color"),l.classList.add(s),l.style.backgroundColor=a[s].rgba,l.onclick=function(){p=this.style.backgroundColor;for(var o in a)document.querySelector("."+o).classList.remove("active");this.classList.add("active")},e.appendChild(l);var d=["screen","color-burn"],u=void 0;d.forEach(function(o){u=document.createElement("div"),u.classList.add("filter"),u.classList.add(o),u.textContent=o,u.onclick=function(){g=this.textContent,d.forEach(function(o){document.querySelector("."+o).classList.remove("active")}),this.classList.add("active")},e.appendChild(u)}),o.id="canvas-wrapper",o.appendChild(e),o.appendChild(c),e.querySelector(".pink").classList.add("active"),e.querySelector(".screen").classList.add("active"),document.body.appendChild(o),n()}}]);