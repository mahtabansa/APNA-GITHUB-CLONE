import mongoose, { Schema } from "mongoose";


const RepoSchema = mongoose.Schema({

      name:{
            type:String,
            required:true,
            unique:true
      },
      description:{
            type:String
      },
      content:[
            {
            type:String
            }
      ],
      visibility:{
            type:Boolean
      },
      owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
      },
      issues:[
            {
                  type:Schema.Types.ObjectId,
                   User:"Issue"
            }
      ],

});


const Repository = mongoose.model('Repository',RepoSchema);
export {Repository};