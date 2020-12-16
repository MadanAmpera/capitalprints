import json
import requests
import webbrowser
import base64

from fileops import readJSONfile, writeJSONfile

redirect_url = 'https://www.xero.com'
scope = 'offline_access accounting.transactions openid profile email accounting.contacts accounting.settings'

def xero_login():
    connjson = readJSONfile('xero-sync.json')

    b64_id_secret = base64.b64encode(bytes(connjson['client_id'] + ':' + connjson['client_secret'], 'utf-8')).decode('utf-8')

    # 1. Send user to authorize the app

    auth_url = ('''https://login.xero.com/identity/connect/authorize?''' +
                '''response_type=code''' +
                '''&client_id=''' + connjson['client_id'] +
                '''&redirect_uri=''' + redirect_url +
                '''&scope=''' + scope +
                '''&state=123''')
    webbrowser.open_new(auth_url)

    # 2. Users are redirected back to url with a code
    auth_res_url = input('What is the response URL?')
    start_number = auth_res_url.find('code=') + len('code=')
    end_number = auth_res_url.find('&scope')
    auth_code = auth_res_url[start_number:end_number]
    
    print("Exchanging code...")

    # 3. Exchange the code
    exchange_code_url = 'https://identity.xero.com/connect/token'
    response = requests.post(exchange_code_url,
                            headers = {
                                'Authorization': 'Basic ' + b64_id_secret
                            }, data={
                                'grant_type': 'authorization_code',
                                'code': auth_code,
                                'redirect_uri': redirect_url
                            })

    login_response = response.json()
    
    connjson['access_token'] = login_response['access_token']
    connjson['refresh_token'] = login_response['refresh_token']
    

    # 4 get tenant id

    connections_url = 'https://api.xero.com/connections'
    tenant_response = requests.get(connections_url,
                           headers = {
                               'Authorization': 'Bearer ' + login_response['access_token'],
                               'Content-Type': 'application/json'
                           })
    tenant_json = tenant_response.json()

    for tenants in tenant_json:
        json_dict = tenants

    connjson['tenantId'] = json_dict['tenantId']

    print("writing tokens to file")
    writeJSONfile('xero-sync.json', connjson)
    
def xero_get_invoice(invoiceId):
    connjson = readJSONfile('xero-sync.json')

    get_url = 'https://api.xero.com/api.xro/2.0/Invoices/' + invoiceId
    response = requests.get(get_url,
                           headers = {
                               'Authorization': 'Bearer ' + connjson['access_token'],
                               'Xero-tenant-id': connjson['tenantId'],
                               'Accept': 'application/json'
                           })
    resp_json = response.json()
    return resp_json['Invoices'][0]