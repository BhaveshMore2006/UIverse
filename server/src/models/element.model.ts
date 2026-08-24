import mongoose, { Document, Schema } from 'mongoose';

export interface IElement extends Document {
  sectionId: string;
  elementName: string;
  fieldId: string;
  content?: string;
  contentType: 'Image' | 'Text' | 'Textfield' | 'Button' | 'Cards';
  css?: string;
  loop?: any[]; // Allow nested structure according to specification
  projectName: string;
  pageName: string;
  createdAt: Date;
  updatedAt: Date;
}

const elementSchema = new Schema<IElement>(
  {
    sectionId: { type: String, required: true },
    elementName: { type: String },
    fieldId: { type: String, required: true, unique: true, immutable: true, length: 10 },
    content: { type: String },
    contentType: { type: String, enum: ['Image', 'Text', 'Textfield', 'Button', 'Cards'], required: true },
    css: { type: String },
    loop: { type: Schema.Types.Mixed, default: null },
    projectName: { type: String, default: 'sample-brand' },
    pageName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

elementSchema.index({ sectionId: 1 });
elementSchema.index({ pageName: 1 });
elementSchema.index({ sectionId: 1, elementName: 1 });
elementSchema.index({ pageName: 1, fieldId: 1 });

export const Element = mongoose.model<IElement>('Element', elementSchema);
