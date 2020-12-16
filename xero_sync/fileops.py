import json

def readJSONfile(filename):
    with open(filename, 'r') as readfile:
        data = readfile.read()
        readjson = json.loads(data)
        return readjson

def writeJSONfile(filename, data):
    with open(filename, 'w') as writefile:
        json.dump(data, writefile)