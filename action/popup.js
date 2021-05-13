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

        let encode_json = JSON.stringify(tabs_list);
        let convert_to_blob = new Blob([encode_json], {type: 'application/json'});
        let convert_to_objecturl = URL.createObjectURL(convert_to_blob);

        let download_link = document.createElement('a');
        download_link.href = convert_to_objecturl;
        download_link.download = 'tabs_list.json';
        download_link.click();

        URL.revokeObjectURL(convert_to_objecturl);
    });
}); 