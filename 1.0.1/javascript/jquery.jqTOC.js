/**
 * jqTOC plugin
 *
 * Copyright (c) 2007 David Gilbert (http://nepherim.lifehaiku.com/)
 * Dual licensed under the MIT and GPL licenses:
 *    http://www.opensource.org/licenses/mit-license.php
 *    http://www.gnu.org/licenses/gpl.html
 *
 */
(function($){$.fn.jqTOC=function(a){function tocToggleDisplay(e){$('#toc_content')[e.data.mode]()}a=$.extend({tocWidth:'220px',tocTitle:'Content',tocStart:1,tocEnd:3,tocContainer:'toc_container',tocAutoClose:true,tocShowOnClick:true,tocTopLink:'top'},a||{});if(document.getElementById(a.tocContainer)==null)$('body').append('<div id="'+a.tocContainer+'"></div>');$('#'+a.tocContainer).css('width',a.tocWidth).append((a.tocTitle?'<div id="toc_header">'+a.tocTitle+'</div>':'')+'<div id="toc_content"></div>');var t=$('#toc_content');var b,headerId;var c=a.tocEnd;this.children().each(function(i){b=this.nodeName.substr(1);if(this.nodeName.match(/^H\d+$/)&&b>=a.tocStart&&b<=a.tocEnd&&this.nodeName.substr(1)<c){c=this.nodeName.substr(1)}if(c==a.tocStart){return false}});a.tocStart=c;this.children().each(function(i){b=this.nodeName.substr(1);if(this.nodeName.match(/^H\d+$/)&&b>=a.tocStart&&b<=a.tocEnd){headerId=this.id||'jqTOC_link'+i;t.append('<a href="#'+headerId+'" style="margin-left: '+(b-a.tocStart+1)*1.4+'em;" '+(b!=a.tocStart?'class="indent" ':'')+'>'+$(this).text()+'</a>');this.id=headerId;if(a.tocTopLink){$(this).before('<div class="toc_top"><a href="#">'+a.tocTopLink+'</a></div>')}}});if(a.tocShowOnClick){if(a.tocTitle){$('#toc_header').bind('click',{mode:'toggle'},function(e){tocToggleDisplay(e)})}if(a.tocAutoClose){$('#toc_content a').bind('click',{mode:'hide'},function(e){tocToggleDisplay(e)})}}else{$('#toc_content').show()}if(a.tocTopLink){$('.toc_top').bind('click',function(){window.scrollTo(0,0)})}return this}})(jQuery);