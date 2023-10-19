import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Button, Paper, Typography, Grid } from '@mui/material';
import PagingTabs from './PagingTabs';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

export function DuplicateFax({ onReset }) {
  const { faxId, duplicateFaxId } = useParams(); // Get the fax IDs from route parameters
 const navigate = useNavigate();
  // Set the PDF worker source
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

  // Original PDF states and functions
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfResponse, setPdfResponse] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [error, setError] = useState(null);
  const [mainFaxData, setMainFaxData] = useState(null);
  const [selectedFaxId, setSelectedFaxId] = useState(null);
  const [mainTrnFaxId, setMainTrnFaxId] = useState(null);

  // Duplicate PDF states and functions
  const [duplicateNumPages, setDuplicateNumPages] = useState(null);
  const [duplicatePageNumber, setDuplicatePageNumber] = useState(1);
  const [duplicatePdfResponse, setDuplicatePdfResponse] = useState(null);
  const [duplicateZoomLevel, setDuplicateZoomLevel] = useState(1);
  const [duplicateError, setDuplicateError] = useState(null);
  const [duplicateFaxData, setDuplicateFaxData] = useState(null);
  const [duplicateTrnFaxId, setDuplicateTrnFaxId] = useState(null);

  // Options for the Autocomplete dropdown
  
  const [top100Films, setTop100Films] = useState([
    { label: '1509414999', year: 1994 },
   
    { label: '1515538690', year: 1974 },
  ]);

  // Function to fetch PDF data for both main and duplicate fax
  const fetchPdfData = (faxId) => {
    const token = localStorage.getItem('token');

    if (token) {
      axios({
        method: 'GET',
        url: `/api/v1/fax/faxDupeById/${faxId}`, // Use the endpoint that provides both IDs
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          let mainFaxId = response.data.data[0].faxId;
          let duplicateFaxId = response.data.data[1].faxId;
          console.log(response.data.data[0].trnFaxId);
          console.log(response.data.data[1].trnFaxId);
          let mainTrnFaxId = response.data.data[0].trnFaxId; // Declare mainTrnFaxId
          let duplicateTrnFaxId = response.data.data[1].trnFaxId; // Declare duplicateTrnFaxId
          
          //const trnFaxId = response.data.data[1].trnFaxId;
          setSelectedFaxId(duplicateFaxId); // Set the selected fax ID

          // Fetch main fax PDF
          axios({
            method: 'GET',
            url: `/api/v1/fax/getFaxPdf/${mainFaxId}`,
            responseType: 'arraybuffer',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((mainResponse) => {
              setPdfResponse(mainResponse.data);
              setError(null); // Clear any previous errors on successful response
              setMainFaxData(response.data.data[0]);
              setMainTrnFaxId(mainTrnFaxId);
            })
            .catch((error) => {
              setError('Error fetching main PDF. Please try again later.');
              console.error('Error fetching main PDF:', error);
            });

          // Fetch duplicate fax PDF
          axios({
            method: 'GET',
            url: `/api/v1/fax/getFaxPdf/${duplicateFaxId}`,
            responseType: 'arraybuffer',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((duplicateResponse) => {
              setDuplicatePdfResponse(duplicateResponse.data);
              setDuplicateError(null); // Clear any previous errors on successful response
              setDuplicateFaxData(response.data.data[1]);
              setDuplicateTrnFaxId(duplicateTrnFaxId);
            })
            .catch((error) => {
              setDuplicateError('Error fetching duplicate PDF. Please try again later.');
              console.error('Error fetching duplicate PDF:', error);
            });
        })
        .catch((error) => {
          setError('Error fetching fax IDs. Please try again later.');
          console.error('Error fetching fax IDs:', error);
        });
    } else {
      setError('Authentication token not available. Please log in.');
    }
  };

  useEffect(() => {
    // Fetch PDF data for both main and duplicate fax when the component mounts
    fetchPdfData(faxId);
  }, []);

  // Original PDF functions
  const handleNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleZoomIn = () => {
    if (zoomLevel < 2) {
      setZoomLevel(zoomLevel + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel(zoomLevel - 0.1);
    }
  };

  // Duplicate PDF functions
  const handleDuplicateNextPage = () => {
    if (duplicatePageNumber < duplicateNumPages) {
      setDuplicatePageNumber(duplicatePageNumber + 1);
    }
  };

  const handleDuplicatePreviousPage = () => {
    if (duplicatePageNumber > 1) {
      setDuplicatePageNumber(duplicatePageNumber - 1);
    }
  };

  const handleDuplicateZoomIn = () => {
    if (duplicateZoomLevel < 2) {
      setDuplicateZoomLevel(duplicateZoomLevel + 0.1);
    }
  };

  const handleDuplicateZoomOut = () => {
    if (duplicateZoomLevel > 0.5) {
      setDuplicateZoomLevel(duplicateZoomLevel - 0.1);
    }
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Function to handle the success of loading the duplicate PDF document
  function onDuplicateDocumentLoadSuccess({ numPages }) {
    setDuplicateNumPages(numPages);
  }

  // Function to handle making the current fax the master
  const handleMakeMaster = () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .put(`/api/v1/fax/updateFax/${duplicateTrnFaxId}/${mainTrnFaxId}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // Handle success
          console.log('Keep Duplicate Success:', response.data);
          const confirmation = window.confirm('Fax has been made the master. Do you want to redirect to the fax page?');

          // If the user clicks "OK" in the alert box, redirect to the fax page
          if (confirmation) {
            // Replace 'fax-page-url' with the actual URL of your fax page
           
            navigate("/nsrxmgt/fax");
          }
       
          // You may want to update the state or perform other actions on success.
        })
        .catch((error) => {
          // Handle error
          console.error('Keep Duplicate Error:', error);
          // You can set an error state or show an error message to the user.
        });
    } else {
      setError('Authentication token not available. Please log in.');
    }
  };
  const handleKeepDuplicate = () => {
    console.log(duplicateFaxData.faxId);
    // Add your logic here to handle keeping the current fax as a duplicate
    // You may want to make an API call to update the duplicate status in your backend.
    // Example:
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .put(`/api/v1/fax/keepDuplicate/6`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // Handle success
          console.log('Keep Duplicate Success:', response.data);
          // You may want to update the state or perform other actions on success.
            // Show an alert indicating the success
            alert('Fax has been kept as a duplicate.');

            // Redirect to the fax page
            navigate("/nsrxmgt/fax");
        })
        .catch((error) => {
          // Handle error
          console.error('Keep Duplicate Error:', error);
          // You can set an error state or show an error message to the user.
        });
    } else {
      setError('Authentication token not available. Please log in.');
    }
  };
  
  // Function to update the duplicate options based on the selected fax ID
  const handleFaxIdSelect = (event, newValue) => {
    // Fetch PDF data for the selected fax ID
    setSelectedFaxId(newValue);
    console.log('Selected Fax ID:', newValue);
    fetchPdfData(newValue);
  };

  return (
    <>
      <PagingTabs />
      <div
        style={{
          position: 'absolute',
          top: '10em', // Adjust the top position as needed
          left: '30rem', // Adjust the left position as needed
          zIndex: 1,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleMakeMaster}
          style={{
            marginTop: '16px',
            bottom: '8rem',
            right: '14rem',
          }}
        >
          Master
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleKeepDuplicate}
          style={{
            marginTop: '16px',
            bottom: '7.4rem',
            left: '20rem',
          }}
        >
          Duplicate
        </Button>
        <Autocomplete
          sx={{ width: '100%' }}
          id="faxId-filter"
          options={top100Films.map((film) => film.label)}
          value={selectedFaxId}
          onChange={handleFaxIdSelect}
          size="small"
          renderInput={(params) => (
            <TextField {...params} label="Select Duplicate Fax ID" />
          )}
        />
      </div>
      <TableContainer
  component={Paper}
  elevation={3}
  style={{
    position: 'absolute',
    zIndex: 1,
    height: '7.1rem',
    width: '15rem',
    top: '40px',
  }}
>
  <Table aria-label="fax-details-table">
    {/* <TableHead>
      <TableRow style={{ background: 'green' }}>
        <TableCell style={{ align: 'center' }}>Master</TableCell>
        <TableCell></TableCell>
      </TableRow>
      <TableRow style={{ background: 'grey' }}>
        <TableCell>Detail</TableCell>
        <TableCell>Value</TableCell>
      </TableRow>
    </TableHead> */}
    <TableBody>
      {mainFaxData && (
        <>
          <TableRow>
            <TableCell>Fax ID</TableCell>
            <TableCell>{mainFaxData.faxId}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Fax Date</TableCell>
            <TableCell>{mainFaxData.faxDate}</TableCell>
          </TableRow>
          {/* Add more rows for other properties you want to display */}
        </>
      )}
    </TableBody>
  </Table>
</TableContainer>

{/* Duplicate Fax Data */}
<TableContainer
  component={Paper}
  elevation={1}
  style={{
    position: 'absolute',
    zIndex: 1,
    marginTop:'1px',
    height: '7rem',
    width: '15rem',
    top: '40px',
    left:'40rem'
  }}
>
  <Table aria-label="fax-details-table">
    {/* <TableHead>
      <TableRow style={{ background: 'red' }}>
        <TableCell>Duplicate</TableCell>
        <TableCell></TableCell>
      </TableRow>
      <TableRow style={{ background: 'grey' }}>
        <TableCell>Detail</TableCell>
        <TableCell>Value</TableCell>
      </TableRow>
    </TableHead> */}
    <TableBody>
      {duplicateFaxData && (
        <>
          <TableRow>
            <TableCell>Fax ID</TableCell>
            <TableCell>{duplicateFaxData.faxId}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Fax Date</TableCell>
            <TableCell>{duplicateFaxData.faxDate}</TableCell>
          </TableRow>
          {/* Add more rows for other properties you want to display */}
        </>
      )}
    </TableBody>
  </Table>
</TableContainer>
      {/* <TableContainer component={Paper} elevation={3} style={{
          position: 'absolute',
          // Adjust the top position as needed
          // Adjust the left position as needed
          zIndex: 1,
          height:'10rem',
          width: '15rem',
          top:'-40px'
        }}
      >
        
    <Table aria-label="fax-details-table">
      <TableHead>
      <TableRow style={{background : 'green'}}>
      <TableCell style={{align : 'center',
      
    
    }}>Master</TableCell>
      <TableCell></TableCell>
      </TableRow>
        <TableRow style={{background : 'grey'}}>
          <TableCell>Detail</TableCell>
          <TableCell>Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {mainFaxData && ( // Check if mainFaxData is not null before rendering
          <>
            <TableRow>
              <TableCell>Fax ID</TableCell>
              <TableCell>{mainFaxData.faxId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Case ID</TableCell>
              <TableCell>{mainFaxData.caseId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fax Status</TableCell>
              <TableCell>{mainFaxData.faxStatus}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Main Fax ID</TableCell>
              <TableCell>{mainFaxData.mainFaxId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fax Date</TableCell>
              <TableCell>{mainFaxData.faxDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fax Number</TableCell>
              <TableCell>{mainFaxData.faxNumber}</TableCell>
            </TableRow>
          </>
        )}
      </TableBody>
    </Table>
  </TableContainer>

  <TableContainer component={Paper} elevation={1}style={{
          position: 'absolute',
          // Adjust the top position as needed
          // Adjust the left position as needed
          top: '12rem',
          zIndex: 1,
          height:'10rem',
          width: '15rem'
        
        }} >
    <Table aria-label="fax-details-table">
      <TableHead>
      <TableRow style={{background : 'red'}}>
      <TableCell>Duplicate</TableCell>
      <TableCell></TableCell>
      </TableRow>
        <TableRow style={{background : 'grey'}}>
          <TableCell>Detail</TableCell>
          <TableCell>Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {duplicateFaxData && ( // Check if duplicateFaxData is not null before rendering
          <>
            <TableRow>
              <TableCell>Fax ID</TableCell>
              <TableCell>{duplicateFaxData.faxId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Case ID</TableCell>
              <TableCell>{duplicateFaxData.caseId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fax Status</TableCell>
              <TableCell>{duplicateFaxData.faxStatus}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Main Fax ID</TableCell>
              <TableCell>{duplicateFaxData.mainFaxId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fax Date</TableCell>
              <TableCell>{duplicateFaxData.faxDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fax Number</TableCell>
              <TableCell>{duplicateFaxData.faxNumber}</TableCell>
            </TableRow>
          </>
        )}
      </TableBody>
    </Table>
  </TableContainer> */}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '48%' }}>
          {/* Original Fax Display */}
          <div
            style={{
              position: 'absolute',
              top: '10rem',
              left: '1rem',
              zIndex: 1,
            }}
          >
            <Button
              variant="contained"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 2}
              size="small"
              style={{
                margin: '1rem',
              }}
            >
              +
            </Button>
            <br />
            <Button
              variant="contained"
              onClick={handleZoomOut}
              size="small"
              disabled={zoomLevel <= 0.5}
              style={{
                margin: '1rem',
              }}
            >
              -
            </Button>
          </div>
          <Paper
  elevation={3}
  style={{
    padding: '20px',
    maxWidth: '300px',
    margin: 'auto',
    transform: `scale(${zoomLevel})`,
    transformOrigin: 'top left',
    marginTop: '50px', // Add margin to move content down
  }}
>
  {/* Existing content */}
  {pdfResponse ? (
    <Document file={pdfResponse} onLoadSuccess={onDocumentLoadSuccess}>
      <Page pageNumber={pageNumber} width={300} />
    </Document>
  ) : (
    <Typography variant="body1" align="center" color="error">
      {error || 'Loading PDF...'}
    </Typography>
  )}
  {numPages && (
    <Typography variant="body1" align="center">
      Page {pageNumber} of {numPages}
    </Typography>
  )}
  <Grid container justifyContent="space-between" spacing={2}>
    <Grid item>
      <Button
        variant="contained"
        onClick={handlePreviousPage}
        disabled={pageNumber === 1}
      >
        Previous
      </Button>
    </Grid>
    <Grid item>
      <Button
        variant="contained"
        onClick={handleNextPage}
        disabled={pageNumber === numPages}
      >
        Next
      </Button>
    </Grid>
  </Grid>
</Paper>





        </div>
        <div style={{ width: '48%' }}>
          {/* Duplicate Fax Display */}
          <div
            style={{
              position: 'absolute',
              top: '10rem',
              right: '1rem',
              zIndex: 1,
            }}
          >
            <Button
              variant="contained"
              onClick={handleDuplicateZoomIn}
              disabled={duplicateZoomLevel >= 2}
              size="small"
              style={{
                margin: '1rem',
              }}
            >
              +
            </Button>
            <br />
            <Button
              variant="contained"
              onClick={handleDuplicateZoomOut}
              size="small"
              disabled={duplicateZoomLevel <= 0.5}
              style={{
                margin: '1rem',
              }}
            >
              -
            </Button>
          </div>
          <Paper
          elevation={3}
          style={{
            padding: '20px',
            maxWidth: '300px',
            margin: 'auto',
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top left',
            marginTop: '50px', // Add margin to move content down
          }}
        >
            {duplicatePdfResponse ? (
              <Document file={duplicatePdfResponse} onLoadSuccess={onDuplicateDocumentLoadSuccess}>
                <Page pageNumber={duplicatePageNumber} width={300} />
              </Document>
            ) : (
              <Typography variant="body1" align="center" color="error">
                {duplicateError || 'Loading Duplicate PDF...'}
              </Typography>
            )}
            {duplicateNumPages && (
              <Typography variant="body1" align="center">
                Page {duplicatePageNumber} of {duplicateNumPages}
              </Typography>
            )}
            <Grid container justifyContent="space-between" spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={handleDuplicatePreviousPage}
                  disabled={duplicatePageNumber === 1}
                >
                  Previous
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={handleDuplicateNextPage}
                  disabled={duplicatePageNumber === duplicateNumPages}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              size='small'
              onClick={handleMakeMaster}
              style={{
                marginTop: '16px',
                top:'7px ',
                left:'-0.6rem'
              }}
            >
             Make Master
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size='small'
              onClick={handleKeepDuplicate}
              style={{
                  marginTop: '16px',
                left:'3rem',
                top:'0.5rem'
              }}
            >
              Keep Duplicate
            </Button>
          </Paper>
          
        </div>
      </div>
    </>
    
  );
}
