const HealthEducation = require("../models/HealthEducation");

class HealthEducationController {

    static async create(req, res) {
        try {
            const content = await HealthEducation.create(req.body);
            res.status(201).json({
                message: "Health education content created successfully",
                data: content
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to create content",
                error: error.message
            });
        }
    }

    static async getAll(req, res) {
        try {
            const filters = req.query;
            const contentList = await HealthEducation.getAll(filters);
            res.status(200).json(contentList);
        } catch (error) {
            res.status(500).json({
                message: "Failed to fetch content",
                error: error.message
            });
        }
    }
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const content = await HealthEducation.getById(id);
            if (!content) {
                return res.status(404).json({ message: "Content not found" });
            }
            res.status(200).json(content);
        } catch (error) {
            res.status(500).json({
                message: "Failed to fetch content",
                error: error.message
            });
        }
    }
    static async getByCategory(req, res) {
        try {
            const { category } = req.params;
            const { language } = req.query;
            const content = await HealthEducation.getByCategory(category, language);
            res.status(200).json(content);
        } catch (error) {
            res.status(500).json({
                message: "Failed to fetch category content",
                error: error.message
            });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const updated = await HealthEducation.update(id, req.body);

            if (!updated) {
                return res.status(404).json({ message: "Content not found" });
            }

            res.status(200).json({
                message: "Content updated successfully",
                data: updated
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to update content",
                error: error.message
            });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await HealthEducation.delete(id);

            if (!deleted) {
                return res.status(404).json({ message: "Content not found" });
            }

            res.status(200).json({
                message: "Content deleted successfully"
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to delete content",
                error: error.message
            });
        }
    }

}

