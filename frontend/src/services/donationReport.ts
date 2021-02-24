import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

// define a generatePDF function that accepts a donations argument
const generatePDF = (donations: any) => {
  // initialize jsPDF
  const doc: any = new jsPDF();

  // define the columns we want and their examCodes
  const tableColumn = [
    "donation Id",
    "First Name",
    "Second Name",
    "Last Name",
    "Blood Type",
    "Amount",
  ];
  // define an empty array of rows
  const tableRows: any = [];

  // for each donation pass all its data into an array
  donations.forEach((donation: any) => {
    const donationData = [
      donation.donationId,
      donation.donors.firstname,
      donation.donors.secondname,
      donation.donors.lastname,
      donation.donors.bloodtypes.bloodname,
      donation.amount,
      // called date-fns to format the date on the donation
      format(new Date(donation.createdAt), "yyyy-MM-dd"),
    ];
    // push each tickcet's info into a row
    tableRows.push(donationData);
  });

  // startY is basically margin-top
  doc.autoTable({
    theme: "grid",
    margin: { top: 50 },
    head: [tableColumn],
    body: tableRows,
  });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // donation examCode. and margin-top + margin-left
  doc.text("Somaliland Blood Bank", 80, 15);
  doc.text("donation Report", 14, 40);
  doc.text(
    `${date[0]} / ${date[1]} / ${date[2]} / ${date[3]} / ${date[4]}`,
    120,
    40
  );
  // doc.addImage(myImage, "png", 5, 5, 40, 10);
  doc.save(`donation_report_${dateStr}.pdf`);

  // we define the name of our PDF file.
};

export default generatePDF;
