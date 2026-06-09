import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ReportesService } from './reportes.service';
import PDFDocument from 'pdfkit';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly service: ReportesService) {}

  @Get('resumen')
  getResumen() {
    return this.service.getResumen();
  }

  @Get('pdf')
  async generarPDF(@Res() res: Response) {
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=reporte.pdf');

    doc.pipe(res);

    const data = await this.service.getResumen();

    // ================= HEADER =================
    doc
      .fontSize(22)
      .fillColor('#111')
      .text('REPORTE DEL NEGOCIO', { align: 'center' });

    doc
      .fontSize(12)
      .fillColor('#666')
      .text(`Generado el: ${new Date().toLocaleString()}`, {
        align: 'center',
      });

    // línea separadora (posición fija)
    doc
      .moveTo(50, 110)
      .lineTo(550, 110)
      .strokeColor('#ddd')
      .stroke();

    // ================= TITULO SECCIÓN =================
    const startY = 140;

    doc
      .fontSize(16)
      .fillColor('#111')
      .text('Resumen general', 50, startY);

    // ================= CARDS =================
    const box = (label, value, x, y, color) => {
      doc
        .roundedRect(x, y, 250, 70, 10)
        .fillColor('#f7f7f7')
        .fill();

      doc
        .strokeColor('#eee')
        .stroke();

      doc
        .fillColor(color)
        .fontSize(10)
        .text(label, x + 15, y + 15);

      doc
        .fillColor('#111')
        .fontSize(20)
        .text(String(value), x + 15, y + 32);
    };

    const cardY = startY + 30;

    box('PRODUCTOS', data.productos, 50, cardY, '#3b82f6');
    box('CLIENTES', data.clientes, 320, cardY, '#22c55e');

    box('PEDIDOS', data.pedidos, 50, cardY + 90, '#f97316');
    box('VENTAS (Bs)', data.ventas, 320, cardY + 90, '#a855f7');

    // ================= FOOTER =================
    doc
      .fontSize(10)
      .fillColor('#999')
      .text(
        'Sistema de gestión - Repostería',
        50,
        cardY + 200,
        { align: 'center', width: 500 }
      );

    doc.end();
  }
}