/*
 * PmWiki Skidoo skin
 * Version 1-Oct-07 (1.0.0)
 * @requires PmWiki 2.2
 *
 * Examples at: http://pmwiki.com/Skins/Skidoo and http://solidgone.org/Skidoo/
 * Copyright (c) 2007 David Gilbert
 * Dual licensed under the MIT and GPL licenses:
 *    http://www.opensource.org/licenses/mit-license.php
 *    http://www.gnu.org/licenses/gpl.html
 */

!! About the skin
This skin provides a simple, low distraction interface provides rapid access to the information you need. I use it for the various wiki's I use to take notes on a daily basis. It's designed so that it's easy to change the content in any of the wiki sections (headers, footers, etc), and easy to change colors to provide distinction across farms.

* '''Inline tabs''': Provide rapid access to commonly used information without reloading the page; active tabs is remembered across sessions.
* '''Recent activity''': Rapid access to links for recently edited pages.
* '''Table of contents''': Dynamically generated TOC with ability to jump to a section on click.
* '''PDA mini-skin''': renders wiki in a minimal format for useful PDA/mobile usage.
* '''Customizable''': All sections (headers, footers, tabs) of the page are editable with a simple double-click.
* '''Editable''': Edit page sections with a double-click.
* '''Resizable edit box''': Resize the height of the page edit textbox to suit your needs; size is remembered for each user across sessions.
* '''Admin bar''': Administration bar provides links to customize content in all sections of the skin.
* '''Fully CSS driven''', with separate files for coloring allows easy customization.
* '''Color switching''': Easily switch skin colors, or create your own skin colors.
* Supports '''removal of left/right/header/footer''' elements using either directives on specific pages ( (:noleft:),(:noright:),(:noheader:),(:nofooter:), or including SetTmplDisplay('PageXXXFmt', 0) in config.php (XXX: Left,Right,Header,Footer).
* Layout is CSS driven (no tables here), and is valid XHTML, for those that care about such things.	
