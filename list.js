function Populate(){
    let keyList;
    let table = document.getElementById("table");
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);

    chrome.storage.get(null, (items)=>{keyList = Objects.keys(items)});
}   console.log(keyList);
    for(let i = 0; i < keyList.length; i++){
        row.insertCell(0).innerHTML = toString(keyList[i]);
        row.insertCell(1).innerHTML = '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
        row.insertCell(2).innerHTML = '<input type="button" value = "Restore" onClick="Javacsript:restoreTabs()">';

    }
function deleteRow(obj){

}
function restoreTabs(){

}