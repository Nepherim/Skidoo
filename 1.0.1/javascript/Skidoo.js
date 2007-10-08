$.fn.nextUntil = function(expr) {
    var match = [];

    if ( expr.jquery )
      expr = expr[0];

    // We need to figure out which elements to push onto the array
    this.each(function(){
        // Traverse through the sibling nodes
        for( var i = this.nextSibling; i; i = i.nextSibling ) {
            // Make sure that we're only dealing with elements
            if ( i.nodeType != 1 ) continue;

            // If we find a match then we need to stop
            if ( expr.nodeType ) {
		         if ( i == expr ) break;
            } else if ( jQuery.multiFilter( expr, [i] ).length ) break;

            // Otherwise, add it on to the stack
            match.push( i );
        }
    });

    return this.pushStack( match, arguments );
};

$.fn.wrapAll = function() {
    // There needs to be at least one matched element for this to work
    if ( !this.length ) return this;

    // Find the element that we're wrapping with
    var b = jQuery.clean(arguments)[0];

    // Make sure that its in the right position in the DOM
    this[0].parentNode.insertBefore( b, this[0] );

    // Find its lowest point
    while ( b.firstChild ) b = b.firstChild;

    // And add all the elements there
    return this.appendTo(b);
};

function tabClick(pos){
	$('#tabs_' +pos).append('<ul class="tabs-nav"></ul>');
	var tab = $('#tabs_' +pos+ '>ul');
	$('#tabs_' +pos+ '_content>div').addClass('tabs-container').each(function(i){
		var id = this.id || "tabs" +pos+ "Content"+i;
		$(this).attr("id", id);
		tab.append('<li><a href="#' +id+ '">' + this.title + '</a></li>');
	});

	var TABS_COOKIE = pm_SkinName + '_tabs_' +pos;
	$('#' +pos+ 'Column').tabs( parseInt($.cookie(TABS_COOKIE)) || 1, {
		 onClick: function(clicked) {
			  var lastTab = $(clicked).parents('ul').find('li').index(clicked.parentNode) + 1;
			  $.cookie(TABS_COOKIE, lastTab);
		 }
	});
}
function dblClick(e,p){
	$(e).dblclick( function(evt){
		if ( evt.target.nodeName != 'INPUT' ) {
		   window.location.href = (p ? '?n=' +p : window.location.href.replace(/#.*$/, '')) + '?action=edit';
		}
	}); 
}
function removeColumn(c){
   var show = (c=='left'?pm_LeftCol:pm_RightCol);
	if ( show != "" & show == 0) {
		$('#outerColumnContainer').css('border-' +c+ '-width','4px');
		$('#centerColumn').css('border-'+c,'none');
	}
}

$(document).ready(function(){ 
// Remove left/right columns
   removeColumn('left');
   removeColumn('right');

// Add rounded corners and border
   $('#pageWrapper').cornersBorders();

// Create the left and right tabs
	tabClick('left');  tabClick('right');
	
	var txt = $('#text');
	EDIT_COOKIE = pm_SkinName + '_edit_height';      // global to allow skin to reset cookie.

// On edit pages allow resizing of edit textbox
	if (txt[0]) {
	   txt.focus()
		   .Resizable({
			   handlers: {
					s: '#resizeS'
				},
				onStop: function(){ $.cookie(EDIT_COOKIE, $(this).height() ); }
			})
			.width(txt.width())		// Bug in interface (shows in IE) with w/h set as percentage values, so force update width to a px value.
			.height( parseInt($.cookie(EDIT_COOKIE)) || 385 );

		$('#resizeS').width(txt.width())
		   
// On non-edit pages allow double click to edit on specific regions of the page
	} else {
		var p = pm_Site + '.' + pm_SkinName + '-';
		dblClick('#contentColumn .inside');
		dblClick('.tabHolder',p + 'Tabs');
		dblClick('#siteHeader',p + 'Header');
		dblClick('#footer',p + 'Footer');
		dblClick('#contentHeader',p + 'contentHeader');
	}
/* -----------------------	
	var contentColCache = $("#middleColumn");
	contentColCache.click( function(e){
	   if ( (e.offsetX ? e.offsetX : e.layerX) < 10) scrollTo(0,0);
	});
	contentColCache.mousemove (function(e){ 
  	   //console.log (this.id +" 1:"+ e.currentTarget.id +" 2:"+ e.target.id);  // +" 3:"+ e.relatedTarget.id
		if ( (e.target ? e.target.id : this.id) == "middleColumn" && ( (e.offsetX ? e.offsetX : e.layerX) < 10) ) {
			contentColCache.css("background", "url("+pm_SkinDir+"/images/up-handle.gif) repeat-y");
		} else {
			contentColCache.css("background", "none");
		}
	});
	contentColCache.mouseout( function(e){
	  	contentColCache.css("background", "none");
	});
// -----------------------	*/

// Set focus to searchbox if it's present
	$('#wikitext .searchbox').focus();

// Setup the table of contents, if the container div exists
	if (document.getElementById(pm_SkinName + '-TOC')) {
		$('#wikitext').jqTOC({tocWidth:'',tocContainer: pm_SkinName + '-TOC',tocShowOnClick:false,tocTitle:'',tocTopLink:'&nbsp;'});
	}

// Add the edit image class sectionedit anchors
	$('.sectionedit>a:last-child').addClass('sectionEditImg');

// **** Causes border on first header to disappear in IE! **** //
// Create textBlock div's between each header to allow double-click section editing and hover effects
	$(".sectionedit").each(function(i){
		var t = $(this);
		t
			.nextUntil(".sectionedit")
			.wrapAll("<div class='textBlock' id='textBlock_" +i+ "'></div>")
			.end()		
			.prependTo( t.next('.textBlock') );
	});

// Section hover efects
	textBlock_cache = $('.textBlock');
	textBlock_cache.hover(
		function(){
			$(this)
				.addClass('textBlockHover')
				.children('.toc_top,.sectionedit')
				.show();
			return false;
		},
		function(){
			$(this)
				.removeClass('textBlockHover')
				.children('.toc_top,.sectionedit')
				.hide();
		}
	);

	$('.tabs-container')
		.addClass('force_contain')
		.hover(
			function(){
				$(this)
					.children('.skidooTabEdit')
					.show();
				return false;
			},
			function(){
				$(this)
					.children('.skidooTabEdit')
					.hide();
			}
		);

// Setup section edit double-click handler
	textBlock_cache.dblclick(function(){
		window.location.href = $(this).children('.sectionedit').find('.sectionEditImg').attr('href');
		return false;
	});

// Setup Google feed
//	$('#feeds a').addClass('feed');
//	$('a.feed').gFeed( { target: '#feeds', tabs: true } ); 

});
