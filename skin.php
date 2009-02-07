<?php if (!defined('PmWiki')) exit();
/*
 * PmWiki Skidoo skin
 * Version 1.0.3  (18-Oct-07)
 * @requires PmWiki 2.2
 *
 * Examples at: http://pmwiki.com/Cookbook/Skidoo and http://skidoo.solidgone.com/
 * Copyright (c) 2007 David Gilbert
 * Dual licensed under the MIT and GPL licenses:
 *    http://www.opensource.org/licenses/mit-license.php
 *    http://www.gnu.org/licenses/gpl.html
 */
global $FmtPV;
$FmtPV['$SkinName'] = '"Skidoo"';
$FmtPV['$SkinVersion'] = '"1.0.3"';

## Default color scheme
global $SkinColor;
if (isset($_GET['color'])) {
	$SkinColor = $_GET['color'];
} else {
	SDV($SkinColor, 'darkblue');
}

global $action;
include_once("$SkinDir/cookbook/detect_mobile.php");
if ($action == 'print' || detect_mobile_device()) {
	# Enabled from config.php with: $ActionSkin['print'] = <skin_name>;
	global $SkinStyle, $LinkPageExistsFmt, $UrlLinkTextFmt;

   $SkinStyle ='pda';
	$LinkPageExistsFmt = "<a class='wikilink' href='\$PageUrl?action=print'>\$LinkText</a>";
	$UrlLinkTextFmt = "<cite class='urllink'>\$LinkText</cite> [<a class='urllink' href='\$Url'>\$Url</a>]";

	LoadPageTemplate($pagename,"$SkinDir/print/print.tmpl");
	return;
}

# Condition used in Header to determine whether to display "menu" in the header.
global $Conditions;
$Conditions['skinstyle'] = "\$GLOBALS['SkinStyle']==\$condparm";

## Move any (:noleft:) or SetTmplDisplay('PageLeftFmt', 0); directives to variables for access in jScript.
global $LeftColumn, $RightColumn;
$FmtPV['$LeftColumn'] = "\$GLOBALS['TmplDisplay']['PageLeftFmt']";
$FmtPV['$RightColumn'] = "\$GLOBALS['TmplDisplay']['PageRightFmt']";

## Add a custom page storage location
global $PageStorePath, $WikiLibDirs;
$PageStorePath = dirname(__FILE__)."/wikilib.d/{\$FullName}";
$where = count($WikiLibDirs);
if ($where>1) $where--;
array_splice($WikiLibDirs, $where, 0, array(new PageStore($PageStorePath)));

## Search a Group.Templates page as well as the Site templates
global $FPLTemplatePageFmt;
SDV($FPLTemplatePageFmt, array('{$FullName}',
   "Site.Skidoo-LocalTemplates",
   "Site.LocalTemplates", "Site.PageListTemplates")
);

## Use internationalization template for alternative Section Edit text
XLPage('en',"Site.Skidoo-XLPageLocal");

## Override pmwiki styles otherwise they will override styles declared in css
global $HTMLStylesFmt;
$HTMLStylesFmt['pmwiki'] = '';

## Define a link stye for new page links
global $LinkPageCreateFmt;
SDV($LinkPageCreateFmt, "<a class='createlinktext' href='\$PageUrl?action=edit'>\$LinkText</a>");

