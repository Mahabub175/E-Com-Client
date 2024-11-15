import { jsPDF } from "jspdf";
const popinRegular = "";
const popinMedium = "../assets/Poppins/Poppins-Medium.ttf";
export const generatePdf = (menuSections) => {
  return new Promise((resolve, reject) => {
    const doc = new jsPDF();

    //Load custom font
    doc.addFont("/poppins/Poppins-Regular.ttf", "CustomFont", "normal");
    doc.addFont("/poppins/Poppins-Medium.ttf", "CustomFont", "medium");

    // Set default font
    doc.setFont("CustomFont");

    let currentY;
    const pageWidth = 210;
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    function addMenuItem(item) {
      // Item title and price
      let titleX = margin;
      let starWidth = 0;

      if (item.bestSeller) {
        doc.setFontSize(14);
        doc.setTextColor(151, 134, 103);
        doc.setFont("ZapfDingbats", "normal");
        const star = String.fromCharCode(81); // Character code for star in 'ZapfDingbats'
        starWidth = doc.getTextWidth(star);
        doc.text(star, titleX, currentY);
        titleX += starWidth + 1; // Adjust position for the title
      }

      // Output the title using your custom font
      doc.setFontSize(11);
      doc.setTextColor(34, 34, 34); // #222
      doc.setFont("CustomFont", "medium");
      const title = doc.splitTextToSize(
        item.title || "",
        contentWidth - 40 - starWidth
      ); // Adjust for star width
      doc.text(title, titleX, currentY);

      // Prepare the price and dots
      const price = item.basePrice ? `$${item.basePrice.toFixed(2)}` : "";
      const priceWidth = doc.getTextWidth(price);
      const titleWidth = doc.getTextWidth(title[0]) + starWidth; // Include star width
      const dotsWidth = contentWidth - titleWidth - priceWidth - 2; // Adjust for dots
      const dots = ".".repeat(
        Math.max(0, Math.floor(dotsWidth / doc.getTextWidth(".")))
      );

      // Output dots and price
      doc.text(dots, titleX + doc.getTextWidth(title[0]), currentY);
      doc.text(price, pageWidth - margin - priceWidth, currentY);

      currentY += title.length * 4;

      // Item description
      doc.setFontSize(9);
      doc.setTextColor(68, 68, 68); // #444
      doc.setFont("CustomFont", "normal");

      if (item.description) {
        const descriptionLines = doc.splitTextToSize(
          item.description,
          contentWidth
        );
        doc.text(descriptionLines, margin, currentY);
        currentY += descriptionLines.length * 3.5;
      }

      // Options and sizes
      if (item.options && item.options.length > 0) {
        doc.setFont("CustomFont", "medium");
        const optionsLabel = "Opciones: ";
        const optionsLabelWidth = doc.getTextWidth(optionsLabel);
        doc.text(optionsLabel, margin, currentY);

        doc.setFont("CustomFont", "normal");
        const optionsContent = item.options
          .map((option) =>
            option.name ? `${option.name} $${option.price.toFixed(2)}` : option
          )
          .join(" / ");
        const optionsLines = doc.splitTextToSize(
          optionsContent,
          contentWidth - optionsLabelWidth
        );

        optionsLines.forEach((line, index) => {
          if (index === 0) {
            doc.text(line, margin + optionsLabelWidth, currentY);
          } else {
            doc.text(line, margin, currentY);
          }
          currentY += 3.5;
        });

        currentY += 1; // Add a little extra space after options
      }

      // Add sizes if available (similar to options)
      if (item.sizes && item.sizes.length > 0) {
        doc.setFont("CustomFont", "medium");
        const sizesLabel = "Tamaños: ";
        const sizesLabelWidth = doc.getTextWidth(sizesLabel);
        doc.text(sizesLabel, margin, currentY);

        doc.setFont("CustomFont", "normal");
        const sizesContent = item.sizes
          .map((size) => `${size.name} $${size.price.toFixed(2)}`)
          .join(" / ");
        const sizesLines = doc.splitTextToSize(
          sizesContent,
          contentWidth - sizesLabelWidth
        );

        sizesLines.forEach((line, index) => {
          if (index === 0) {
            doc.text(line, margin + sizesLabelWidth, currentY);
          } else {
            doc.text(line, margin, currentY);
          }
          currentY += 3.5;
        });

        currentY += 1; // Add a little extra space after sizes
      }

      currentY += 4; // Add some space after each item

      // Add new page if needed
      if (currentY > 280) {
        doc.addPage();
        currentY = 20;
      }
    }

    menuSections.forEach((data, index) => {
      if (index > 0) {
        doc.addPage();
      }

      // Add category title
      doc.setFontSize(24);
      doc.setTextColor(151, 134, 103); // #978667
      doc.setFont("CustomFont", "medium");
      doc.text(data.category, 105, 30, { align: "center" });

      // Add category description
      doc.setFontSize(12);
      doc.setTextColor(68, 68, 68); // #444
      doc.setFont("CustomFont", "normal");
      const descriptionLines = doc.splitTextToSize(
        (data.category === "Desayunos"
          ? `${data.description} Disponible de 6:00am a 11:00am`
          : data.description) || "Delicious menu items",
        170
      );
      doc.text(descriptionLines, 105, 40, { align: "center" });

      // Add decorative element with padding
      const lineY = 40 + descriptionLines.length * 5 + 10; // Add 10 units of padding
      doc.setDrawColor(151, 134, 103); // #978667
      doc.setLineWidth(0.5);
      doc.line(30, lineY, 180, lineY);

      // Create single-column layout for menu items
      currentY = lineY + 15; // Start items after the line with some padding

      if (data.category === "Platos Principales") {
        // Handle Platos Principales differently
        const addItems = (items, subtitle = null) => {
          if (subtitle) {
            doc.setFontSize(14);
            doc.setTextColor(151, 134, 103); // #978667
            doc.setFont("CustomFont", "medium");
            doc.text(subtitle, margin, currentY);
            currentY += 8;
          }

          items.forEach((item) => {
            addMenuItem(item);
          });
        };

        addItems(data.items.general, "Menú General");

        const days = [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ];
        const dayNames = [
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
          "Domingo",
        ];

        days.forEach((day, index) => {
          if (data.items[day] && data.items[day].length > 0) {
            addItems(data.items[day], dayNames[index]);
          }
        });
      } else {
        // Handle other categories
        data.items.forEach((item) => {
          addMenuItem(item);
        });
      }

      // Add footer
      const year = new Date().getFullYear();
      doc.setFontSize(8);
      doc.setTextColor(68, 68, 68); // #444
      doc.setFont("CustomFont", "normal");
      const footerText = [
        `© ${year} La Ceiba Panadería y Repostería - Todos los derechos reservados.`,
        "Los precios y la disponibilidad de los artículos están sujetos a cambios sin previo aviso.",
        "Para obtener la información más actualizada, visite nuestro sitio web o contáctenos directamente.",
      ];

      footerText.forEach((line, i) => {
        doc.text(line, 105, 282 + i * 4, { align: "center" });
      });
    });

    // Save the PDF
    doc.save("la-ceiba-menu.pdf");
    resolve();
  });
};
