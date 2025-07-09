import mongoose, {Schema} from "mongoose";

const emulatorCommentSchema = new Schema({
    content : {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    emulator: {
        type: Schema.Types.ObjectId,
        ref: "EmulatorsList",
        required: true
    },      
},
{
    timestamps: true
});

export const EmulatorComment = mongoose.model("EmulatorComment", emulatorCommentSchema);