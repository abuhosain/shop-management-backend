import { Schema, model } from "mongoose";
import { TInventory, TProducct, TVariant } from "./product.interface";

const variantsShecma = new Schema<TVariant>({
    type: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      }
}, { _id: false })


const inventorySchema = new Schema<TInventory>({
    quantity: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, { _id: false });



const productSchema= new Schema<TProducct>({
    name : {type : String, required : true},
    description : {type : String, required : true},
    price : {type : Number, required : true},
    category : {type : String, required : true},
    tags : {type : [String]},
    variants : [variantsShecma],
    inventory : inventorySchema
});


// inventorySchema.pre('save', function(next) {
//     console.log('Pre-save hook executed');
//     if (this.quantity === 0) {
//         this.inStock = false;
//     } else {
//         this.inStock = true;
//     }
//     next();
// });
 
productSchema.pre("save", function(next) {

    if(this.inventory.quantity === 0){
        this.inventory.inStock = false
    } else {
        this.inventory.inStock = true
    }
    next()
})

export const Product = model<TProducct>("Product", productSchema);
