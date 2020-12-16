var buttonClass;
var dateArray = [];
var queryDate = "";
const range = document.createRange();
const sandbox = document.getElementById("sandbox");

const ordersURI =
  "https://www.printavo.com/api/v1/orders/search?email=info%40capitalprints.com.au";

//token=O0dsluMgS1kea4gyZECQsQ&page=11&per_page=10&query='

const cToken = "&token=";
const cPage = "&page=";
const cPerPage = "&per_page=";
const cQuery = "&query=";

const defaultOptions = {
  allowOneSidedRange: false,
  autohide: true,
  beforeShowDay: null,
  beforeShowDecade: null,
  beforeShowMonth: null,
  beforeShowYear: null,
  calendarWeeks: false,
  clearBtn: false,
  dateDelimiter: ",",
  datesDisabled: [],
  daysOfWeekDisabled: [],
  daysOfWeekHighlighted: [],
  defaultViewDate: new Date().setHours(0, 0, 0, 0),
  disableTouchKeyboard: false,
  format: "dd/mm/yyyy",
  language: "en",
  maxDate: null,
  maxNumberOfDates: 1,
  maxView: 3,
  minDate: null,
  nextArrow: "»",
  orientation: "auto",
  prevArrow: "«",
  showDaysOfWeek: true,
  showOnFocus: true,
  startView: 0,
  title: "",
  todayBtn: false,
  todayHighlight: false,
  weekStart: 0,
};

function pageSetup(tbFlag) {
  window.templates = {
    input: `<div class="form-group"><input type="text" class="form-control date"></div>`,
    inline: `<div class="date"></div>`,
    range: `<div class="d-flex flex-row date input-daterange">
  <div class="form-group">
  <input type="text" name="range-start" class="form-control" placeholder="date from">
  </div>
  <div class="flex-grow-0">
  <a class="btn" disabled>to</a>
  </div>
  <div class="form-group">
  <input type="text" name="range-end" class="form-control" placeholder="date to">
  </div>
  </div>`,
  };
  window.beforeShowFns = {
    beforeShowDay(date) {
      if (date.getMonth() == new Date().getMonth()) {
        switch (date.getDate()) {
          case 4:
            return {
              content:
                '<span data-toggle="tooltip" title="Example tooltip">4</span>',
              classes: "bg-info",
            };
          case 8:
            return false;
          case 12:
            return "text-success";
        }
      }
    },
    beforeShowMonth(date) {
      switch (date.getMonth()) {
        case 6:
          if (date.getFullYear() === new Date().getFullYear()) {
            return { content: "🎉" };
          }
          break;
        case 8:
          return false;
      }
    },
    beforeShowYear(date) {
      switch (date.getFullYear()) {
        case 2017:
          return false;
        case 2020:
          return {
            content:
              '<span data-toggle="tooltip" data-placement="bottom" title="Tooltip text">2020</span>',
          };
      }
    },
    beforeShowDecade(date) {
      switch (date.getFullYear()) {
        case 2000:
          return false;
        case 2100:
          return {
            content: "💯",
            classes: "bg-success",
          };
      }
    },
  };
  window.buttonClass = "btn";
  window.addError = function addError(el) {
    el.classList.add("is-invalid");
  };
  window.removeErrors = function removeErrors(el) {
    el.classList.remove("is-invalid");
  };

  switchPicker("range");

  if (tbFlag == 1) {
    showData();
  }
}

function parseHTML(html) {
  return range.createContextualFragment(html);
}

function switchPicker(type) {
  const options = buttonClass ? { buttonClass } : {};
  if (window.demoPicker) {
    const currentOpts =
      window.demoPicker instanceof DateRangePicker
        ? window.demoPicker.datepickers[0]._options
        : window.demoPicker._options;
    Object.keys(defaultOptions).reduce((opts, key) => {
      if (
        key in currentOpts &&
        String(currentOpts[key] !== String(defaultOptions[key]))
      ) {
        opts[key] = currentOpts[key];
      }
      return opts;
    }, options);

    window.demoPicker.destroy();
    sandbox.removeChild(sandbox.firstChild);
  }
  sandbox.appendChild(parseHTML(templates[type]));

  const el = sandbox.querySelector(".date");
  window.demoPicker =
    type === "range"
      ? new DateRangePicker(el, options)
      : new Datepicker(el, options);
}

