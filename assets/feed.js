var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-77426139-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

function showUrls() {
    jQuery("#lastUpdatedTime").html(amplify.store("copiedUrlsDate"));
    var e = className = "",
        s = amplify.store("copiedUrls"),
        a = 0;
    $(s).each(function(s, t) {
        splitValue = t.split("SaveTabs"), className = a % 2 == 0 ? "class=odd" : "class=even", e += "<li " + className + "><a href='" + splitValue[0] + "' class='savedUrls'>" + splitValue[1] + "</a></li>", a++
    }), jQuery("#contentLoader").html("<ul class='copiedUrlsList'>" + e + "</ul>"), $('<input type="checkbox" value="1" class="urlsCheckedOrNot" />').prependTo("li")
}

function displayCurrWinTabsInfo() {
    var selectAll = '<div style="margin-bottom: 8px; border-bottom: dashed 1px #777"><input id="selectAll" type="checkbox" style="" class="checkbox" /> <label style="font-weight: bold; cursor:pointer;" for="selectAll">Select all tabs</label></div>';
    $(".tabListContent").append(selectAll);
    chrome.tabs.getAllInWindow(null, function(tabArray) {
        for (i = 0; i < tabArray.length; i++) {
            var checkBox = '<input type="checkbox" class="tabArrayCheckbox" id=tab_' + i + ' value=' + i + ' /> ';
            $(".tabListContent").append("<div class='currTabItemContainter'>" + checkBox + "<label for='tab_"+i+"' title='" + tabArray[i].url + "'>" + tabArray[i].title + "</label>" + "<br/>" + "</div>");
        }
        $(".panel .newSessionPage").trigger('click');
        $("#selectAll").change(function(){
                $("input:checkbox").prop('checked', $(this).prop("checked"));
        });
    });
}

// var storage = chrome.storage.local;
// var savedSessions = new Array();

// storage.get(null, function(all) {
    // var sessionsExist = 0;
    // for ( i in all ){
        // if ( i.substring(0,4) == "[ST]" ){
            // sessionsExist = 1;
            // var tabs = all[i].tabs;
            // var details = "<div class='details'>";
            // details += "<span class='numTabs'>" + tabs.length + " tabs</span>";
            // details += ", <span class='timestamp'>saved on: " + all[i].lastSaved + "</span>" ;
            // tabs.forEach(function(tab){
                // details += "<div class='tabs'><i class='icon-heart-empty'></i> " + tab.title + "</div>";
            // });
            
            // details += "</div>";
            // $(".container .savedSessionPage ul").append("<li class='savedList'>" +
                                                            // "<div class='titleLabelBar'>" +
                                                                // "<i class='icon-star icon-large'></i><b class='titleLabel'>" + all[i].title  + "</b> (" + all[i].tabs.length + ")" +
                                                                // "<div class='sessionControls'>" +
                                                                // "<div class='btn exportExcelSessionControl'><i class='icon-external-link '></i>Export Excel</div>" +
                                                                // "<div class='btn openSessionControl'><i class='icon-external-link '></i>Open</div>" +
                                                                // "<div class='btn deleteSessionControl'><i class='icon-trash'></i>Delete</div></div>" +
                                                            // "</div>" + 
                                                            // details + 
                                                        // "</li>");
            // savedSessions.push(all[i].title);
        // }
    // }
    // if(!sessionsExist)
        // $(".container .savedSessionPage ul").html("<span class='noSessionsExist'>There are no saved sessions.</span>");

    // $(".container .savedSessionPage ul.savedList li.savedList").click(function(event){
        // var aControlClicked =
            // $(event.target).is(".exportExcelSessionControl") || $(event.target).is(".exportExcelSessionControl > *")
            // || $(event.target).is(".openSessionControl") || $(event.target).is(".openSessionControl > *")
            // || $(event.target).is(".deleteSessionControl") || $(event.target).is(".deleteSessionControl > *");

        // if( !aControlClicked ){
            // $(this).children(".details").toggle();
            // $(this).toggleClass("expanded");
        // }
    // });

    // $(".exportExcelSessionControl").on('click', function() {
        // _gaq.push(['_trackEvent', 'Export to excel', 'Clicked']);
        // var tableHtml = "<table><thead></thead><tbody>";
        // var selectedSession = $(this).parents(".savedList:first").find(".titleLabel").html();
        // storage.get("[ST]"+selectedSession, function(items){
            // if ( Object.keys(items).length > 0 ){
                // var session = items["[ST]"+selectedSession];
                // var tabsUrl = [];
                // var tabsPinned = [];
                // session.tabs.forEach(function(tab){
                    // tableHtml += "<tr><td>" + tab.url + "</td></tr>";
                    // tabsUrl.push(tab.url);
                    // tabsPinned.push(tab.pinned);
                // });
            // }
            // tableHtml += "</tbody></table>";
            // window.open('data:application/vnd.ms-excel,' + tableHtml);
        // });
    // });

    // $(".openSessionControl").on('click', function(){
        // _gaq.push(['_trackEvent', 'Open Session', 'Clicked']);
        // var selectedSession = $(this).parents(".savedList:first").find(".titleLabel").html();
        // storage.get("[ST]"+selectedSession, function(items){
            // if ( Object.keys(items).length > 0 ){
                // var session = items["[ST]"+selectedSession];
                // var tabsUrl = [];
                // var tabsPinned = [];
                // session.tabs.forEach(function(tab){
                    // tabsUrl.push(tab.url);
                    // tabsPinned.push(tab.pinned);
                // });

                // chrome.windows.create({url: tabsUrl, type:"normal"}, function(newWin){
                    // newWin.tabs.forEach(function(tab){
                        // chrome.tabs.update(tab.id, {pinned: tabsPinned[tab.index]}, function(){});
                    // });
                // });
            // }
        // });
    // });


    // $(".deleteSessionControl").on('click', function(){
        // _gaq.push(['_trackEvent', 'Delete Session', 'Clicked']);
        // var selectedSession = $(this).parents(".savedList:first").find(".titleLabel").html();
        // var confirmToDelete = confirm('Delete Session "' + selectedSession + '" ?');
        // if ( confirmToDelete ){
            // storage.remove("[ST]"+selectedSession,function(){
                // window.location.href = "popup.html";
            // });
        // }
    // });
