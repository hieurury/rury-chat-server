import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps: true})
export class Friend {
    @Prop({ required: true })
    userId!: string;

    @Prop({ required: true })
    friendId!: string;

    @Prop({ default: 'pending', enum: ['pending', 'accepted', 'rejected', 'blocked', 'removed'] })
    status!: string;

    @Prop({ default: Date.now })
    createdAt!: Date;
}


export type FriendDocument = Friend & Document;
export const FriendSchema = SchemaFactory.createForClass(Friend);