function showData() {
  var qToken = cToken + "O0dsluMgS1kea4gyZECQsQ";
  var qPage = cPage + "1";
  var qPerPage = cPerPage + "10";
  var qQuery = cQuery + document.getElementsByTagName("h1")[0].innerHTML;

  var query = ordersURI + qToken + qPage + qPerPage + qQuery;
  var request = new XMLHttpRequest();

  request.open("GET", query);

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      var data = JSON.parse(this.responseText);
      _displayData(data);
    }
  };
  request.send();
}

function search() {
  if (event.key == "Enter") {
    var qToken = cToken + "O0dsluMgS1kea4gyZECQsQ";
    var qPage = cPage + "1";
    var qPerPage = cPerPage + "10";
    var qQuery = cQuery + document.getElementsByTagName("h1")[0].innerHTML;
    qQuery = qQuery + " " + document.getElementById("searchbox").value;
    qQuery = qQuery + " " + queryDate;
    //form query
    var query = ordersURI + qToken + qPage + qPerPage + qQuery;
    var request = new XMLHttpRequest();

    request.open("GET", query);

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        var data = JSON.parse(this.responseText);
        _displayData(data);
      }
    };
    request.send();
  }
}

function searchClick() {
  var qToken = cToken + "O0dsluMgS1kea4gyZECQsQ";
  var qPage = cPage + "1";
  var qPerPage = cPerPage + "10";
  var qQuery = cQuery + document.getElementsByTagName("h1")[0].innerHTML;
  qQuery = qQuery + " " + document.getElementById("searchbox").value;
  qQuery = qQuery + " " + queryDate;
  //form query
  var query = ordersURI + qToken + qPage + qPerPage + qQuery;
  var request = new XMLHttpRequest();

  request.open("GET", query);

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      var data = JSON.parse(this.responseText);
      _displayData(data);
    }
  };
  request.send();
}

function _displayData(data) {
  tableHeaders();
  addRows(data);
  if (queryDate == "") {
    showPages(data.meta);
  } else {
    document.getElementById("pages").style.display = "none";
  }
  showCurrentSelection(data.meta.page);
  setOnClicks();
}

function tableHeaders() {
  var tOrders = document.getElementById("orders");
  tOrders.innerHTML = "";
  var headers = ["Date", "ID", "Order Name", "Total", "Status", "Invoice"];
  var thead = document.createElement("thead");
  thead.setAttribute("class", "thead-light");
  tOrders.appendChild(thead);
  var trH = thead.insertRow();
  headers.forEach((element) => {
    var header = document.createElement("th");
    header.setAttribute("scope", "col");
    header.innerHTML = element;
    trH.appendChild(header);
  });
}

