import { Schema, model, models, type Model, type Types } from 'mongoose';

export type WorkspaceRole = "owner" | "admin" | "member";

export interface IWorkspaceMember {
    user: Types.ObjectId;
    role: WorkspaceRole;
}

export interface IWorkspace {
    _id: Schema.Types.ObjectId;
    name: string;
    slug: string;
    owner: Types.ObjectId;
    members: IWorkspaceMember[];
    createdAt?: Date;
    updatedAt?: Date;
}

const WorkspaceMemberSchema = new Schema<IWorkspaceMember>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        role: {
            type: String,
            enum: ["owner", "admin", "member"],
            default: "member",
            required: true
        }
    },
    { _id: false }
);

const WorkspaceSchema = new Schema<IWorkspace>(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true, index: true },
        owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        members: { type: [WorkspaceMemberSchema], default: [] }
    },
    { timestamps: true}
);

export const Workspace: Model<IWorkspace> = models.Workspace || model<IWorkspace>("Workspace", WorkspaceSchema);