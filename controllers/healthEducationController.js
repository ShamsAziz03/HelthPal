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
}