function addRows(data) {
  var ordersTable = document.getElementById("orders");
  var tbody = document.createElement("tbody");
  ordersTable.appendChild(tbody);

  data.data.forEach((element) => {
    //var colorCode = "background-color:" + element.orderstatus.color; //+ "; opacity:0.5;"
    //tr.setAttribute("style", colorCode);
    //var th = document.createElement('th');
    //th.setAttribute('scope', 'row');
    //tr.appendChild(th);

    //const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(element.created_at);
    //td0.innerHTML = '${day}-${month}-${year}';//date
    var createdDate = new Date(element.created_at);
    var year = createdDate.getFullYear();
    var month = createdDate.getMonth() + 1;
    var dt = createdDate.getDate();

    //dirty date check
    if (queryDate != "") {
      var dbDt = "";
      var dbMon = "";
      if (dt < 10) {
        dbDt = "0" + dt;
      } else {
        dbDt = dt;
      }
      if (month < 10) {
        dbMon = "0" + month;
      } else {
        dbMon = month;
      }

      var checkDt = `${dbDt}-${dbMon}-${year}`;

      if (checkDt != queryDate) {
        return;
      }
    }
    year = year.toString().substr(-2);

    var tr = tbody.insertRow();
    var td0 = tr.insertCell();

    td0.innerHTML = dt + "/" + month + "/" + year; //date
    var td1 = tr.insertCell();
    td1.innerHTML = element.visual_id;
    var td2 = tr.insertCell();
    td2.innerHTML = element.order_nickname;
    var td3 = tr.insertCell();
    td3.innerHTML = "$" + element.order_total;
    var td4 = tr.insertCell();
    var statusButton = document.createElement("div");
    // statusButton.setAttribute("type", "button");
    // statusButton.setAttribute("class", "btn btn-primary btn-sm");
    var buttonStyle =
      "background:" +
      element.orderstatus.color +
      ";" +
      "border-color:" +
      element.orderstatus.color +
      ";" +
      "cursor:default;" +
      "width:230px;" + 
      "border-radius: 0.2rem;" + 
      "color: #fff;" + 
      "text-align: center;" + 
      "text-transform: uppercase;" +
      "font-weight: bold;" +
      "font-size: 0.875rem;";
    statusButton.setAttribute("style", buttonStyle);
    statusButton.innerHTML = element.orderstatus.name;
    td4.appendChild(statusButton);
    var td5 = tr.insertCell();
    var invoiceButton = document.createElement("a");
    invoiceButton.setAttribute("href", element.public_url);
    invoiceButton.setAttribute("target", "_blank");
    invoiceButton.setAttribute("class", "btn btn-outline-dark btn-sm");
    invoiceButton.innerHTML = "view";
    td5.appendChild(invoiceButton);
  });
}

function clearDates() {
  queryDate = "";
  document.getElementById("currentDate").innerHTML = 0;
  pageSetup(0);
  document.getElementById("dateButtons").style.display = "none";
  searchClick();
}

function showDates() {
  document.getElementById("currentDate").innerHTML = "0";
  //we need the selection of date ranges
  var startDate = document.getElementsByName("range-start")[0].value;
  var endDate = document.getElementsByName("range-end")[0].value;

  if (startDate == "" || endDate == "") {
    return;
  }

  var dtEnd = new Date(endDate);
  var nextDay = new Date(startDate);

  dateArray = [];

  do {
    //get date from nextDay
    var date = nextDay.getDate();
    var dbDate = "";
    if (date < 10) {
      dbDate = "0" + date;
    } else {
      dbDate = date;
    }
    //get month from nextDay
    var month = nextDay.getMonth() + 1;
    var dbMonth = "";
    if (month < 10) {
      dbMonth = "0" + month;
    } else {
      dbMonth = month;
    }
    //get year from nextDay
    var year = nextDay.getFullYear(); //.toString().slice(-2);
    //add to date array
    var dtButton = `${dbDate}/${dbMonth}/${year}`;
    dateArray.push(dtButton);
    //increment nextDay
    nextDay.setDate(nextDay.getDate() + 1);
  } while (nextDay.valueOf() <= dtEnd.valueOf());

  dayButtons();
}

