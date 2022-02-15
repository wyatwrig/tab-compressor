/*Listen for the click of the submit button then process
the tab information
 */
document.getElementById("session-submit").addEventListener("click",function(){
    let tabs = storeTabs().then((tabs)=>{syncChromeStorage(tabs); }); //take the promise returned form storeTabs wait to fufil then pass on
    console.log(tabs);
} );

function storeTabs(){
    /*take the async API response and store it
    in a Promise to be resolved
     */
   return new Promise((resolve) => {
       chrome.tabs.query({currentWindow: true}, function(tabs){ //aysnc API call for the tab information
           resolve(tabs)
       });
   });
};

function syncChromeStorage(tabs){ //this input is a promise that is fulfilled
    /*Now that the Promise has been fufiled and
    the values are available, this function
    will pack the tab information into a session
     */
    let urls = [];
    let obj = {};
    const sessionName = document.getElementById("session-input").value; // fetch the session input
    tabs.forEach((tab)=>{urls.push(tab.url)}); //populate the urls
    obj[sessionName] = urls; //populate the obj
    chrome.storage.sync.set(obj, function(){}); // store obj in chrome.storage
};





