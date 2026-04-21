import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
    {
        // 🔗 External Source ID (TMDB / Anime API)
        tmdbId: {
            type: Number,
            unique: true,
            sparse: true
        },

        // 📺 Core Info
        title: {
            type: String,
            required: true
        },

        type: {
            type: String,
            enum: ["movie", "series", "anime"],
            required: true
        },

        description: {
            type: String,
            default: ""
        },

        // 🖼️ Media
        thumbnail: {
            type: String
        },

        trailerUrl: {
            type: String
        },

        videoUrl: {
            type: String
        },

        // 🎭 Classification
        genre: {
            type: [String],
            default: []
        },

        language: {
            type: String,
            default: "English"
        },

        releaseYear: {
            type: Number
        },

        rating: {
            type: Number,
            default: 0
        },

        // 📊 Analytics
        views: {
            type: Number,
            default: 0
        },

        viewsLast24h: {
            type: Number,
            default: 0
        },

        // ❤️ User Interaction
        likes: {
            type: Number,
            default: 0
        },

        // 📂 Source Tracking
        source: {
            type: String,
            enum: ["tmdb", "jikan", "manual"],
            default: "manual"
        },

        // 🎧 Multi-Audio Support (future-ready)
        audioTracks: [
            {
                language: String,
                url: String,
                isDefault: { type: Boolean, default: false }
            }
        ],

        // 💬 Subtitles
        subtitleTracks: [
            {
                language: String,
                url: String
            }
        ],

        // 🎥 Quality Variants (HLS or MP4 links)
        videoStreams: [
            {
                quality: String, // 360p, 720p, 1080p
                url: String
            }
        ]
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Content", contentSchema);