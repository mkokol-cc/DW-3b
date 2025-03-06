import { Component, OnInit } from '@angular/core';
import { PdfService } from '../../services-custom/pdf.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [
    CommonModule, 
    PdfViewerModule, 
    HttpClientModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.scss'
})
export class PdfViewerComponent implements OnInit {
  mergedPdfSrc: string | null = null;

  pdfSrc = "";

  constructor(private pdfService: PdfService) {}

  async ngOnInit() {
    const mergedPdfBytes = await this.pdfService.mergeAndGeneratePDF();
    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    this.mergedPdfSrc = URL.createObjectURL(blob);
    console.log("PDF URL:", this.mergedPdfSrc);  // 👈 Log para verificar
    this.pdfSrc = this.mergedPdfSrc
  }

  download(){
    const a = document.createElement('a');
    a.href = this.pdfSrc;
    a.download = 'conclusion.pdf';
    a.click();
  }

}
