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
var Schema = mongoose.Schema;

var EventSchema = new mongoose.Schema({
        plan: {
            type : String,
            required : true
        },
        veg: {
            type : Boolean,
            required : true
        },
        dia: {
            type : Boolean,
            required : true
        },
        monday: {
            type : Schema.Types.Mixed,
            required : true
        },
        tuesday: {
            type : Schema.Types.Mixed,
            required : true
        },
        wednesday: {
            type : Schema.Types.Mixed,
            required : true
        },
        thursday: {
            type : Schema.Types.Mixed,
            required : true
        },
        friday: {
            type : Schema.Types.Mixed,
            required : true
        },
        saturday: {
            type : Schema.Types.Mixed,
            required : true
        },
        sunday: {
            type : Schema.Types.Mixed,
            required : true
        }
    },
    {collection : 'diets'}
);

module.exports = mongoose.model('events', EventSchema);