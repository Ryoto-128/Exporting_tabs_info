let action_button = document.getElementById("action-button");

action_button.addEventListener("click", async() => {
    let tab_list = new Array();

    let queryOprions = {
        // active: true,
        currentWindow: true
    };
    await chrome.tabs.query(queryOprions, tabs => {
        for(let tab_index=0; tab_index<tabs.length; tab_index++){
            tab_list.push(
                {
                    "tab_title": tabs[tab_index].title,
                    "tab_url": tabs[tab_index].url
                }
            );

            // chrome.tabs.remove(tabs[tab_index].id);
        };
    });
});