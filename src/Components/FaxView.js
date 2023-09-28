import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Button, Paper, Typography, Grid } from '@mui/material';
import PagingTabs from './PagingTabs';
import { useParams, useLocation } from 'react-router-dom';
import FaxDetails from './FaxDetails';



export  function FaxView({ onReset }) {
  const { faxId } = useParams(); // Get the user ID from route parameters
  const location = useLocation();
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfResponse, setPdfResponse] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [error, setError] = useState(null);
  const [faxDetails, setFaxDetails] = useState(null);
  //const faxData = location.state ? location.state.faxData : null;
  const faxData = location.state;


  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios({
        method: 'GET',
        url: `/api/v1/fax/getFaxPdf/${faxId}`,
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
  }, [faxId]);

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

  useEffect(() => {
    const handleScroll = (event) => {
      if (event.deltaY > 0) {
        handleNextPage();
      } else if (event.deltaY < 0) {
        handlePreviousPage();
      }
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [pageNumber, numPages]);

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
    <PagingTabs />
   
    <div
      style={{
        position: 'absolute',
        top: '10em', // Adjust the top position as needed
        left: '5rem', // Adjust the left position as needed
        zIndex: 2,
      }}
    >
         {faxData && <FaxDetails faxData={faxData} />}
   
</div>
      <div
        style={{
          position: 'absolute',
          top: '10rem',
          left: '20rem',
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
      </Paper>
    </div>
  );
}
