import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Button, Paper, Typography, Grid } from '@mui/material';
import PagingTabs from './PagingTabs';
import { useParams } from 'react-router-dom';

// ... (Previous code remains the same)

export function DuplicateFax({ onReset }) {
    const { faxId } = useParams(); // Get the user ID from route parameters
    const { duplicateFaxId } = useParams(); // Get the duplicate fax ID from route parameters
  
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
  
    // Duplicate PDF states and functions
    const [duplicateNumPages, setDuplicateNumPages] = useState(null);
    const [duplicatePageNumber, setDuplicatePageNumber] = useState(1);
    const [duplicatePdfResponse, setDuplicatePdfResponse] = useState(null);
    const [duplicateZoomLevel, setDuplicateZoomLevel] = useState(1);
    const [duplicateError, setDuplicateError] = useState(null);
  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }
  
    function onDuplicateDocumentLoadSuccess({ numPages }) {
      setDuplicateNumPages(numPages);
    }
  
    useEffect(() => {
      // Function to fetch PDF data
      const fetchPdfData = (faxId) => {
        const token = localStorage.getItem('token');
  
        if (token) {
          axios({
            method: 'GET',
            url: `/fax/getFaxPdf/1515328660`,
            responseType: 'arraybuffer',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              console.log('PDF Response:', response.data);
              setPdfResponse(response.data);
              setError(null); // Clear any previous errors on successful response
            })
            .catch((error) => {
              setError('Error fetching PDF. Please try again later.');
              console.error('Error fetching PDF:', error);
            });
        } else {
          setError('Authentication token not available. Please log in.');
        }
      };
  
      // Fetch PDF data for Fax ID
      fetchPdfData(faxId);
    }, [faxId]);
  
    useEffect(() => {
      // Function to fetch duplicate PDF data
      const fetchDuplicatePdfData = (duplicateFaxId) => {
        const token = localStorage.getItem('token');
  
        if (token) {
          axios({
            method: 'GET',
            url: `/fax/getFaxPdf/1515518994`,
            responseType: 'arraybuffer',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              console.log('Duplicate PDF Response:', response.data);
              setDuplicatePdfResponse(response.data);
              setDuplicateError(null); // Clear any previous errors on successful response
            })
            .catch((error) => {
              setDuplicateError('Error fetching Duplicate PDF. Please try again later.');
              console.error('Error fetching Duplicate PDF:', error);
            });
        } else {
          setDuplicateError('Authentication token not available. Please log in.');
        }
      };
  
      // Fetch duplicate PDF data for Duplicate Fax ID
      fetchDuplicatePdfData(duplicateFaxId);
    }, [duplicateFaxId]);
  
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
  
    // Function to handle making the current fax the master
    const handleMakeMaster = () => {
      // Add your logic here to handle making the current fax the master
      // You may want to make an API call to update the master status in your backend.
      // Example:
      axios.post(`/fax/makeMaster/${faxId}`)
        .then((response) => {
          console.log('PDF Response:', response.data);
          setPdfResponse(response.data);
          setError(null); // Clear any previous errors on successful response
        })
        .catch((error) => {
          setError('Error fetching PDF. Please try again later.');
          console.error('Error fetching PDF:', error);
        });
    };
  
    // Function to handle keeping the current fax as a duplicate
    const handleKeepDuplicate = () => {
      // Add your logic here to handle keeping the current fax as a duplicate
      // You may want to make an API call to update the duplicate status in your backend.
      // Example:
      axios.post(`/fax/keepDuplicate/${duplicateFaxId}`)
        .then((response) => {
          // Handle success
        })
        .catch((error) => {
          // Handle error
        });
    };
  
    return (
      <>
        <PagingTabs />
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
              }}
            >
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleMakeMaster}
                style={{ marginTop: '16px' }}
              >
                Master
              </Button>
            </Paper>
          </div>
          <div style={{ width: '48%' }}>
            {/* Duplicate Fax Display */}
            <div
              style={{
                position: 'absolute',
                top: '10rem',
                right: '30rem',
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
                transform: `scale(${duplicateZoomLevel})`,
                transformOrigin: 'top left',
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
                  top:'10px ',
                  right:'3rem'
                }}
              >
               Make Master
              </Button>
              <Button
                variant="contained"
                color="primary"
                // onClick={handleSubmit} // Define a handleSubmit function
                style={{
                  marginTop: '16rem',
                  right:'25rem',
                  margin: '4px',
                }}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size='small'
                onClick={handleKeepDuplicate}
                style={{
                    marginTop: '16px',
                  left:'6rem',
                  bottom:'2.5rem'
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
  