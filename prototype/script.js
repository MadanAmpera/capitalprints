const ordersURI = 'https://www.printavo.com/api/v1/orders/search?email=info%40capitalprints.com.au';

//token=O0dsluMgS1kea4gyZECQsQ&page=11&per_page=10&query='

const cToken = '&token=';
const cPage = '&page=';
const cPerPage = '&per_page=';
const cQuery = '&query=';

function showData(){
  
  var qToken = cToken + 'O0dsluMgS1kea4gyZECQsQ';
  var qPage = cPage + '1';
  var qPerPage = cPerPage + '10';
  var qQuery = cQuery + document.getElementsByTagName('h1')[0].innerHTML;
	
  var query = ordersURI + qToken + qPage + qPerPage + qQuery;
  var request = new XMLHttpRequest();

  request.open('GET', query);

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      var data = JSON.parse(this.responseText);
      _displayData(data);
    }
  };
  request.send();
}

function getData(paraArray){
  //retrieve token from HTML storage
  //if empty
    //login
    //update token
  //call
    //if unauthorized
      //login
      //update toke
    //call again
  //show data
}

function search(){
  if(event.key == 'Enter'){
    var qToken = cToken + 'O0dsluMgS1kea4gyZECQsQ';
    var qPage = cPage + '1';
    var qPerPage = cPerPage + '10';
    var qQuery = cQuery + document.getElementsByTagName('h1')[0].innerHTML;
    qQuery = qQuery + ' ' + document.getElementById("searchbox").value;
    //form query
    var query = ordersURI + qToken + qPage + qPerPage + qQuery;
    var request = new XMLHttpRequest();

    request.open('GET', query);

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        var data = JSON.parse(this.responseText);
        _displayData(data);
      }
    };
    request.send();
    
    var ctrlFind = document.getElementById("searchbox").value;
    window.find(ctrlFind);
  }
}

function _displayData(data){
    tableHeaders();
    addRows(data);
		showPages(data.meta);
		showCurrentSelection(data.meta.page);
		setOnClicks();
}

function tableHeaders(){
  var tOrders = document.getElementById('orders');
  tOrders.innerHTML = '';
  var headers = ['Date', 'ID', 'Order Name', 'Total', 'Invoice'];
  var thead = document.createElement("thead");
  thead.setAttribute('class', 'thead-light');
  tOrders.appendChild(thead);
  var trH = thead.insertRow();
  headers.forEach(element => {
    var header = document.createElement('th');
    header.setAttribute('scope', 'col');
    header.innerHTML = element;
    trH.appendChild(header);
  });
}

function addRows(data){
  var ordersTable = document.getElementById('orders');
  var tbody = document.createElement('tbody');
  ordersTable.appendChild(tbody);
  
  data.data.forEach(element => {
       var tr = tbody.insertRow();
       var colorCode = "background-color:" + element.orderstatus.color + "; opacity:0.5;"
        tr.setAttribute('style', colorCode);
       //var th = document.createElement('th');
       //th.setAttribute('scope', 'row');
       //tr.appendChild(th);
       var td0 = tr.insertCell();
       //const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(element.created_at);
       //td0.innerHTML = '${day}-${month}-${year}';//date
      var createdDate = new Date(element.created_at);
      var year = createdDate.getFullYear();
    year = year.toString().substr(-2);  
		var month = createdDate.getMonth() + 1;
      var dt = createdDate.getDate();  
		td0.innerHTML = dt + '/' + month + '/' + year;//date
      var td1 = tr.insertCell();
      td1.innerHTML = element.visual_id;
      var td2 = tr.insertCell();
      td2.innerHTML = element.order_nickname;
      var td3 = tr.insertCell();
      td3.innerHTML = '$' + element.order_total;
      var td4 = tr.insertCell();
      var invoiceButton = document.createElement('a');
      invoiceButton.setAttribute('href', element.public_url);
		invoiceButton.setAttribute('target', '_blank');
      invoiceButton.setAttribute('class', 'btn btn-outline-dark btn-sm');
      invoiceButton.innerHTML = "view";
      td4.appendChild(invoiceButton);
    });
  
}