function dayButtons() {
  document.getElementById("dateButtons").style.display = "block";

  var totalPages = dateArray.length;
  var currentPage = parseInt(
    document.getElementById("currentDate").innerHTML,
    10
  );
  //populate numbers
  if (totalPages <= 7) {
    //Elipsis None
    for (let i = 1; i <= totalPages; i++) {
      var lid = "dt" + i;
      var d = "d" + i;
      document.getElementById(d).innerHTML = dateArray[i - 1];
      document.getElementById(lid).style.display = "block";
      let dtClick = "dateClick(" + (i - 1) + ")";
      document.getElementById(lid).setAttribute("onclick", dtClick);

      if (i - 1 == currentPage) {
        document.getElementById(lid).setAttribute("class", "page-item active");
      } else {
        document.getElementById(lid).setAttribute("class", "page-item");
      }
    }
    //hiding remaining cells
    for (let i = totalPages + 1; i <= 7; i++) {
      var lid = "dt" + i;
      document.getElementById(lid).style.display = "none";
      document.getElementById(lid).setAttribute("onclick", "");
    }
  } else {
    if (currentPage - 3 <= 0) {
      //Elipsis end

      for (let i = 1; i <= 4; i++) {
        var d = "d" + i;
        document.getElementById(d).innerHTML = dateArray[i - 1];
        var lid = "dt" + i;
        document.getElementById(lid).style.display = "block";
        let dtClick = "dateClick(" + (i - 1) + ")";
        document.getElementById(lid).setAttribute("onclick", dtClick);

        if (i - 1 == currentPage) {
          document
            .getElementById(lid)
            .setAttribute("class", "page-item active");
        } else {
          document.getElementById(lid).setAttribute("class", "page-item");
        }
      }
      document.getElementById("d5").innerHTML = "..";
      document.getElementById("dt5").style.display = "block";
      document.getElementById("dt5").setAttribute("class", "page-item");
      document.getElementById("dt5").setAttribute("onclick", "elipsisDtEnd(5)");
      document.getElementById("dt6").style.display = "none";
      document.getElementById("dt6").setAttribute("class", "page-item");
      document.getElementById("dt6").setAttribute("onclick", "");
      document.getElementById("d7").innerHTML = dateArray.slice(-1);
      document.getElementById("dt7").style.display = "block";
      document.getElementById("dt7").setAttribute("class", "page-item");
      let dtClick = "dateClick(" + (dateArray.length - 1) + ")";
      document.getElementById("dt7").setAttribute("onclick", dtClick);
    } else if (currentPage + 3 >= totalPages) {
      //Elipsis start
      for (let i = 4; i <= 7; i++) {
        var diff = 7 - i;
        var d = "d" + i;
        document.getElementById(d).innerHTML =
          dateArray[totalPages - (diff + 1)];
        var lid = "dt" + i;
        document.getElementById(lid).style.display = "block";
        let arIndex = totalPages - (diff + 1);
        let dtClick = "dateClick(" + arIndex + ")";
        document.getElementById(lid).setAttribute("onclick", dtClick);

        if (totalPages - (diff + 1) == currentPage) {
          document
            .getElementById(lid)
            .setAttribute("class", "page-item active");
        } else {
          document.getElementById(lid).setAttribute("class", "page-item");
        }
      }
      document.getElementById("d1").innerHTML = dateArray[0];
      document.getElementById("dt1").style.display = "block";
      document.getElementById("dt1").setAttribute("class", "page-item");
      let clickDt = "dateClick(" + 0 + ")";
      document.getElementById("dt1").setAttribute("onclick", clickDt);
      document.getElementById("d2").innerHTML = "..";
      document.getElementById("dt2").style.display = "block";
      document.getElementById("dt2").setAttribute("class", "page-item");
      document
        .getElementById("dt2")
        .setAttribute("onclick", "elipsisDtStart(6)");
      document.getElementById("dt3").style.display = "none";
      document.getElementById("dt3").setAttribute("class", "page-item");
      document.getElementById("dt3").setAttribute("onclick", "");
    } else if (totalPages >= 9) {
      //Elipsis both
      document.getElementById("d4").innerHTML = dateArray[currentPage];
      document.getElementById("dt4").style.display = "block";
      document.getElementById("dt4").setAttribute("class", "page-item active");
      let dt4 = "dateClick(" + currentPage + ")";
      document.getElementById("dt4").setAttribute("onclick", dt4);
      document.getElementById("d3").innerHTML = dateArray[currentPage - 1];
      document.getElementById("dt3").style.display = "block";
      document.getElementById("dt3").setAttribute("class", "page-item");
      let dt3 = "dateClick(" + (currentPage - 1) + ")";
      document.getElementById("dt3").setAttribute("onclick", dt3);
      document.getElementById("d5").innerHTML = dateArray[currentPage + 1];
      document.getElementById("dt5").style.display = "block";
      document.getElementById("dt5").setAttribute("class", "page-item");
      let dt5 = "dateClick(" + (currentPage + 1) + ")";
      document.getElementById("dt5").setAttribute("onclick", dt5);
      document.getElementById("d1").innerHTML = dateArray[0];
      document.getElementById("dt1").style.display = "block";
      document.getElementById("dt1").setAttribute("class", "page-item");
      let dt1 = "dateClick(" + 0 + ")";
      document.getElementById("dt1").setAttribute("onclick", dt1);
      document.getElementById("d2").innerHTML = "..";
      document.getElementById("dt2").style.display = "block";
      document.getElementById("dt2").setAttribute("class", "page-item");
      document
        .getElementById("dt2")
        .setAttribute("onclick", "elipsisDtStart(3)");
      document.getElementById("d6").innerHTML = "..";
      document.getElementById("dt6").style.display = "block";
      document.getElementById("dt6").setAttribute("class", "page-item");
      document.getElementById("dt6").setAttribute("onclick", "elipsisDtEnd(3)");
      document.getElementById("d7").innerHTML = dateArray.slice(-1);
      document.getElementById("dt7").style.display = "block";
      document.getElementById("dt7").setAttribute("class", "page-item");
      let dt7 = "dateClick(" + (dateArray.length - 1) + ")";
      document.getElementById("dt7").setAttribute("onclick", dt7);
    }
  }

  //set the date variable
  var dateItems = dateArray[currentPage].split("/");
  queryDate = `${dateItems[0]}-${dateItems[1]}-${dateItems[2]}`;
  //call function to show data
  searchClick();
}

