import { Schema, model, models, type Model, type Types, } from 'mongoose';

export interface ILink {
    _id: Schema.Types.ObjectId;
    slug: string;
    targetUrl: string;
    workspace: Types.ObjectId;
    createdBy: Types.ObjectId;
    clickCount: number;
    tags?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

const LinkSchema = new Schema<ILink>(
    {
        slug: { type: String, required: true, unique: true, index: true },
        targetUrl: { type: String, required: true },
        workspace: { 
            type: Schema.Types.ObjectId, 
            ref: 'Workspace', 
            required: true, 
            index: true 
        },
        createdBy: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        clickCount: { type: Number, default: 0 },
        tags: [{ type: String }]
    },
    { timestamps: true}
);

export const Link: Model<ILink> = models.Link || model<ILink>("Link", LinkSchema);