function showPages(data){
  //dynamically add numbers based on meta
  var totalPages = data.total_pages;
  var currentPage = data.page;
  var flag = document.getElementById("flag");
  //populate numbers
  if(totalPages <= 7){
    //Elipsis None
    for(let i=1;i<=totalPages;i++){
      var lid = 'li' + i;
      document.getElementById(i).innerHTML = i;
      document.getElementById(lid).style.display = 'block';
    }
    //hiding remaining cells
    for(let i=totalPages+1; i<=7;i++){
      var lid = 'li' + i;
      document.getElementById(lid).style.display = 'none';
    }
    flag.innerHTML = "none";
  }
  else {
    if(currentPage-4 <= 1){
      //Elipsis end
      
      for(let i=1; i<=4;i++){
        document.getElementById(i).innerHTML = i;
        var lid = 'li' + i;
        document.getElementById(lid).style.display = 'block';  
      }
      document.getElementById(5).innerHTML = '..';
      document.getElementById('li5').style.display = 'block';
      document.getElementById('li6').style.display = 'none';
      document.getElementById(7).innerHTML = totalPages;
      document.getElementById('li7').style.display = 'block';
      flag.innerHTML = "end";
    }
    else if(currentPage+4 >= totalPages){
      //Elipsis start
      for(let i=4; i<=7;i++){
				var diff = 7 - i;
        document.getElementById(i).innerHTML = totalPages-diff;
        var lid = 'li' + i;
        document.getElementById(lid).style.display = 'block';
      }
      document.getElementById(1).innerHTML = 1;
      document.getElementById('li1').style.display = 'block';
      document.getElementById(2).innerHTML = '..';
      document.getElementById('li2').style.display = 'block';
      document.getElementById('li3').style.display = 'none';
      flag.innerHTML = "start";
    }
    else if(totalPages >= 9){
      //Elipsis both
      document.getElementById(4).innerHTML = currentPage;
      document.getElementById('li4').style.display = 'block';
      document.getElementById(3).innerHTML = currentPage-1;
      document.getElementById('li3').style.display = 'block';
      document.getElementById(5).innerHTML = currentPage+1;
      document.getElementById('li5').style.display = 'block';
      document.getElementById(1).innerHTML = 1;
      document.getElementById('li1').style.display = 'block';
      document.getElementById(2).innerHTML = '..';
      document.getElementById('li2').style.display = 'block';
      document.getElementById(6).innerHTML = '..';
      document.getElementById('li6').style.display = 'block';
      document.getElementById(7).innerHTML = totalPages;
      document.getElementById('li7').style.display = 'block';
      flag.innerHTML = "both";
    }
  }
}

function showCurrentSelection(currentPage){
	var flag = document.getElementById("flag");
  for(let i=1; i<=7; i++){
    var pgNum = document.getElementById(i).innerHTML;
    var lid = 'li' + i;
    var currentLi = document.getElementById(lid);
    if(pgNum == currentPage){
      currentLi.setAttribute('class', 'page-item active');
			flag.innerHTML = currentPage;
    }
    else{
      currentLi.setAttribute('class', 'page-item');
    }
  }
}

function setOnClicks(){
  //an li
  for(let i=1; i<=7; i++){
    var lid = 'li' + i;
    var elementLi = document.getElementById(lid);
    var innerHTML = document.getElementById(i).innerHTML;
    
    if(elementLi.style.display == 'block'){
      if(innerHTML == '..'){
        if(i < 4){
          elementLi.setAttribute('onclick', 'elipsisStart()');
        }
        else if(i > 4){
          elementLi.setAttribute('onclick', 'elipsisEnd()');
        }
      }
      else{
        var numClick = 'numberClick(' + innerHTML + ')';
        elementLi.setAttribute('onclick', numClick);
      }
    }
    else{
      //set onclik to empty - test
      elementLi.setAttribute('onclick', '');
    } 
  }
}

function numberClick(pgNum){
  //change the page para
  var qToken = cToken + 'O0dsluMgS1kea4gyZECQsQ';
  var qPage = cPage + pgNum;
  var qPerPage = cPerPage + '10';
  var qQuery = cQuery + document.getElementsByTagName('h1')[0].innerHTML;
  qQuery = qQuery + ' ' + document.getElementById("searchbox").value;
  //form query
  var query = ordersURI + qToken + qPage + qPerPage + qQuery;
  var request = new XMLHttpRequest();

  request.open('GET', query);

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      var data = JSON.parse(this.responseText);
      _displayData(data);
    }
  };
  request.send();
}

function elipsisEnd(){
  //need current page number
  var currentPage = parseInt(document.getElementById("flag").innerHTML, 10);//document.getElementById("flag").innerHTML;
  
  //+3
  var qToken = cToken + 'O0dsluMgS1kea4gyZECQsQ';
  var qPage = currentPage + 3;
  qPage = cPage + qPage;
  var qPerPage = cPerPage + '10';
  var qQuery = cQuery + document.getElementsByTagName('h1')[0].innerHTML;
  qQuery = qQuery + ' ' + document.getElementById("searchbox").value;
  //form query
  var query = ordersURI + qToken + qPage + qPerPage + qQuery;
  
  var request = new XMLHttpRequest();

  request.open('GET', query);

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      var data = JSON.parse(this.responseText);
      _displayData(data);
    }
  };
  request.send();
}

function elipsisStart(){
  //need current page number
  var currentPage = parseInt(document.getElementById("flag").innerHTML, 10);
  //-3
  var qToken = cToken + 'O0dsluMgS1kea4gyZECQsQ';
  var qPage = currentPage - 3;
  qPage = cPage + qPage;
  var qPerPage = cPerPage + '10';
  var qQuery = cQuery + document.getElementsByTagName('h1')[0].innerHTML;
  qQuery = qQuery + ' ' + document.getElementById("searchbox").value;
  //form query
  var query = ordersURI + qToken + qPage + qPerPage + qQuery;
  var request = new XMLHttpRequest();

  request.open('GET', query);

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      var data = JSON.parse(this.responseText);
      _displayData(data);
    }
  };
  request.send();
}
