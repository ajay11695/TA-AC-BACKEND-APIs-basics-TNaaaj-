var mongoose=require('mongoose')
var Schema=mongoose.Schema

var countrySchema=new Schema({
   name:String,
   state:[{type:Schema.Types.ObjectId,ref:'State'}],
   continent: { type: String },
   population: { type: Number, required: true },
   ethnicity: String,
   neighbouring_countires: [],
   area: { type: String },
},{
    timestamps:true
})

module.exports=mongoose.model('Country',countrySchema)