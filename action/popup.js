// copy button
let copy_button = document.getElementById("copy-button");

copy_button.addEventListener("click", async() => {
    let queryOprions = {
        // active: true,
        currentWindow: true
    };
    await chrome.tabs.query(queryOprions, tabs_detail => {

        // tab_data -> array
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


        // // tab_data array -> encode to json -> write to clipboard
        // let encode_json = JSON.stringify(tabs_list);

        // navigator.clipboard.writeText(encode_json).then(function() {
        //     alert('clipboard successfully set ');
        // }, function() {
        //     alert('clipboard write failed');
        // });


        // tab_data array -> encode to MDtext -> write to clipboard
        let encode_str = new String();

        tabs_list.forEach(tab_data => {
            encode_str += "[" + tab_data.tab_title + "](" + tab_data.tab_url+ ")";
            encode_str += ",\n"
        });

        navigator.clipboard.writeText(encode_str).then(function() {
            alert('clipboard successfully set ');
            // close all tabs
            for(let tab_index=0; tab_index<tabs_detail.length; tab_index++){
                chrome.tabs.remove(tabs_detail[tab_index].id);
            };
        }, function() {
            alert('clipboard write failed');
        });
    });
});




// insert into notiondb



// download button
let action_button = document.getElementById("download-button");

action_button.addEventListener("click", async() => {
    let queryOprions = {
        // active: true,
        currentWindow: true
    };
    await chrome.tabs.query(queryOprions, tabs_detail => {

        // tab_data -> array
        let tabs_list = new Array();
        for(let tab_index=0; tab_index<tabs_detail.length; tab_index++){
            tabs_list.push(
                {
                    "tab_title": tabs_detail[tab_index].title,
                    "tab_url": tabs_detail[tab_index].url
                }
            );
        };


        // tab_data array ->  encode to json -> cpnvert to blob -> create URL
        let encode_json = JSON.stringify(tabs_list);
        let convert_to_blob = new Blob([encode_json], {type: 'application/json'});
        let convert_to_objecturl = URL.createObjectURL(convert_to_blob);

        // download_link URL -> <a> + filename -> auto click
        let download_link = document.createElement('a');
        download_link.href = convert_to_objecturl;
        let today = formatDate(new Date(), 'YYYYMMDD_hhmmss')
        download_link.download = 'tabs_list_' + today + '.json';
        download_link.click();

        URL.revokeObjectURL(convert_to_objecturl);


        // close all tabs
        for(let tab_index=0; tab_index<tabs_detail.length; tab_index++){
            chrome.tabs.remove(tabs_detail[tab_index].id);
        };
    });
});


function formatDate(date, format) {

    if (!format) {
        format = 'YYYY/MM/DD hh:mm:ss';
    };

    format = format.replace(/YYYY/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));

    return format;
};
