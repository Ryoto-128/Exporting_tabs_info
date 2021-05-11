"use strict";

var action_button = document.getElementById("action-button");
action_button.addEventListener("click", function _callee() {
  var tab_list, queryOprions;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          tab_list = new Array();
          queryOprions = {
            // active: true,
            currentWindow: true
          };
          _context.next = 4;
          return regeneratorRuntime.awrap(chrome.tabs.query(queryOprions, function (tabs) {
            for (var tab_index = 0; tab_index < tabs.length; tab_index++) {
              tab_list.push({
                "tab_title": tabs[tab_index].title,
                "tab_url": tabs[tab_index].url
              }); // chrome.tabs.remove(tabs[tab_index].id);
            }
          }));

        case 4:
          console.log(tab_list);
          chrome.runtime.sendMessage({
            tabs_data: tab_list
          }, function (response) {
            console.log(response.status);
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});