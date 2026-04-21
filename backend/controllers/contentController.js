import Content from "../models/Content.js";

const VALID_TYPES = ["movie", "series", "anime"];

const parsePositiveInt = (value, fallback) => {
	const parsed = Number.parseInt(value, 10);
	return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const getFeaturedContent = async (req, res) => {
	try {
		const limit = parsePositiveInt(req.query.limit, 5);
		const items = await Content.find({})
			.sort({ rating: -1, views: -1, createdAt: -1 })
			.limit(limit);

		return res.json({ items });
	} catch (error) {
		return res.status(500).json({ message: "Failed to fetch featured content" });
	}
};

export const getTrendingContent = async (req, res) => {
	try {
		const limit = parsePositiveInt(req.query.limit, 12);
		const items = await Content.find({})
			.sort({ views: -1, viewsLast24h: -1, rating: -1 })
			.limit(limit);

		return res.json({ items });
	} catch (error) {
		return res.status(500).json({ message: "Failed to fetch trending content" });
	}
};

export const getTop10ByType = async (req, res) => {
	try {
		const type = String(req.query.type || "").toLowerCase();
		if (!VALID_TYPES.includes(type)) {
			return res.status(400).json({ message: "Invalid type. Use movie, series, or anime" });
		}

		const items = await Content.find({ type })
			.sort({ rating: -1, views: -1, createdAt: -1 })
			.limit(10);

		return res.json({ items });
	} catch (error) {
		return res.status(500).json({ message: "Failed to fetch top 10 content" });
	}
};

export const getContentList = async (req, res) => {
	try {
		const {
			type,
			genre,
			language,
			year,
			rating,
			page = "1",
			limit = "50"
		} = req.query;

		const filter = {};

		if (type && VALID_TYPES.includes(String(type).toLowerCase())) {
			filter.type = String(type).toLowerCase();
		}
		if (genre) {
			filter.genre = { $in: [String(genre)] };
		}
		if (language) {
			filter.language = String(language);
		}
		if (year) {
			const parsedYear = Number.parseInt(year, 10);
			if (Number.isFinite(parsedYear)) {
				filter.releaseYear = parsedYear;
			}
		}
		if (rating) {
			const parsedRating = Number.parseFloat(rating);
			if (Number.isFinite(parsedRating)) {
				filter.rating = { $gte: parsedRating };
			}
		}

		const parsedPage = parsePositiveInt(page, 1);
		const parsedLimit = parsePositiveInt(limit, 50);
		const skip = (parsedPage - 1) * parsedLimit;

		const [items, total] = await Promise.all([
			Content.find(filter)
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(parsedLimit),
			Content.countDocuments(filter)
		]);

		return res.json({
			items,
			pagination: {
				page: parsedPage,
				limit: parsedLimit,
				total,
				totalPages: Math.ceil(total / parsedLimit) || 1
			}
		});
	} catch (error) {
		return res.status(500).json({ message: "Failed to fetch content list" });
	}
};

export const searchContent = async (req, res) => {
	try {
		const q = String(req.query.q || "").trim();
		if (!q) {
			return res.json({ items: [] });
		}

		const filter = {};
		const regex = new RegExp(q, "i");

		// Text search
		filter.$or = [{ title: regex }, { description: regex }, { genre: regex }];

		// Apply additional filters
		if (req.query.genre) {
			filter.genre = { $in: [String(req.query.genre)] };
		}
		if (req.query.language) {
			filter.language = String(req.query.language);
		}
		if (req.query.year) {
			const parsedYear = Number.parseInt(req.query.year, 10);
			if (Number.isFinite(parsedYear)) {
				filter.releaseYear = parsedYear;
			}
		}
		if (req.query.rating) {
			const parsedRating = Number.parseFloat(req.query.rating);
			if (Number.isFinite(parsedRating)) {
				filter.rating = { $gte: parsedRating };
			}
		}

		const items = await Content.find(filter)
			.sort({ views: -1, rating: -1 })
			.limit(50);

		return res.json({ items });
	} catch (error) {
		return res.status(500).json({ message: "Failed to search content" });
	}
};

export const getContentById = async (req, res) => {
	try {
		const { id } = req.params;
		const item = await Content.findById(id);
		if (!item) {
			return res.status(404).json({ message: "Content not found" });
		}

		return res.json({ item });
	} catch (error) {
		return res.status(500).json({ message: "Failed to fetch content details" });
	}
};
