function Populate() {
    chrome.storage.sync.set({biology: ["https://www.w3schools.com/jsref/prop_node_parentnode.asp", "http://web.simmons.edu/~grabiner/comm244/weeknine/including-javascript.html"]}, function () {
    });
    chrome.storage.sync.set({math: ["https://www.w3schools.com/jsref/prop_node_parentnode.asp", "http://web.simmons.edu/~grabiner/comm244/weeknine/including-javascript.html"]}, function () {
    });
    let items = {}
    loadData(function(data){
        Object.assign(items, data);});

    let table = document.getElementById("table");
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);
    console.log(items["biology"])
    for (let i = 0; i < keyList.length; i++) {

        row.insertCell(0).innerHTML = keyList[i].toString();
        row.insertCell(1).innerHTML = '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
        row.insertCell(2).innerHTML = '<input type="button" value = "Restore" onClick="Javacsript:restoreTabs(this)">';

    };
};
function loadData(callback){
    chrome.storage.sync.get(null, function(data){
          callback(data);
    });
};

function deleteRow(obj){
    let index = obj.parentNode.parentNode.rowIndex;
    let key = obj.parentNode.parentNode.cells[0];
    let table = document.getElementById("table");
    table.deleteRow(index);
    chrome.storage.sync.remove([key]);
};
function restoreTabs(obj){
        let key = obj.parentNode.parentNode.cells[0];
        chrome.storage.snyc.get([key], (result) =>{
            let urls = result;
            console.log(result)
        } );

};
window.addEventListener('load', event => {
    Populate();
});