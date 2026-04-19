import { Schema, model, models, Document } from 'mongoose';

export interface IDog extends Document {
    name: string;
    slug: string;
    description: string;
    age: string;
    size: string;
    image: {
        url: string;
        altText?: string | null;
    }[];
    breed: string;
    sex: string;
    featureTag: string[];
    status:string;
    kennelLocation:string;
    createdAt: Date;
    updatedAt: Date;
}

const dogImageSchema = new Schema({
    url: { type: String, required: true },
    altText: { type: String, required: false }
});
const DogSchema = new Schema<IDog>(
    {
        name: {
            type: String,
            required: [true, 'name is required'],
            trim: true,
            maxlength: [100, 'name cannot exceed 100 characters'],
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
            maxlength: [1000, 'Description cannot exceed 1000 characters'],
        },
        age: {
            type: String,
            required: [true, 'Age is required'],
            trim: true,
            maxlength: [500, 'Age cannot exceed 500 characters'],
        },
        size: {
            type: String,
            required: [true, 'Size is required'],
            trim: true,
            maxlength: [500, 'Size cannot exceed 500 characters'],
        },
        image: [dogImageSchema],
        breed: {
            type: String,
            required: [true, 'Breed is required'],
            trim: true,
        },
        sex: {
            type: String,
            required: [true, 'Sex is required'],
            trim: true,
        },
        kennelLocation: {
            type: String,
            required: [true, 'kennelLocation is required'],
            trim: true,
        },
        status: {
            type: String,
            required: [true, 'Status is required'],
            trim: true,
        },

        featureTag: {
            type: [String],
            required: [true, 'featureTag are required'],
            validate: {
                validator: (v: string[]) => v.length > 0,
                message: 'At least one tag is required',
            },
        },
    },
    {
        timestamps: true, // Auto-generate createdAt and updatedAt
    }
);

// Pre-save hook for slug generation and data normalization
DogSchema.pre('save', function (next) {
    const dog = this as IDog;

    // Generate slug only if title changed or document is new
    if (dog.isModified('name') || dog.isNew) {
        dog.slug = generateSlug(dog.name);
    }
    //
    // // Normalize date to ISO format if it's not already
    // if (event.isModified('date')) {
    //     event.date = normalizeDate(event.date);
    // }
    //
    // // Normalize time format (HH:MM)
    // if (event.isModified('time')) {
    //     event.time = normalizeTime(event.time);
    // }

    next();
});

// Helper function to generate URL-friendly slug
function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Helper function to normalize date to ISO format
// function normalizeDate(dateString: string): string {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) {
//         throw new Error('Invalid date format');
//     }
//     return date.toISOString().split('T')[0]; // Return YYYY-MM-DD format
// }

// Helper function to normalize time format
function normalizeTime(timeString: string): string {
    // Handle various time formats and convert to HH:MM (24-hour format)
    const timeRegex = /^(\d{1,2}):(\d{2})(\s*(AM|PM))?$/i;
    const match = timeString.trim().match(timeRegex);

    if (!match) {
        throw new Error('Invalid time format. Use HH:MM or HH:MM AM/PM');
    }

    let hours = parseInt(match[1]);
    const minutes = match[2];
    const period = match[4]?.toUpperCase();

    if (period) {
        // Convert 12-hour to 24-hour format
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
    }

    if (hours < 0 || hours > 23 || parseInt(minutes) < 0 || parseInt(minutes) > 59) {
        throw new Error('Invalid time values');
    }

    return `${hours.toString().padStart(2, '0')}:${minutes}`;
}

// Create unique index on slug for better performance
DogSchema.index({ slug: 1 }, { unique: true });

// Create compound index for common queries
DogSchema.index({ date: 1, mode: 1 });

const Dog = models.Dog || model<IDog>('Dog', DogSchema);

export default Dog;