function showPages(data) {
  document.getElementById("pages").style.display = "block";
  //dynamically add numbers based on meta
  var totalPages = data.total_pages;
  var currentPage = data.page;

  //populate numbers
  if (totalPages <= 7) {
    //Elipsis None
    for (let i = 1; i <= totalPages; i++) {
      var lid = "li" + i;
      document.getElementById(i).innerHTML = i;
      document.getElementById(lid).style.display = "block";
    }
    //hiding remaining cells
    for (let i = totalPages + 1; i <= 7; i++) {
      var lid = "li" + i;
      document.getElementById(lid).style.display = "none";
    }
  } else {
    if (currentPage - 4 <= 1) {
      //Elipsis end

      for (let i = 1; i <= 4; i++) {
        document.getElementById(i).innerHTML = i;
        var lid = "li" + i;
        document.getElementById(lid).style.display = "block";
      }
      document.getElementById(5).innerHTML = "..";
      document.getElementById("li5").style.display = "block";
      document.getElementById("li6").style.display = "none";
      document.getElementById(7).innerHTML = totalPages;
      document.getElementById("li7").style.display = "block";
    } else if (currentPage + 4 >= totalPages) {
      //Elipsis start
      for (let i = 4; i <= 7; i++) {
        var diff = 7 - i;
        document.getElementById(i).innerHTML = totalPages - diff;
        var lid = "li" + i;
        document.getElementById(lid).style.display = "block";
      }
      document.getElementById(1).innerHTML = 1;
      document.getElementById("li1").style.display = "block";
      document.getElementById(2).innerHTML = "..";
      document.getElementById("li2").style.display = "block";
      document.getElementById("li3").style.display = "none";
    } else if (totalPages >= 9) {
      //Elipsis both
      document.getElementById(4).innerHTML = currentPage;
      document.getElementById("li4").style.display = "block";
      document.getElementById(3).innerHTML = currentPage - 1;
      document.getElementById("li3").style.display = "block";
      document.getElementById(5).innerHTML = currentPage + 1;
      document.getElementById("li5").style.display = "block";
      document.getElementById(1).innerHTML = 1;
      document.getElementById("li1").style.display = "block";
      document.getElementById(2).innerHTML = "..";
      document.getElementById("li2").style.display = "block";
      document.getElementById(6).innerHTML = "..";
      document.getElementById("li6").style.display = "block";
      document.getElementById(7).innerHTML = totalPages;
      document.getElementById("li7").style.display = "block";
    }
  }
}

function dateClick(arrIndex) {
  document.getElementById("currentDate").innerHTML = arrIndex;
  dayButtons();
}

