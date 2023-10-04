import React, { useEffect, useState } from 'react';
import { usePatientData } from './PatientDataContext'; // Import the custom hook
import { Grid, Container, Typography, Paper, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import PagingTabs from './PagingTabs';

export function ReadyForReview() {
  const { patientData } = usePatientData(); // Access patientData from the context
  const [checklist, setChecklist] = useState({
    isPatientInfoComplete: false,
    isInsuranceInfoMissing:false,
    isPrescriptionCaptured:false,
    isSignaturePresent:false,
    isRepListed:false,
    providerNameOrNpiIsMissing :false,


    // Add more checklist items as needed
  });

  useEffect(() => {
    console.log("Patient Data in ReadyForReview component:", patientData);
  }, [patientData]);

  const handleChecklistChange = (event) => {
    setChecklist({ ...checklist, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <PagingTabs />
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Container maxWidth="sm" style={{ marginTop: '16px', marginBottom: '16px' }}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Typography variant="h6" style={{textAlign: 'center'}}>Patient Details</Typography>
              {patientData ? (
                <div>
                  <p>Patient Name: {patientData.patientName}</p>
                  <p>Account: {patientData.accountName}</p>
                  <p>Rx Number: {}</p>
                  <p>Tika ID: {}</p>
                  <p>HCP Name: {patientData.hcpName}</p>
                  <p>
                    Territory: {patientData.accAddress1} {patientData.accCity} {patientData.accState} {patientData.accZip}
                  </p>
                  {/* Display other patient details as needed */}
                </div>
              ) : (
                <p>No patient data available.</p>
              )}
            </Paper>

            {/* Checklist Container */}
            <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
              <Typography variant="h6" style={{textAlign: 'center'}}>Check List</Typography>
              <Grid container spacing={2} className="checkbox-grid">
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checklist.isPatientInfoComplete}
                          onChange={handleChecklistChange}
                          name="isPatientInfoComplete"
                        />
                      }
                      label="Is Patient Info Complete"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checklist.isInsuranceInfoMissing}
                          onChange={handleChecklistChange}
                          name="isInsuranceInfoMissing"
                        />
                      }
                      label="Is Insurance Info Missing"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checklist.isPrescriptionCaptured}
                          onChange={handleChecklistChange}
                          name="isPrescriptionCaptured"
                        />
                      }
                      label="Is Prescription Captured"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checklist.isSignaturePresent}
                          onChange={handleChecklistChange}
                          name="isSignaturePresent"
                        />
                      }
                      label="Is Signature Present"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checklist.isRepListed}
                          onChange={handleChecklistChange}
                          name="isRepListed"
                        />
                      }
                      label="Is Rep Listed"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checklist.providerNameOrNpiIsMissing}
                          onChange={handleChecklistChange}
                          name="providerNameOrNpiIsMissing"
                        />
                      }
                      label="Provider Name Or NPI Is Missing"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}