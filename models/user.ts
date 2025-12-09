import { Schema, model, models, type Model } from 'mongoose';

export interface IUser {
    _id: Schema.Types.ObjectId;
    name?: string;
    email: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true, index: true },
        image: { type: String },
    },
    { timestamps: true }
);

export const User: Model<IUser> = models.User || model<IUser>("User", UserSchema);