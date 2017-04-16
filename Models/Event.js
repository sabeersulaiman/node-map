/**
 * public String _id;
   public String title;
   public String time;
   public String date;
   public String des;
   // public String venue;
   public CharSequence place_name;
   public double latitude;
   public double longitude;
 */

var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
        title: {
            type : String,
            required : true
        },
        time: {
            type : String,
            required : true
        },
        des: {
            type : String,
            required : true
        },
        place_name: {
            type : String,
            required : true
        },
        geo : {
            type : [Number],
            index : '2d'
        },
        user : {
            type : String,
            required : true
        },
        // latitude: {
        //     type : double,
        //     required : true
        // },
        // longitude: {
        //     type : double,
        //     required : true
        // },
        createdAt: {
            type : Date,
            default: Date.now
        },
        modifiedAt: {
            type : Date,
            default: Date.now
        }
    },
    {collection : 'eventCollection'}
);

module.exports = mongoose.model('events', EventSchema);