const db = require('../config/db');

class HealthEducation {
    // Create new health education content
    static async create(contentData) {

        const { contentId, title, content, category, mediaFiles, language } = contentData;

        const query = `
      INSERT INTO HealthEducation 
      (contentId, title, content, category, mediaFiles, language, publishedDate)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

        const mediaFilesJson = mediaFiles ? JSON.stringify(mediaFiles) : null;

        try {
            const [result] = await db.execute(query, [
                contentId,
                title,
                content,
                category,
                mediaFilesJson,
                language || 'Arabic'
            ]);

            return { contentId, ...contentData, publishedDate: new Date() };
        } catch (error) {
            throw error;
        }
    }

    // Get all health education content with filters
    static async getAll(filters = {}) {
        let query = 'SELECT * FROM HealthEducation WHERE 1=1';
        const params = [];

        if (filters.category) {
            query += ' AND category = ?';
            params.push(filters.category);
        }

        if (filters.language) {
            query += ' AND language = ?';
            params.push(filters.language);
        }

        if (filters.search) {
            query += ' AND (title LIKE ? OR content LIKE ?)';
            params.push(`%${filters.search}%`, `%${filters.search}%`);
        }

        query += ' ORDER BY publishedDate DESC';

        if (filters.limit) {
            query += ' LIMIT ?';
            params.push(parseInt(filters.limit));
        }

        if (filters.offset) {
            query += ' OFFSET ?';
            params.push(parseInt(filters.offset));
        }

        try {
            const [rows] = await db.execute(query, params);
            return rows.map(row => ({
                ...row,
                mediaFiles: row.mediaFiles ? JSON.parse(row.mediaFiles) : []
            }));
        } catch (error) {
            throw error;
        }
    }

    // Get content by ID
    static async getById(contentId) {
        const query = 'SELECT * FROM HealthEducation WHERE contentId = ?';

        try {
            const [rows] = await db.execute(query, [contentId]);
            if (rows.length === 0) return null;

            const content = rows[0];
            return {
                ...content,
                mediaFiles: content.mediaFiles ? JSON.parse(content.mediaFiles) : []
            };
        } catch (error) {
            throw error;
        }
    }

    // Get content by category
    static async getByCategory(category, language = null) {
        let query = 'SELECT * FROM HealthEducation WHERE category = ?';
        const params = [category];

        if (language) {
            query += ' AND language = ?';
            params.push(language);
        }

        query += ' ORDER BY publishedDate DESC';

        try {
            const [rows] = await db.execute(query, params);
            return rows.map(row => ({
                ...row,
                mediaFiles: row.mediaFiles ? JSON.parse(row.mediaFiles) : []
            }));
        } catch (error) {
            throw error;
        }
    }

    // Update health education content
    static async update(contentId, updates) {
        const fields = [];
        const params = [];

        if (updates.title) {
            fields.push('title = ?');
            params.push(updates.title);
        }

        if (updates.content) {
            fields.push('content = ?');
            params.push(updates.content);
        }

        if (updates.category) {
            fields.push('category = ?');
            params.push(updates.category);
        }

        if (updates.mediaFiles) {
            fields.push('mediaFiles = ?');
            params.push(JSON.stringify(updates.mediaFiles));
        }

        if (updates.language) {
            fields.push('language = ?');
            params.push(updates.language);
        }

        if (fields.length === 0) {
            throw new Error('No fields to update');
        }

        params.push(contentId);
        const query = `UPDATE HealthEducation SET ${fields.join(', ')} WHERE contentId = ?`;

        try {
            const [result] = await db.execute(query, params);
            if (result.affectedRows === 0) return null;
            return await this.getById(contentId);
        } catch (error) {
            throw error;
        }
    }

    // Delete health education content
    static async delete(contentId) {
        const query = 'DELETE FROM HealthEducation WHERE contentId = ?';

        try {
            const [result] = await db.execute(query, [contentId]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    // Get all unique categories
    static async getCategories() {
        const query = 'SELECT DISTINCT category FROM HealthEducation ORDER BY category';

        try {
            const [rows] = await db.execute(query);
            return rows.map(row => row.category);
        } catch (error) {
            throw error;
        }
    }

    // Get content count by category
    static async getStatistics() {
        const query = `
      SELECT 
        category,
        language,
        COUNT(*) as count
      FROM HealthEducation
      GROUP BY category, language
      ORDER BY category, language
    `;

        try {
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = HealthEducation;

