/**
 *  Plugin which uses the Google AJAX Feed API for creating feed content
 *  @author:  M. Alsup (malsup at gmail dot com)
 *  @version: 1.0.2 (5/11/2007)
 *  Documentation and examples at: http://www.malsup.com/jquery/gfeed/
 *  Free beer and free speech. Enjoy!
 */
(function($){if(!window.google){alert('You must include the Google AJAX Feed API script');return}if(!google.feeds)google.load("feeds","1");$.fn.gFeed=function(c){var d=jQuery.extend({target:this,max:5},c||{});var g=new google.feeds.FeedControl();this.each(function(){var a=this.href||d.url;var b=d.title||this.title||$(this).text();g.addFeed(a,b);g.setNumEntries(d.max)});$(d.target).each(function(){g.draw(this,d.tabs?{drawMode:google.feeds.FeedControl.DRAW_MODE_TABBED}:null)});return this}})(jQuery);