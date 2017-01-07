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
    	val = {}
    	val['word'] = doc['word'];
    	val['gender'] = doc['gender'];
    	val['definition'] = doc['definition'];
    	val['amount'] = doc['amount'];
    	data.append(val)
    data = json.dumps(data)
    
    client.close()

    return data
