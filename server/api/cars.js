/**
 * Created by UC165867 on 3/25/14.
 */
var fs = require('fs-extra')
  , path = require('path')
  , _ = require('underscore')

module.exports.list = list
module.exports.create = create
module.exports.read = read
module.exports.update = update
module.exports.del = del

var DATA_FILE = './resources/data.json'
if(process.env.NODE_ENV === 'test')
   DATA_FILE = './test/resources/data.json'

var DATA = fs.readJsonSync(DATA_FILE)

console.log(DATA_FILE)

function list(req,res){
    res.json("a")
}

function create(req,res){
    var newCar = req.body
    newCar.id = getLastId() + 1
    DATA.push(newCar)
    saveDB(function(err){
        if(err)
            res.json(formatRespData(0,err))
        else
            res.json(formatRespData({id:newCar.id}))
    })
}

function read(req,res){
    var id = ~~req.params.id
    var car = _(DATA).find(function(car){
        return car.id === id
    })

    if(!car)
        res.json(formatRespData(0,"Can't find car with id: " + id))
    else
        res.json(formatRespData(car))
}

function update(req,res){
    var id = ~~req.params.id
    var car = _(DATA).find(function(car){
        return car.id === id
    })

    var newCarData = req.body
    car = _(car).extend(newCarData)

    saveDB(function(err){
        if(err)
            res.json(formatRespData(0,err))
        else
            res.json(formatRespData({}))
    })
}

function del(req,res){
    res.json("H")
}