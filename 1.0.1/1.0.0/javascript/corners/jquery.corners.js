/**
 * jqCorners plugin
 *
 * Copyright (c) 2007 David Gilbert (http://nepherim.lifehaiku.com/)
 * Dual licensed under the MIT and GPL licenses:
 *    http://www.opensource.org/licenses/mit-license.php
 *    http://www.gnu.org/licenses/gpl.html
 *
 * Based on original createElement function found at http://www.456bereastreet.com/archive/200505/transparent_custom_corners_and_borders/
 */
(function($){$.fn.cornersBorders=function(o){o=$.extend({baseClass:'cb_Target'},o||{});$(this).each(function(i){$(this).removeClass(o.baseClass).wrap('<div class="cb_divWrap '+($(this).attr("class")||'')+'"><div class="cb_borderL"><div class="cb_borderR"></div></div></div>').removeClass().addClass("cb_contentWrap").parents(".cb_divWrap").prepend('<div class="cb_borderT"><div></div></div>').append('<div class="cb_borderB"><div></div></div>')});return this}})(jQuery);