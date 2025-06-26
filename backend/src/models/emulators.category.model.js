import mongoose, {Schema} from "mongoose";

const emulatorsCategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        }
    }
)

export const EmulatorsCategory = mongoose.model("EmulatorCategory", emulatorsCategorySchema);
