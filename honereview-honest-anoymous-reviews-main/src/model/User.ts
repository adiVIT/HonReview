import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
  starRating: number;
  categorySpecificRatings: {
    healthcare?: {
      expenses: number;
      treatment: number;
      nurses: number;
      environment: number;
    };
    finance?: {
      customerService: number;
      interestRates: number;
      fees: number;
      accessibility: number;
    };
    education?: {
      teachingQuality: number;
      facilities: number;
      extracurricular: number;
      supportServices: number;
    };
    lifestyle?: {
      amenities: number;
      location: number;
      community: number;
      valueForMoney: number;
    };
  };
}

const MessageSchema: Schema<Message> = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  starRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  categorySpecificRatings: {
    healthcare: {
      expenses: { type: Number, min: 1, max: 5 },
      treatment: { type: Number, min: 1, max: 5 },
      nurses: { type: Number, min: 1, max: 5 },
      environment: { type: Number, min: 1, max: 5 },
    },
    finance: {
      customerService: { type: Number, min: 1, max: 5 },
      interestRates: { type: Number, min: 1, max: 5 },
      fees: { type: Number, min: 1, max: 5 },
      accessibility: { type: Number, min: 1, max: 5 },
    },
    education: {
      teachingQuality: { type: Number, min: 1, max: 5 },
      facilities: { type: Number, min: 1, max: 5 },
      extracurricular: { type: Number, min: 1, max: 5 },
      supportServices: { type: Number, min: 1, max: 5 },
    },
    lifestyle: {
      amenities: { type: Number, min: 1, max: 5 },
      location: { type: Number, min: 1, max: 5 },
      community: { type: Number, min: 1, max: 5 },
      valueForMoney: { type: Number, min: 1, max: 5 },
    },
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  productname: string;
  productdetails: string;
  productcategories: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
}

// Updated User schema
const UserSchema: Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  productname: {
    type: String,
    required: [true, "product name is empty"],
  },
  productdetails: {
    type: String,
    required: [true, "product details are required"],
  },
  productcategories: {
    type: String,
    required: [true, "product details are required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify Code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify Code Expiry is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
