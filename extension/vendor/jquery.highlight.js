jQuery.extend({highlight:function(e,t,i,n){if(3===e.nodeType){var r=e.data.match(t)
if(r){var a=document.createElement(i||"span")
a.className=n||"highlight"
var h=e.splitText(r.index)
h.splitText(r[0].length)
var s=h.cloneNode(!0)
return a.appendChild(s),h.parentNode.replaceChild(a,h),1}}else if(1===e.nodeType&&e.childNodes&&!/(script|style)/i.test(e.tagName)&&(e.tagName!==i.toUpperCase()||e.className!==n))for(var l=0;l<e.childNodes.length;l++)l+=jQuery.highlight(e.childNodes[l],t,i,n)
return 0}}),jQuery.fn.unhighlight=function(e){var t={className:"highlight",element:"span"}
return jQuery.extend(t,e),this.find(t.element+"."+t.className).each(function(){var e=this.parentNode
e.replaceChild(this.firstChild,this),e.normalize()}).end()},jQuery.fn.highlight=function(e,t){var i={className:"highlight",element:"span",caseSensitive:!1,wordsOnly:!1}
if(jQuery.extend(i,t),e.constructor===String&&(e=[e]),e=jQuery.grep(e,function(e,t){return""!=e}),e=jQuery.map(e,function(e,t){return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}),0==e.length)return this
var n=i.caseSensitive?"":"i",r="("+e.join("|")+")"
i.wordsOnly&&(r="\\b"+r+"\\b")
var a=RegExp(r,n)
return this.each(function(){jQuery.highlight(this,a,i.element,i.className)})}
