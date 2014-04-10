/**
 * Created by UC165867 on 3/26/14.
 */
var Firebase = require('firebase');
var myRootRef = new Firebase('https://myprojectname.firebaseIO-demo.com/');
myRootRef.set("hello world!");