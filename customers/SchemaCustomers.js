const mongoose = require("mongoose");

const Schema = mongoose.Schema



//ESQUEMA DE DB
const CustomersSchema = new Schema({
   
  
   email: { type: String, required: true },
   password: { type: String, required: true },
  
})


//formatea los archivos de la base de datos
// https://stackoverflow.com/questions/65463623/how-transform-in-mongoose-schema-works

CustomersSchema.set("toJSON", {
    transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
       ret.pasword= ret._password;
        delete ret.__v;
    }
})



const Customers=mongoose.model("Customers",CustomersSchema)
module.exports=Customers