function elipsisDtStart(diff) {
  if (diff == 3) {
    let currentIndex = parseInt(
      document.getElementById("currentDate").innerHTML,
      10
    );
    document.getElementById("currentDate").innerHTML = currentIndex - 3;
    dayButtons();
  } else {
    let eliDiff = dateArray.length - 6;
    document.getElementById("currentDate").innerHTML = eliDiff;
    dayButtons();
  }
}

function elipsisDtEnd(diff) {
  if (diff == 3) {
    let currentIndex = parseInt(
      document.getElementById("currentDate").innerHTML,
      10
    );
    document.getElementById("currentDate").innerHTML = currentIndex + diff;
    dayButtons();
  } else {
    document.getElementById("currentDate").innerHTML = 5;
    dayButtons();
  }
}

function showCurrentSelection(currentPage) {
  var flag = document.getElementById("flag");
  for (let i = 1; i <= 7; i++) {
    var pgNum = document.getElementById(i).innerHTML;
    var lid = "li" + i;
    var currentLi = document.getElementById(lid);
    if (pgNum == currentPage) {
      currentLi.setAttribute("class", "page-item active");
      flag.innerHTML = currentPage;
    } else {
      currentLi.setAttribute("class", "page-item");
    }
  }
}

function setOnClicks() {
  //an li
  for (let i = 1; i <= 7; i++) {
    var lid = "li" + i;
    var elementLi = document.getElementById(lid);
    var innerHTML = document.getElementById(i).innerHTML;

    if (elementLi.style.display == "block") {
      if (innerHTML == "..") {
        if (i < 4) {
          elementLi.setAttribute("onclick", "elipsisStart()");
        } else if (i > 4) {
          elementLi.setAttribute("onclick", "elipsisEnd()");
        }
      } else {
        var numClick = "numberClick(" + innerHTML + ")";
        elementLi.setAttribute("onclick", numClick);
      }
    } else {
      //set onclik to empty - test
      elementLi.setAttribute("onclick", "");
    }
  }
}

function numberClick(pgNum) {
  //change the page para
  var qToken = cToken + "O0dsluMgS1kea4gyZECQsQ";
  var qPage = cPage + pgNum;
  var qPerPage = cPerPage + "10";
  var qQuery = cQuery + document.getElementsByTagName("h1")[0].innerHTML;
  qQuery = qQuery + " " + document.getElementById("searchbox").value;
  qQuery = qQuery + queryDate;
  //form query
  var query = ordersURI + qToken + qPage + qPerPage + qQuery;
  var request = new XMLHttpRequest();

  request.open("GET", query);

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      var data = JSON.parse(this.responseText);
      _displayData(data);
    }
  };
  request.send();
}

function elipsisEnd() {
  //need current page number
  var currentPage = parseInt(document.getElementById("flag").innerHTML, 10); //document.getElementById("flag").innerHTML;

  //+3
  var qToken = cToken + "O0dsluMgS1kea4gyZECQsQ";
  var qPage = currentPage + 3;
  qPage = cPage + qPage;
  var qPerPage = cPerPage + "10";
  var qQuery = cQuery + document.getElementsByTagName("h1")[0].innerHTML;
  qQuery = qQuery + " " + document.getElementById("searchbox").value;
  //form query
  var query = ordersURI + qToken + qPage + qPerPage + qQuery;

  var request = new XMLHttpRequest();

  request.open("GET", query);

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      var data = JSON.parse(this.responseText);
      _displayData(data);
    }
  };
  request.send();
}

function elipsisStart() {
  //need current page number
  var currentPage = parseInt(document.getElementById("flag").innerHTML, 10);
  //-3
  var qToken = cToken + "O0dsluMgS1kea4gyZECQsQ";
  var qPage = currentPage - 3;
  qPage = cPage + qPage;
  var qPerPage = cPerPage + "10";
  var qQuery = cQuery + document.getElementsByTagName("h1")[0].innerHTML;
  qQuery = qQuery + " " + document.getElementById("searchbox").value;
  //form query
  var query = ordersURI + qToken + qPage + qPerPage + qQuery;
  var request = new XMLHttpRequest();

  request.open("GET", query);

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      var data = JSON.parse(this.responseText);
      _displayData(data);
    }
  };
  request.send();
}
