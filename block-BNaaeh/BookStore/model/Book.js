var mongoose=require('mongoose')
var Schema=mongoose.Schema

var bookSchema= new Schema({
    title:{type:String,required:true},
    summary:{type:String},
    pages:Number,
    publication:String,
    categories:[String],
    cover_image:String,
    authorName:String,
    authorId:{type:Schema.Types.ObjectId,ref:'Author'},
    commentId:[{type:Schema.Types.ObjectId,ref:'Comment'}]
},{
    timestamps:true
})

module.exports=mongoose.model('Book',bookSchema)