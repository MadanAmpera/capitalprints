import requests, lxml.html
import sys

from bs4 import BeautifulSoup
from fileops import writeJSONfile, readJSONfile

def printavo_login():
    
    print("logging into printavo")
    printavo_session = requests.session()

    url = "https://www.printavo.com/users/sign_in"
    user = "info@capitalprints.com.au"
    password = "kemblast.12345"

    login = printavo_session.get(url)
    login_html = lxml.html.fromstring(login.text)
    hidden_inputs = login_html.xpath(r'//form//input[@type="hidden"]')
    form = {x.attrib["name"]: x.attrib["value"] for x in hidden_inputs}

    form['user[email]'] = user
    form['user[password]'] = password

    response = s.post(url, data=form)

    writeJSONfile('printavo_cookie.json', requests.utils.dict_from_cookiejar(s.cookies))

    print("cookies updated!!")

def updated_invoices():

    invoice_ids = []    
    printavo_session = requests.session()
    printavo_session.cookies =  readJSONfile('printavo_cookie.json')
    activity_url = 'https://www.printavo.com/activity'
    activity_html = printavo_session.get(activity_url)
    soup_obj = BeautifulSoup(activity_html.text, 'lxml')

    try:
        full_table = soup_obj.select('table')[0]
    except:
        print("Issue!!! @ accessing printavo activity")
        print(sys.exc_info()[0])
        return "error"

    table_rows = full_table.select('tr')

    for index, element in enumerate(table_rows):
        rowItems = element.select('td')
        aTag = rowItems[0].a
        invoice = aTag.text.strip()
        hash_split = invoice.split("#")
        if(len(hash_split) == 2):
            invoice_ids.append(hash_split[1])
        
    uniqueIds = list(set(invoice_ids))
    return uniqueIds

def api_get_invoice(invoiceId):
    # call the api for to get the data
    base_url = 'https://www.printavo.com/api/v1/orders/search?email=info%40capitalprints.com.au&'
    apiary_json = readJSONfile('apiary.json')
    token = 'token=' + apiary_json['token'] 
    query = '&query=' + invoiceId

    req_url = base_url + token + query
    response = requests.get(req_url, headers={})
    resp_json = response.json()
    return resp_json['data'][0]