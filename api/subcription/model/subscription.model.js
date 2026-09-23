import mongoose from "mongoose";

const SubcriptionSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        minLength: 2,
        maxLength: 20,
    },
    price: {
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, "Price must be greater then 0"]
    },
    currency: {
        type: String,
        enum: [
            'USD',
            'EUR',
            'GBP',
            "PKR"
        ],
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    category: {
        type: String,
        enum: [
            'support',
            'news',
            'entertainment',
            'finance',
            'lifestyle',
            'technology',
            'other'
        ],
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value < new Date(),
            message: 'Start Date must be in past'
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'Renewal Date must be the after start date'
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
}, { timestamps: true });


// it calculate autoRenewal Date
SubcriptionSchema.pre('save', function (next) {
    if (!this.renewalDate) {
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);
    };

    // this update the status if the renewal date has passed 
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    };

    next();
});