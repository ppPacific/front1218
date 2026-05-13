import { Schema, model, models, Document, Types } from "mongoose";
import Dog from "@/database/dog.model";

// TypeScript interface for Booking document
export interface IVisit extends Document {
  dogId: Types.ObjectId;
  email: string;
  chosenDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const VisitSchema = new Schema<IVisit>(
  {
    dogId: {
      type: Schema.Types.ObjectId,
      ref: "Dog",
      required: [true, "Dog ID is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email: string) {
          // RFC 5322 compliant email validation regex
          const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          return emailRegex.test(email);
        },
        message: "Please provide a valid email address",
      },
    },
    chosenDate: {
      type: Date,
      required: [true, "Chosen date is required"],
    },
  },
  {
    timestamps: true, // Auto-generate createdAt and updatedAt
  },
);

// Pre-save hook to validate events exists before creating booking
VisitSchema.pre("save", async function (next) {
  const visit = this as IVisit;

  // Only validate dogId if it's new or modified
  if (visit.isModified("dogId") || visit.isNew) {
    try {
      const dogExists = await Dog.findById(visit.dogId).select("_id");

      if (!dogExists) {
        const error = new Error(`Visit with ID ${visit.dogId} does not exist`);
        error.name = "ValidationError";
        return next(error);
      }
    } catch {
      const validationError = new Error(
        "Invalid dog ID format or database error",
      );
      validationError.name = "ValidationError";
      return next(validationError);
    }
  }

  next();
});

// Create index on eventId for faster queries
VisitSchema.index({ dogId: 1 });

// Create compound index for common queries (events bookings by date)
VisitSchema.index({ dogId: 1, createdAt: -1 });

// Create index on email for user booking lookups
VisitSchema.index({ email: 1 });

// Enforce one booking per visit per email
VisitSchema.index(
  { dogId: 1, email: 1, chosenDate: 1 },
  { unique: true, name: "uniq_visit_email_date" },
);
const Visit = models.Visit || model<IVisit>("Visit", VisitSchema);

export default Visit;
