import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";

@Schema()
export class User {
    @Prop({ required: true })
    username!: string;

    @Prop({ required: true })
    email!: string;

    @Prop({ required: true })
    password!: string;

    @Prop({default: [], type: [mongoose.Types.ObjectId], ref: 'User'})
    friends!: ObjectId[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);