const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');

// Medication Request Routes
router.post('/createMedicationRequest', medicationController.createMedicationRequest);
router.get('/getAllMedicationRequests', medicationController.getAllMedicationRequests);
router.get('/getMedicationRequestById/:requestId', medicationController.getMedicationRequestById);
router.get('/getMedicationRequestsByPatient/:patientId', medicationController.getMedicationRequestsByPatient);
router.get('/getMedicationRequestsByStatus/:status', medicationController.getMedicationRequestsByStatus);
router.get('/getMedicationRequestsByNGO/:ngoId', medicationController.getMedicationRequestsByNGO);
router.get('/getMedicationStatistics', medicationController.getMedicationStatistics);
router.get('/getMedicationRequestsByNGOAndStatus/:ngoId/:status', medicationController.getMedicationRequestsByNGOandStatus);
router.put('/handleMedicationRequest', medicationController.handleRequestByNGO);
router.put('/updateMedicationRequestStatus/:requestId', medicationController.updateMedicationRequestStatus);

router.delete('/deleteMedicationRequest/:requestId', medicationController.deleteMedicationRequest);

module.exports = router;