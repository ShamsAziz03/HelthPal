const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

router.post('/createMedicationRequest', authenticateToken, medicationController.createMedicationRequest);

router.get('/getAllMedicationRequests', authenticateToken, authorizeRole('Admin', 'NGO'), medicationController.getAllMedicationRequests);

router.get('/getMedicationRequestById/:requestId', authenticateToken, medicationController.getMedicationRequestById);

router.get('/getMedicationRequestsByPatient/:patientId', authenticateToken, authorizeRole('Admin', 'Doctor', 'NGO'), medicationController.getMedicationRequestsByPatient);

router.get('/getMedicationRequestsByStatus/:status', authenticateToken, authorizeRole('Admin', 'NGO'), medicationController.getMedicationRequestsByStatus);
router.get('/getMedicationRequestsByNGO/:ngoId', authenticateToken, authorizeRole('Admin', 'NGO'), medicationController.getMedicationRequestsByNGO);

router.get('/getMedicationRequestsByNGOAndStatus/:ngoId/:status', authenticateToken, authorizeRole('Admin', 'NGO'), medicationController.getMedicationRequestsByNGOandStatus);
router.get('/getMedicationRequestsByNGOAndStatus/:ngoId/:status', authenticateToken, authorizeRole('Admin', 'NGO'), medicationController.getMedicationRequestsByNGOandStatus);

router.get('/getMedicationStatistics', authenticateToken, authorizeRole('Admin'), medicationController.getMedicationStatistics);

router.put('/handleMedicationRequest', authenticateToken, authorizeRole('NGO'), medicationController.handleRequestByNGO);

router.put('/updateMedicationRequestStatus/:requestId', authenticateToken, authorizeRole('NGO'), medicationController.updateMedicationRequestStatus);

router.delete('/deleteMedicationRequest/:requestId', authenticateToken, authorizeRole('Admin'), medicationController.deleteMedicationRequest);

module.exports = router;