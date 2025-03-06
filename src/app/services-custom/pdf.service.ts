import { Injectable } from '@angular/core';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  async mergeAndGeneratePDF(): Promise<Uint8Array> {
    const pdfUrls = [
      '/assets/pdfs/pdf1.pdf',
      '/assets/pdfs/pdf2.pdf',
      '/assets/pdfs/pdf3.pdf',
      '/assets/pdfs/pdf4.pdf',
      '/assets/pdfs/pdf5.pdf',
    ];

    // Crear PDF
    const mergedPdf = await PDFDocument.create();


    // Crear portada
    const coverPage = mergedPdf.addPage();
    const coverFont = await mergedPdf.embedFont(StandardFonts.HelveticaBold);
    coverPage.drawText('Portada del Documento', {
      x: 50,
      y: coverPage.getHeight() - 100,
      size: 24,
      font: coverFont,
      color: rgb(0, 0, 0.7),
    });

    // Cargar y unir los PDFs fijos
    for (const url of pdfUrls) {
      const pdfBytes = await fetch(url).then((res) => res.arrayBuffer());
      const pdf = await PDFDocument.load(pdfBytes);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    }

    // Crear página final
    const finalPage = mergedPdf.addPage();
    finalPage.drawText('Fin del Documento', {
      x: 50,
      y: finalPage.getHeight() - 100,
      size: 24,
      font: coverFont,
      color: rgb(0.7, 0, 0),
    });

    return await mergedPdf.save();
  }
}
