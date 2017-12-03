var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-77426139-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

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