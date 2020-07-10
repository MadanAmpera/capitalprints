const customerIndex = 'https://www.printavo.com/api/v1/customers?email=amkumar91%40gmail.com&token=MQ6K-bazV-lVHTj4Rpgkeg';
const orderSearch = 'https://www.printavo.com/api/v1/orders/search?email=amkumar91%40gmail.com&token=MQ6K-bazV-lVHTj4Rpgkeg&query=';
let orderData = [];

function getCustomers(){
    fetch(customerIndex)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items', error));
}

function _displayItems(data){
    const sOptions = document.getElementById('company');
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choose a customer';
    defaultOption.value = 'default';
    sOptions.add(defaultOption);
    
    data.data.forEach(item => {
       let companyName = document.createElement('option');
       companyName.text = item.company;
       companyName.value = item.company;
       sOptions.add(companyName);
    });
}

/*Algo:
    get the choice from the dropdown
    make the call
    show the data

    https://www.printavo.com/api/v1/orders/search?email=amkumar91%40gmail.com&token=MQ6K-bazV-lVHTj4Rpgkeg&query=Brian

 */ 

function showData(){
    var choice = document.getElementById('company').value;
    if(choice == 'default'){
        //Ideally show a alert to choose a value
        alert('Please choose a valid entry');
        return;
    }
    var query = orderSearch + choice;
    fetch(query)
        .then(response => response.json())
        .then(data => _displayData(data))
        .catch(error => console.error('Unable to get items', error));
}

function _displayData(data){
    const tOrders = document.getElementById('orders');
    tOrders.innerHTML = '';
    var headers = ['Order date', 'Order #', 'Order name', 'Order amount', 'Public url'];
    let trH = tOrders.insertRow();
    headers.forEach(element => {
        var header = trH.insertCell();
        header.innerHTML = element;
    });
    data.data.forEach(element => {
       let tr = tOrders.insertRow();
       var td1 = tr.insertCell();
       td1.innerHTML = element.due_date;
       var td2 = tr.insertCell();
       td2.innerHTML = element.id;
       var td3 = tr.insertCell();
       td3.innerHTML = element.customer.first_name;
       var td4 = tr.insertCell();
       td4.innerHTML = element.order_total;
       var td5 = tr.insertCell();
       td5.innerHTML = element.public_url;
    });

    orderData = data.data;
}