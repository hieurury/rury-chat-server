import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum VerificationPurpose {
  EMAIL_VERIFY = "email_verify",
  RESET_PASSWORD = "reset_password",
}

@Schema({ timestamps: true })
export class Verification {
  @Prop({ required: true, index: true })
  userId!: string;

  @Prop({ required: true, index: true })
  email!: string;

  @Prop({ required: true })
  otpHash!: string;

  @Prop({ required: true, index: true })
  expiresAt!: Date;

  @Prop({ default: false })
  used!: boolean;

  @Prop({ enum: VerificationPurpose, default: VerificationPurpose.EMAIL_VERIFY })
  purpose!: VerificationPurpose;

  @Prop({ default: 0 })
  attemptCount!: number;

  @Prop()
  usedAt?: Date;
}

export type VerificationDocument = Verification & Document;
export const VerificationSchema = SchemaFactory.createForClass(Verification);