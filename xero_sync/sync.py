from printavo_helper import updated_invoices, api_get_invoice
from xero_helper import xero_get_invoice

def updateInvoice(xero_inv, printavo_inv):
    xero_inv['AmountDue'] = printavo_inv['amount_outstanding']
    xero_inv['AmountPaid'] = printavo_inv['amount_paid']

    if printavo_inv['stats']['paid'] == True:
        xero_inv['Status'] = "PAID"
    else:
        xero_inv['Status'] = "AUTHORISED"

    xero_inv['LineItems'][0]['UnitAmount'] = printavo_inv['order_total']
    xero_inv['LineItems'][0]['LineAmount'] = printavo_inv['order_total']
    xero_inv['LineItems'][0]['TaxAmount'] = printavo_inv['order_total'] - printavo_inv['order_subtotal']
    xero_inv['SubTotal'] = printavo_inv['order_subtotal']
    xero_inv['TotalTax'] = printavo_inv['order_total'] - printavo_inv['order_subtotal']
    xero_inv['Total'] = printavo_inv['order_total']

    #send xero_inv to xero helper

def createInvoice(printavo_inv):
    #create the xero_inv object
    #then send it to xero helper


def syncing():
    #get list of update invoices from printavo
    invoiceIds = updated_invoices()

    if invoiceIds == "error":
        return
    
    print("Obtained Id's")
    print(invoiceIds)

    for invoice in invoiceIds:
        #get the object from printavo
        printavo_inv = api_get_invoice(invoice)
        #get invoice details from xero
        xero_inv = xero_get_invoice(invoice)

        # check if xero invoice exists?
        # if exists
        # check if the totals match
            if xero_inv['Total'] == printavo_inv['order_total']
                # do nothing
                continue
            else:
                # update the invoice
                # update what??? - unit amount, lineitem anount, total.
        # else - if no xero invoice available
            # create invoice in xero


