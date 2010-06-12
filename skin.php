<?php if (!defined('PmWiki')) exit();
/* PmWiki Skidoo skin
 *
 * Examples at: http://pmwiki.com/Cookbook/Skidoo and http://solidgone.com/Skins/
 * Copyright (c) 2009 David Gilbert
 * Dual licensed under the MIT and GPL licenses:
 *    http://www.opensource.org/licenses/mit-license.php
 *    http://www.gnu.org/licenses/gpl.html
 */
global $FmtPV;
$FmtPV['$SkinName'] = '"Skidoo"';
$FmtPV['$SkinVersion'] = '"1.0.6"';
$FmtPV['$SkinDate'] = '"20100612"';

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

## Search a Group.Templates page as well as the Site templates
global $FPLTemplatePageFmt;
SDV($FPLTemplatePageFmt, array('{$FullName}',
   "Site.Skidoo-LocalTemplates",
   "Site.LocalTemplates", "Site.PageListTemplates")
);

## Use internationalization template for alternative Section Edit text
XLPage('en',"Site.Skidoo-XLPageLocal");

# Condition used in Header to determine whether to display "menu" in the header.
global $Conditions;
$Conditions['skinstyle'] = "\$GLOBALS['SkinStyle']==\$condparm";

## Move any (:noleft:) or SetTmplDisplay('PageLeftFmt', 0); directives to variables for access in jScript.
global $LeftColumn, $RightColumn;
$FmtPV['$LeftColumn'] = "\$GLOBALS['TmplDisplay']['PageLeftFmt']";
$FmtPV['$RightColumn'] = "\$GLOBALS['TmplDisplay']['PageRightFmt']";

# ----------------------------------------
# - Standard Skin Setup
# ----------------------------------------
$FmtPV['$WikiTitle'] = '$GLOBALS["WikiTitle"]';

# Define a link stye for new page links
global $LinkPageCreateFmt;
SDV($LinkPageCreateFmt, "<a class='createlinktext' href='\$PageUrl?action=edit'>\$LinkText</a>");

# Default color scheme
global $SkinColor, $ValidSkinColors;
if ( !is_array($ValidSkinColors) ) $ValidSkinColors = array();
array_push($ValidSkinColors, 'darkblue');
if ( isset($_GET['color']) && in_array($_GET['color'], $ValidSkinColors) ) {
	$SkinColor = $_GET['color'];
} elseif ( !in_array($SkinColor, $ValidSkinColors) ) {
	$SkinColor = 'darkblue';
}

# Override pmwiki styles otherwise they will override styles declared in css
global $HTMLStylesFmt;
$HTMLStylesFmt['pmwiki'] = '';

# Add a custom page storage location
global $WikiLibDirs;
$PageStorePath = dirname(__FILE__)."/wikilib.d/{\$FullName}";
$where = count($WikiLibDirs);
if ($where>1) $where--;
array_splice($WikiLibDirs, $where, 0, array(new PageStore($PageStorePath)));

