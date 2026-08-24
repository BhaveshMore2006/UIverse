import mongoose, { Document, Schema } from 'mongoose';

export interface ISection extends Document {
  sectionName: string;
  sectionId: string;
  variations: number;
  path?: string;
  sectionStatus: 'Pending' | 'Approved' | 'Rejected';
  wireframes?: string[];
  platform?: string;
  pageName: string;
  isGenerated: boolean;
  cardGridColumns: number;
  cardLayoutMode: 'grid' | 'list';
  sectionTextMode: 'auto' | 'light' | 'dark';
  sectionColor?: string;
  paddings?: string;
  createdAt: Date;
  updatedAt: Date;
}

const sectionSchema = new Schema<ISection>(
  {
    sectionName: { type: String, default: 'Custom' },
    sectionId: { type: String, required: true, unique: true, immutable: true, length: 10 },
    variations: { type: Number, default: 1 },
    path: { type: String },
    sectionStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    wireframes: [{ type: String }],
    platform: { type: String },
    pageName: { type: String, default: 'Home' },
    isGenerated: { type: Boolean, default: true },
    cardGridColumns: { type: Number, default: 3 },
    cardLayoutMode: { type: String, enum: ['grid', 'list'], default: 'grid' },
    sectionTextMode: { type: String, enum: ['auto', 'light', 'dark'], default: 'auto' },
    sectionColor: { type: String },
    paddings: { type: String },
  },
  {
    timestamps: true,
  }
);

sectionSchema.index({ pageName: 1 });
sectionSchema.index({ sectionStatus: 1 });
sectionSchema.index({ pageName: 1, sectionName: 1 });

export const Section = mongoose.model<ISection>('Section', sectionSchema);