// });

function getUrls() {
	// chrome.tabs.query({}, function(tabs) {
		// var urls = tabs.map(function(tab) {
			// chrome.downloads.download({url: tab.url});//, filename: filePath})
			// return tab.url;
		// });
	// });
	chrome.tabs.query({},function(tabs){     
    console.log("\n/////////////////////\n");
    tabs.forEach(function(tab){
	  chrome.downloads.download({url: tab.url});
      console.log(tab.url);
    });
 });
}

$(document).ready(function() {
	displayCurrWinTabsInfo();
	
	document.getElementById("submit").addEventListener("click", function (e) {
 	//getUrls();
	saveAsNewSession()
});
    
});

function saveAsNewSession(){
            var checkedList = $('input:checkbox:checked.tabArrayCheckbox').map(function(){
                return this.value;
            }).get();
            chrome.tabs.getAllInWindow(null, function(tabArray){
				var folderName = document.getElementById("folderName").value;
                for (i = 0; i < checkedList.length; i++){
                     var tabIndex = checkedList[i];
                     var tab = {};
                     tab.title = folderName + "/" + tabArray[tabIndex].title + ".html";
                     tab.url = tabArray[tabIndex].url;
					 chrome.downloads.download({url: tab.url, filename: tab.title});
                }
            });     
}

// _gaq.push(['_trackEvent', 'New Session Saved', 'Clicked']);
            // var checkedList = $('input:checkbox:checked.tabArrayCheckbox').map(function(){
                // return this.value;
            // }).get();
            // chrome.tabs.getAllInWindow(null, function(tabArray){
                // var tabsToBeSaved = [];
                // for (i = 0; i < checkedList.length; i++){
					// chrome.downloads.download({url: tab.url});
                    // var tabIndex = checkedList[i];
                    // var tab = {};
                    // tab.title = tabArray[tabIndex].title;
                    // tab.url = tabArray[tabIndex].url;
                    // tab.pinned = tabArray[tabIndex].pinned;
                    // tabsToBeSaved.push(tab);
                // }

                // //saveSessionToChromeStorage(sessionName,tabsToBeSaved);
            // });     