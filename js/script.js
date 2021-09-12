var submit = document.querySelector('.btn');
var bookmarkName = document.querySelector('.bookmark');
var bookmarkUrl = document.querySelector('.url');
var tablehead = document.querySelector('.tablehead');
var thebody = document.querySelector('.tablebody');
var err = document.querySelector(".err")
var bookmarks = [];
var del = "";




if (localStorage.getItem('setData') == null) {
    var bookmarks = [];
} else {
    bookmarks = JSON.parse(localStorage.getItem('setData'));
    showData();
}

function inputsValidation() {
    if (bookmarkName.value == "" || bookmarkUrl.value == "") {
        err.innerHTML = ` <h2 class=" btn btn-danger mt-5 "> sorry, all field are reqired</h2>`
    } else {

        return true;
    }

}

function validateURL() {
    var reg = /[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&=]*)/
    var checkUrl = bookmarkUrl.value;
    var result = reg.test(checkUrl);
    if (result) {
        
        return true
    } else {
        err.innerHTML = `<h2 class=" btn btn-danger mt-5 "> sorry,url doenst match the format </h2>`

    }
}

submit.addEventListener("click", addbookmark)


function addbookmark() {

    if (inputsValidation() == true && validateURL() == true) {
        err.innerHTML = " ";
        var bookrmark = {
            bookmarkInput: bookmarkName.value,
            urlInput: bookmarkUrl.value
        }

        bookmarks.unshift(bookrmark);
        localStorage.setItem("setData", JSON.stringify(bookmarks));
        showData();
        clear();
    

    }
}


function showData() {
    var str = "";
    var strbody = "";

    for (i = 0; i < bookmarks.length; i++) {

        str = `<tr>
            <th>website name</th>
            <th> </th>
            <th> </th>
              </tr>`
        tablehead.innerHTML = str;

        strbody += `<tr>
        <td>${bookmarks[i].bookmarkInput}</td> 
        <td><a href='${bookmarks[i].urlInput}' target="_blank"> <i class="fas fa-external-link-square-alt text-light"></i> </a></td>
        <td> <button onclick="deleteBookmarl(${i})" class="btn btn-danger del ">Delete</button></td>
        </tr>`
        thebody.innerHTML = strbody;
    }

}


function deleteBookmarl(index) {
    bookmarks.splice(index, 1);
    localStorage.setItem("setData", JSON.stringify(bookmarks));
    showData();

}

function clear() {
    bookmarkName.value = "";
    bookmarkUrl.value = "";
}