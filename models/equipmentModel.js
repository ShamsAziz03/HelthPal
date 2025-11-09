const db = require("../config/database");

class EquipmentModel {
  // Create new equipment
  static async create(equipmentData) {
    const { name, type, location, ngoId, quantity, expirationDate } =
      equipmentData;
    const equipmentId = "EQP" + Date.now();

    const query = `
            INSERT INTO Equipment 
            (equipmentId, name, type, location, status, ngoId, quantity, expirationDate) 
            VALUES (?, ?, ?, ?, 'Available', ?, ?, ?)
        `;

    const [result] = await db.execute(query, [
      equipmentId,
      name,
      type,
      location,
      ngoId,
      quantity,
      expirationDate,
    ]);

    return { equipmentId, ...equipmentData, status: "Available" };
  }

  // Get all equipment
  static async findAll() {
    const query = `
            SELECT e.*, n.organizationName 
            FROM Equipment e
            LEFT JOIN NGO n ON e.ngoId = n.ngoId
            ORDER BY e.name
        `;

    const [equipment] = await db.execute(query);
    return equipment;
  }

  // Get equipment by ID
  static async findById(equipmentId) {
    const query = `
            SELECT e.*, n.organizationName 
            FROM Equipment e
            LEFT JOIN NGO n ON e.ngoId = n.ngoId
            WHERE e.equipmentId = ?
        `;

    const [equipment] = await db.execute(query, [equipmentId]);
    return equipment[0] || null;
  }

  // Search equipment with filters
  static async search(filters) {
    const { type, location, status, ngoId } = filters;

    let query = `
            SELECT e.*, n.organizationName 
            FROM Equipment e
            LEFT JOIN NGO n ON e.ngoId = n.ngoId
            WHERE 1=1
        `;
    const params = [];

    if (type) {
      query += " AND e.type = ?";
      params.push(type);
    }
    if (location) {
      query += " AND e.location LIKE ?";
      params.push(`%${location}%`);
    }
    if (status) {
      query += " AND e.status = ?";
      params.push(status);
    }
    if (ngoId) {
      query += " AND e.ngoId = ?";
      params.push(ngoId);
    }

    query += " ORDER BY e.name";

    const [equipment] = await db.execute(query, params);
    return equipment;
  }
  // Get equipment by type
  static async findByType(type) {
    const query = `
            SELECT e.*, n.organizationName 
            FROM Equipment e
            LEFT JOIN NGO n ON e.ngoId = n.ngoId
            WHERE e.type = ?
            ORDER BY e.name
        `;

    const [equipment] = await db.execute(query, [type]);
    return equipment;
  }

  // Get equipment by location
  static async findByLocation(location) {
    const query = `
            SELECT e.*, n.organizationName 
            FROM Equipment e
            LEFT JOIN NGO n ON e.ngoId = n.ngoId
            WHERE e.location LIKE ?
            ORDER BY e.name
        `;

    const [equipment] = await db.execute(query, [`%${location}%`]);
    return equipment;
  }

  // Get equipment by status
  static async findByStatus(status) {
    const query = `
            SELECT e.*, n.organizationName 
            FROM Equipment e
            LEFT JOIN NGO n ON e.ngoId = n.ngoId
            WHERE e.status = ?
            ORDER BY e.name
        `;

    const [equipment] = await db.execute(query, [status]);
    return equipment;
  }

  // Get equipment by NGO
  static async findByNGO(ngoId) {
    const query = `
            SELECT e.*, n.organizationName 
            FROM Equipment e
            LEFT JOIN NGO n ON e.ngoId = n.ngoId
            WHERE e.ngoId = ?
            ORDER BY e.name
        `;

    const [equipment] = await db.execute(query, [ngoId]);
    return equipment;
  }

  // Get equipment by NGO and status
  static async findByNGOAndStatus(ngoId, status) {
    const query = `
            SELECT e.*, n.organizationName 
            FROM Equipment e
            LEFT JOIN NGO n ON e.ngoId = n.ngoId
            WHERE e.ngoId = ? AND e.status = ?
            ORDER BY e.name
        `;

    const [equipment] = await db.execute(query, [ngoId, status]);
    return equipment;
  }

  //************************************** */
  // Update equipment status and quantity
  static async updateStatus(equipmentId, status, quantity) {
    const query = `
            UPDATE Equipment 
            SET status = ?, quantity = ? 
            WHERE equipmentId = ?
        `;

    const [result] = await db.execute(query, [status, quantity, equipmentId]);
    return result.affectedRows > 0;
  }

  // Update entire equipment record
  static async update(equipmentId, updateData) {
    const { name, type, location, status, quantity, expirationDate } =
      updateData;

    const query = `
            UPDATE Equipment 
            SET name = ?, type = ?, location = ?, status = ?, quantity = ?, expirationDate = ?
            WHERE equipmentId = ?
        `;

    const [result] = await db.execute(query, [
      name,
      type,
      location,
      status,
      quantity,
      expirationDate,
      equipmentId,
    ]);

    return result.affectedRows > 0;
  }

  // Delete equipment
  static async delete(equipmentId) {
    const query = "DELETE FROM Equipment WHERE equipmentId = ?";
    const [result] = await db.execute(query, [equipmentId]);
    return result.affectedRows > 0;
  }

  // Get available equipment count by type
  static async getAvailableCountByType() {
    const query = `
            SELECT type, SUM(quantity) as totalQuantity
            FROM Equipment
            WHERE status = 'Available'
            GROUP BY type
            ORDER BY type
        `;

    const [counts] = await db.execute(query);
    return counts;
  }
  // Get expiring equipment (within 30 days)
  static async getExpiringEquipment(days = 30) {
    const query = `
            SELECT e.*, n.organizationName 
            FROM Equipment e
            LEFT JOIN NGO n ON e.ngoId = n.ngoId
            WHERE e.expirationDate IS NOT NULL 
            AND e.expirationDate <= DATE_ADD(CURDATE(), INTERVAL ? DAY)
            ORDER BY e.expirationDate
        `;

    const [equipment] = await db.execute(query, [days]);
    return equipment;
  }

  // Get equipment statistics
  static async getStatistics() {
    const query = `
            SELECT 
                COUNT(*) as totalEquipment,
                SUM(quantity) as totalQuantity,
                SUM(CASE WHEN status = 'Available' THEN quantity ELSE 0 END) as availableQuantity,
                SUM(CASE WHEN status = 'In Use' THEN quantity ELSE 0 END) as inUseQuantity,
                SUM(CASE WHEN status = 'Reserved' THEN quantity ELSE 0 END) as reservedQuantity,
                SUM(CASE WHEN status = 'Out of Service' THEN quantity ELSE 0 END) as outOfServiceQuantity,
                COUNT(DISTINCT type) as equipmentTypes
            FROM Equipment
        `;

    const [stats] = await db.execute(query);
    return stats[0];
  }
}

module.exports = EquipmentModel;
