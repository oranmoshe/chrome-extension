 // On Message 
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.offensive_counter!=null){
      tabs_counters[sender.tab.id] = String(request.offensive_counter);
      update_badge(tabs_counters[sender.tab.id]);  
    }
  });

 // On tab changes
chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tab) {
        	update_badge(get_tab_counter(activeInfo.tabId)); 
    });
});

var tabs_counters = new Array();
function get_tab_counter(tab_id){
 	return tabs_counters[tab_id];

 }
 function update_badge(counter){
 	if(counter>0){
 		chrome.browserAction.setBadgeBackgroundColor({ color: '#343434' });
 		chrome.browserAction.setBadgeText({text: String(counter)}); 
 	}
 	else
    	clear_badge();
 }
 function clear_badge(){
 	chrome.browserAction.setBadgeText({text: ""}); 
 }

