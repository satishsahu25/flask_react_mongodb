import flask
from flask import Flask,request,jsonify
from flask_pymongo import pymongo, ObjectId
from flask_cors import CORS


CONNECTION_sTRING="WRITE YOUR STRING"
# Created app
app=Flask(__name__)
client=pymongo.MongoClient(CONNECTION_sTRING)
db=client.get_database('flask_mongoatlas')


CORS(app)

# ----------Creating the routes---------

# Basic route
# @app.route("/")
# def index():
#     return '<h1>failed</h1>'

@app.route("/users",methods=["POST"])
def createUser():
    # this db.insert returns a id which we can store in a vraiable
    id=db.users.insert_one({
        'name':request.json['name'],
        'email':request.json['email'],
        'contact':request.json['contact'],
        'address':request.json['address'],
    })

    # returning json response to the react frontend
    return flask.jsonify({'id':str(ObjectId(id.inserted_id)),'msg':'user added successfully'})
    

@app.route("/users",methods=["GET"])
def getusers():
    users=[]
    for doc in db.users.find():
        users.append({
            '_id':str(ObjectId(doc['_id'])),
            'name':doc['name'],
            'email':doc['email'],
            'contact':doc['contact'],
            'address':doc['address']
        })

    return flask.jsonify(users)

@app.route('/user/<id>',methods=['GET'])
def getuserbyid(id):
    user=db.users.find_one({'_id':ObjectId(id)})

    return flask.jsonify({
            '_id':str(ObjectId(user['_id'])),
            'name':user['name'],
            'email':user['email'],
            'contact':user['contact'],
            'address':user['address'],
        })

@app.route("/user/<id>",methods=['DELETE'])
def deleteuser(id):
    db.users.delete_one({'_id':ObjectId(id)})
    return flask.jsonify({'msg':'User deleted success'})


@app.route("/user/<id>",methods=['PUT'])
def updateuser(id):
    db.users.update_one({'_id':ObjectId(id)},{
        '$set':{
        'name':request.json['name'],
        'email':request.json['email'],
        'contact':request.json['contact'],
        'address':request.json['address']
    }
    })
    return flask.jsonify({'msg':'User updated success'})



if __name__ == '__main__':
    app.run(port=5000,debug=True)
