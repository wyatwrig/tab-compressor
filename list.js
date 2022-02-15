function Populate(data) {
    /*Take one input data from chrome.storage. Uses this
    information to fill out HTML table.
     */
    console.log(data)
    let keyList = Object.keys(data) //get a list of the dif keys in the data object
    let table = document.getElementById("table"); //find table node
    let rowCount = table.rows.length;
    for (let i = 0; i < keyList.length; i++) {
        let row = table.insertRow(rowCount); //insert row that is 3 long
        row.id = i.toString() // keep track of row by id
        //insert cells into row
        row.insertCell(0).innerHTML = keyList[i].toString();
        row.insertCell(1).innerHTML = '<input type="button" value = "Delete" id="delete' + row.id + '">';
        row.insertCell(2).innerHTML = '<input type="button" value = "Restore"  id="">';
        //add event listeners to input node
        row.cells[1].firstChild.addEventListener("click",function(){deleteRow(i)});
        row.cells[2].firstChild.addEventListener("click",function(){restoreTabs(i)});
    };
};
function loadData(){
    /* because this program has no local cache,
    LoadData() takes no inputs and fetches all the
    user sessions async while also calling populate
     */
        chrome.storage.sync.get(null, function(data){
            console.log(data);
            Populate(data);
        });
    };

function testData(){
    /* A function that takes no inputs for testing purposes.
    It serves to populate storage enough to ensure features in list HTML
    are working.
     */
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
    /*takes input that corresponds to row id.
    With this information we
     */
    const row = document.getElementById(i.toString());
    const key = row.cells[0].innerHTML;
    row.remove();
    chrome.storage.sync.remove([key], function(){})
};
function restoreTabs(i){
    const row = document.getElementById(i.toString());
    const key = row.cells[0].innerHTML;
    chrome.storage.sync.get([key], function(data){
        console.log(data)
        console.log(data[key])
        let list = data[key];
        for(let j = 0; j < list.length; j++){
            let obj = {url: list[j]};
            chrome.tabs.create(obj, function(){});
        };
    })


};


/*Run these function on window load to fill the HTML page.
Call the function described above
 */

testData();
window.addEventListener('load', event => {
    alert("now we load data")
    loadData();
    });