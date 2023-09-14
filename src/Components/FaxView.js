import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Button, Paper, Typography, Grid } from '@mui/material';
import PagingTabs from './PagingTabs';

export default function FaxView({ onReset }) {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfResponse, setPdfResponse] = useState();
  const [zoomLevel, setZoomLevel] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/fax/faxPdf',
      responseType: 'arraybuffer',
    })
      .then((response) => setPdfResponse(response.data));
  }, []);

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
          top: '10rem',
          left: '20rem',
          zIndex: 1,
          
          
        }}
      >
        <Button
          variant="contained"
          onClick={handleZoomIn}
          disabled={zoomLevel >= 2}
          size='small'
          style={{
            margin: '1rem',

        
        
        }}
        >
          +
        </Button>
        <br/>
        <Button
          variant="contained"
          onClick={handleZoomOut}
          size='small'
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
          transform: `scale(${zoomLevel})`, // Apply zoom level to page content
          transformOrigin: 'top left', // Zoom from the top left corner
        }}
      >
        <Document file={pdfResponse} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} width={300} />
        </Document>
        <Typography variant="body1" align="center">
          Page {pageNumber} of {numPages}
        </Typography>
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
