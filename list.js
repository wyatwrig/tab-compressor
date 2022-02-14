 function Populate(data) {


    let keyList = Object.keys(data)
    let table = document.getElementById("table");
    let rowCount = table.rows.length;
    for (let i = 0; i < keyList.length; i++) {
        let row = table.insertRow(rowCount);
        row.id = i.toString()
        console.log(row.id)
        row.insertCell(0).innerHTML = keyList[i].toString();
        row.insertCell(1).innerHTML = '<input type="button" value = "Delete" id="delete' + row.id + '">';
        row.insertCell(2).innerHTML = '<input type="button" value = "Restore"  id="">';

        row.cells[1].firstChild.addEventListener("click",function(){deleteRow(i)});
        row.cells[2].firstChild.addEventListener("click",function(){restoreTabs(i)});

    };
};
function loadData(){
   chrome.storage.sync.get(null, function(data){
       Populate(data);

   });
};



function testData(){
         chrome.storage.sync.set(
            {
                biology:
                    [
                        "https://www.w3schools.com/jsref/prop_node_parentnode.asp",
                        "http://web.simmons.edu/~grabiner/comm244/weeknine/including-javascript.html"
                    ],
                math:
                    [
                        "https://www.w3schools.com/jsref/prop_node_parentnode.asp",
                        "http://web.simmons.edu/~grabiner/comm244/weeknine/including-javascript.html"
                    ],

            },);

};

function deleteRow(i){
    const row = document.getElementById(i.toString());
    const key = row.cells[0].innerHTML;
    row.remove();
    chrome.storage.sync.remove([key], function(){alert("removal was a success")})
};
function restoreTabs(i){
    const row = document.getElementById(i.toString());
    console.log();
    const key = row.cells[0].innerHTML;
    chrome.storage.sync.get([key], function(data){
        console.log(data)
        let list = Object.values(data[key]);
        console.log(list)
        for(let j = 0; j < list.length; j++){
            console.log(j)
            console.log(list[j])
            let obj = {url: list[j]};
            console.log(obj);

            chrome.tabs.create(obj, function(){alert("the tabs where created ")})
        };
    })


};




testData()
window.addEventListener('load', event => {
    loadData();
});