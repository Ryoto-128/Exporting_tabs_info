let action_button = document.getElementById("action-button");

action_button.addEventListener("click", async() => {
    let queryOprions = {
        // active: true,
        currentWindow: true
    };
    await chrome.tabs.query(queryOprions, tabs_detail => {
        let tabs_list = new Array();

        for(let tab_index=0; tab_index<tabs_detail.length; tab_index++){
            tabs_list.push(
                {
                    "tab_title": tabs_detail[tab_index].title,
                    "tab_url": tabs_detail[tab_index].url
                }
            );

            // chrome.tabs.remove(tabs_detail[tab_index].id);
        };

        chrome.storage.local.set({data: tabs_list}, () => {
            console.log("SET: tabs_list");
        });

        chrome.runtime.sendMessage({action: "read"}, (responce) => {
            console.log(responce.status);
        });
    });
}); 


// memo: async関係なく[chrome.*]の実行が完了する前に次のスクリプトに移動している。