import React, { useEffect, useState } from 'react';
import { usePatientData } from './PatientDataContext'; // Import the custom hook
import { Grid, Container,Table,TableHead,TableRow,TableBody, TableCell,Typography, Paper, FormGroup, FormControlLabel, Checkbox ,Button, TextField,TableContainer} from '@mui/material';
import PagingTabs from './PagingTabs';
import WoundInfoTable from './WoundInfoTable';
import ProviderInfo from './ProviderInfo';


export function ReadyForReview() {
  const { patientData ,setPatientData} = usePatientData(); // Access patientData from the context
  const [checklist, setChecklist] = useState({
    isPatientInfoComplete: false,
    isInsuranceInfoMissing: false,
    isPrescriptionCaptured: false,
    isSignaturePresent: false,
    isRepListed: false,
    providerNameOrNpiIsMissing: false,
    // Add more checklist items as needed
  });

  useEffect(() => {
    console.log("Patient Data in ReadyForReview component:", patientData);
  }, [patientData]);

  const handleChecklistChange = (event) => {
    setChecklist({ ...checklist, [event.target.name]: event.target.checked });
  };
  const handlePatientDataChange = (field, value) => {
    // Create a copy of the current patientData object
    const updatedPatientData = { ...patientData };
  
    // Update the specified field with the new value
    updatedPatientData[field] = value;
  
    // Update the patientData state with the updated object
    setPatientData(updatedPatientData);
  };

  return (
    <>
      <PagingTabs />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {/* Content on the left */}
            {/* <PatientDetailsForm isReadyForReviewMode /> */}
            <Paper elevation={3} style={{ padding: '16px' }}>
  <Typography variant="h6" style={{ textAlign: 'center' }}>Patient </Typography>
  {patientData ? (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Patient Name"
            fullWidth
            size="small"
            value={patientData.patientName}
            onChange={(e) => handlePatientDataChange('patientName', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            label="Cell Phone"
            fullWidth
            size="small"
            value={patientData.cellPhone}
            onChange={(e) => handlePatientDataChange('cellPhone', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            label="Ship To Address"
            fullWidth
            size="small"
            value={patientData.shipToAddress}
            onChange={(e) => handlePatientDataChange('shipToAddress', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
            <TextField
              label="Last 4 of SSN"
              fullWidth
              size="small"
          value={patientData.ssn}
          onChange={(e) => handlePatientDataChange('SSN', e.target.value)}
            />
          </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="City"
            fullWidth
            size="small"
            value={patientData.city}
            onChange={(e) => handlePatientDataChange('patientCity', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            label="State"
            fullWidth
            size="small"
            value={patientData.state}
            onChange={(e) => handlePatientDataChange('patientState', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            label="ZIP"
            fullWidth
            size="small"
            value={patientData.zip}
            onChange={(e) => handlePatientDataChange('patientZip', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
  <TextField
    label="Date of Birth"
    fullWidth
    size="small"
    value={patientData.dateOfBirth}
    onChange={(e) => handlePatientDataChange('dateOfBirth', e.target.value)}  />
</Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Sales Rep Name"
            fullWidth
            size="small"
            value={patientData.repName}
            onChange={(e) => handlePatientDataChange('hcpName', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Sales Rep Cell"
            fullWidth
            size="small"
            value={patientData.repPhoneNo}
            onChange={(e) => handlePatientDataChange('hcpName', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Place of Service"
            fullWidth
            size="small"
            value={patientData.placeOfService}
            onChange={(e) => handlePatientDataChange('hcpName', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Order Information"
            fullWidth
            size="small"
            value={patientData.orderType}
            onChange={(e) => handlePatientDataChange('hcpName', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Does Patient Still Have an Active Wound"
            fullWidth
            size="small"
            value={patientData.woundActive}
            onChange={(e) => handlePatientDataChange('hcpName', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            label="Distributor"
            fullWidth
            size="small"
            value={patientData.distributorId}
            onChange={(e) => handlePatientDataChange('shipToAddress', e.target.value)}
          />
        </Grid>
      </Grid>
    </form>
  ) : (
    <form>
      {/* Your form fields go here */}
    </form>
  )}
</Paper>

          
           <WoundInfoTable />

          
  <div style={{maxWidth:"100%"}}> 

  <ProviderInfo/>
</div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {/* Add your content that should be on the left */}
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            {/* Content on the right */}
            <Container maxWidth="sm" style={{ marginTop: '16px', marginBottom: '16px' }}>
              <Paper elevation={3} style={{ padding: '16px' }}>
                <Typography variant="h6" style={{ textAlign: 'center' }}>Patient Details</Typography>
                {patientData ? (
                  <div>
                    <p>Patient Name: {patientData.patientName}</p>
                    <p>Account: {patientData.accountName}</p>
                    <p>Rx Number: {patientData.trnRxId}</p>
                    <p>Tika ID: {patientData.patientId}</p>
                    <p>HCP Name: {patientData.hcpName}</p>
                    <p>
                      Territory: {patientData.shipToAddress} {patientData.city} {patientData.state} {patientData.zip}
                    </p>
                    {/* Display other patient details as needed */}
                  </div>
                ) : (
                  <p>No patient data available.</p>
                )}
              </Paper>

              {/* Checklist Container */}
              <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
                <Typography variant="h6" style={{ textAlign: 'center' }}>Checklist</Typography>
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
                <TextField
    label="Add a Comment"
    fullWidth
    multiline
    rows={4}
    variant="outlined"
    style={{ marginTop: '16px' }}
  />

  {/* Buttons */}
  <Grid container spacing={2} style={{ marginTop: '16px' }}>
    <Grid item xs={6}>
      <Button variant="contained" color="primary" fullWidth>
       Send for Re-faxing
      </Button>
    </Grid>
    <Grid item xs={6}>
      <Button variant="contained" color="secondary" fullWidth>
       Prepare for NetSuite Submission
      </Button>
    </Grid>
  </Grid>
</Paper>      
            </Container>
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="space-between" style={{ marginTop: '16px' }}>
  <Grid item>
    <Button variant="contained" color="primary">
      Save
    </Button>
  </Grid>
  <Grid item style={{ marginLeft: 'auto' }}>
    <Button variant="contained" color="secondary">
      Discard
    </Button>
  </Grid>
</Grid>

      </Container>
     
          
    </>
  );
}
