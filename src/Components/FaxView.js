import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Button, Paper, Typography, Grid } from '@mui/material';

export default function FaxView({ onReset }) {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfResponse, setPdfResponse] = useState();

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

  useEffect(() => {
    const handleScroll = (event) => {
      if (event.deltaY > 0) {
        handleNextPage(); // Scroll down to go to the next page
      } else if (event.deltaY < 0) {
        handlePreviousPage(); // Scroll up to go to the previous page
      }
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [pageNumber, numPages]);

  return (
    <Paper elevation={3} style={{ padding: '17px', maxWidth: '800px', margin: 'auto' }}>
      <Document file={pdfResponse} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <Typography variant="body1" align="center">
        Page {pageNumber} of {numPages}
      </Typography>
      <Grid container justifyContent="center" spacing={2}>
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
  );
}
