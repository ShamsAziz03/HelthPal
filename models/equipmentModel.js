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
}

module.exports = EquipmentModel;
