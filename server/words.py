import sys
import pymongo
import json
import codecs


MONGODB_URI = 'mongodb://oran:1234@ds139715.mlab.com:39715/nashim' 

def getAllWords():

    client = pymongo.MongoClient(MONGODB_URI)

    db = client.get_default_database()
    
    songs = db['words']

    cursor = songs.find()
    data = []
    for doc in cursor:    	
    	value = ('{ "word" : "%s", "gender" : "%s", "definition" : "%s", "amount" : "%d" }' % (str(doc['word']), str(doc['gender']), str(doc['definition']), (doc['amount'])))
    	print(value)
    	data.append(value)
    data = json.dumps(data)
    
    client.close()

    return data
