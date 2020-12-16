import schedule
import time

from fileops import readJSONfile, writeJSONfile
from xero_helper import xero_login

# essential function definitions


## -- Start of the program from below
print("Sync 1.0 - Capital Prints")
print("syncing invoices between Xero and Printavo")
print("Checking for Xero connections....")

connjson = readJSONfile('xero-sync.json')

if connjson['access_token'] == "":
    print("No connections found")
    print("enter the following details")
    connjson['client_id'] = input("Client-Id: ")
    connjson['client_secret'] = input("Client-Secret: ")
    writeJSONfile('xero-sync.py', connjson)
    print("logging into Xero..")
    xero_login()
    print("proceeding to syncing..")
    #crawl from here
else:
    print("connection found")
    print("proceeding to syncing")
    #crawl from here


schedule.every(5).minutes.do(syncing)

while True:
    schedule.run_pending()
    time.sleep(1)