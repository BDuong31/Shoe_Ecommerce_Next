// import { IOrder, IOrderCoupon, IOrderItem } from '@/interfaces/order';
// import { IPayment } from '@/interfaces/payment';
// import { IUserProfile } from '@/interfaces/user';
// import { IProductVariant } from '@/interfaces/variant';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// type Props = {
//   order: IOrder;
//   orderItems: IOrderItem[];
//   orderCoupon?: IOrderCoupon;
//   customer?: IUserProfile;
//   variant?: IProductVariant[];
//   payment?: IPayment;
//   logoUrl?: string;
// };

// const loadFontAsBase64 = async (url: string): Promise<string> => {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error(`Failed to fetch font: ${response.statusText}`);
//   }
//   const blob = await response.blob();
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const base64 = (reader.result as string).split(',')[1];
//       resolve(base64);
//     };
//     reader.onerror = reject;
//     reader.readAsDataURL(blob);
//   });
// };

// export const generateInvoicePdf = async (data: Props) => {
//   console.log('Generating invoice with data:', data);
//   const { order, orderItems, orderCoupon, customer, variant, payment, logoUrl } = data;

//   const doc = new jsPDF('p', 'pt', 'a4');
//   const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
//   const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
//   const margin = 40;

//   let fontName = 'helvetica';

//   try {
//     const robotoRegularBase64 = await loadFontAsBase64('/fonts/Roboto-Regular.ttf');
//     const robotoBoldBase64 = await loadFontAsBase64('/fonts/Roboto-Bold.ttf');
    
//     doc.addFileToVFS('Roboto-Regular.ttf', robotoRegularBase64);
//     doc.addFileToVFS('Roboto-Bold.ttf', robotoBoldBase64);
    
//     doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
//     doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');
    
//     fontName = 'Roboto';
    
//     doc.setFont(fontName, 'normal');
//   } catch (fontError) {
//     console.error('Không tải được font. Chữ tiếng Việt sẽ dùng font mặc định.', fontError);
//     doc.setFont(fontName, 'normal');
//   }

//   if (logoUrl) {
//     try {
//       const img = await loadImage(logoUrl);
//       doc.addImage(img, 'PNG', margin, 30, 50, 64);
//     } catch (err) {
//       console.warn('Logo load failed', err);
//     }
//   }

//   doc.setFont(fontName, 'bold');
//   doc.setFontSize(18);

//   const widthInvice = doc.getTextWidth("INVOICE") + 60;
//   doc.text("INVOICE",  margin + widthInvice, 43, { align: 'right' });
//   doc.setFont(fontName, 'normal');
//   doc.setFontSize(10);

//   const widthOrderId = doc.getTextWidth(`Order ID: ${order?.id}`) + 60;
//   doc.text(`Order ID: ${order?.id}`, margin + widthOrderId, 63, { align: 'right' });

//   const widthDate = doc.getTextWidth(`Date: ${new Date(order?.createdAt).toLocaleDateString('en-US')}`) + 60;
//   doc.text(`Date: ${new Date(order?.createdAt).toLocaleDateString('en-US')}`, margin + widthDate, 83, { align: 'right' });

//   const startY = 130;
//   doc.setFont(fontName, 'bold');
//   doc.setFontSize(11);
//   doc.text('STORE INFO:', margin, startY);
//   doc.text('CUSTOMER:', pageWidth / 2, startY);

//   doc.setFont(fontName, 'normal');
//   doc.setFontSize(10);

//   doc.text('Name:', margin, startY + 15);
//   doc.text('Baso', margin + 45, startY + 15);

//   doc.text('Address:', margin, startY + 30);
//   doc.text('123 ABC Street, XYZ Ward,', margin + 45, startY + 30);
//   doc.text('Ho Chi Minh City, Vietnam', margin + 45, startY + 45);
//   doc.text('Email:', margin, startY + 60);
//   doc.text('support@baso.com', margin + 45, startY + 60);

//   doc.text('Full Name:', pageWidth / 2, startY + 15);
//   doc.text(removeAccents(customer?.fullName || 'N/A'), pageWidth / 2 + 55, startY + 15);

//   doc.text('Email:', pageWidth / 2, startY + 30);
//   doc.text(customer?.email || 'N/A', pageWidth / 2 + 55, startY + 30);
//   doc.text('Phone:', pageWidth / 2, startY + 45);
//   doc.text(customer?.phone || 'N/A', pageWidth / 2 + 55, startY + 45);

//   const method = payment?.method.split('-')[0].toUpperCase() || 'N/A';
//   doc.setFont(fontName, 'bold');
//   doc.text('PAYMENT METHOD:', margin, startY + 85);
//   doc.setFont(fontName, 'normal');
//   doc.text(method, margin, startY + 100);

//   const tableData = orderItems.map((item, index) => {
//     const variantData = variant?.find(v => v.id === item.variantId);
//     return [
//       index + 1,
//       removeAccents(variantData?.product?.productName || ''), // Nội dung này sẽ là tiếng Việt nếu data là tiếng Việt
//       item.quantity,
//       `$${(variantData?.product?.price ?? 0).toFixed(2)}`,
//       `$${((variantData?.product?.price ?? 0) * item.quantity).toFixed(2)}`
//     ];
//   });

//   autoTable(doc, {
//     startY: startY + 120,
//     head: [['#', 'Product', 'Quantity', 'Price', 'Total']], // Tiêu đề bảng tiếng Anh
//     body: tableData,
//     theme: 'grid',
//     styles: {
//       font: fontName, 
//       fontStyle: 'normal',
//       cellPadding: 5,
//     },
//     headStyles: {
//       fillColor: [33, 37, 41],
//       textColor: 255,
//       fontStyle: 'bold',
//     },
//     didDrawPage: (data) => {
//       doc.setFontSize(10);
//       doc.text(`Page ${doc.internal.pages.length -1}`, data.settings.margin.left, pageHeight - 10);
//     }
//   });

//   const finalY = (doc as any).lastAutoTable?.finalY ?? 500;
//   const shippingCost = order.shippingAddressId === 'collect_in_store' ? 0.00 : 60000.00;
//   const discount = orderCoupon?.discountApplied ?? 0;
//   const total = payment?.amount ?? 0;

//   doc.setFont(fontName, 'normal');
//   doc.setFontSize(10);
//   const width: number = doc.getTextWidth(`$${total.toFixed(2)}`) + 100;
//   doc.setFont("helvetica", "bold"); 
//   doc.setFontSize(12);
//   const text = "TOTAL DUE:";
//   const widthTotalDue = doc.getTextWidth(text);
//   const rightAlignX = pageWidth - margin;
//   let summaryY = finalY + 30;

//   doc.setFont(fontName, 'normal');
//   doc.setFontSize(10);
//   doc.text('Subtotal:', rightAlignX - width + (widthTotalDue - doc.getTextWidth('Subtotal:')), summaryY);
//   doc.text(`$${(total - shippingCost + discount).toFixed(2)}`, rightAlignX, summaryY, { align: 'right' });
//   summaryY += 20;

//   if (orderCoupon) {
//     doc.text('Discount:', rightAlignX - width + (widthTotalDue - doc.getTextWidth('Discount:')), summaryY);
//     doc.text(`-$${discount.toFixed(2)}`, rightAlignX, summaryY, { align: 'right' });
//     summaryY += 20;
//   }

//   doc.text('Shipping:', rightAlignX - width + (widthTotalDue - doc.getTextWidth('Shipping:')), summaryY);
//   doc.text(`$${shippingCost.toFixed(2)}`, rightAlignX, summaryY, { align: 'right' });
//   summaryY += 20;

//   doc.setFont(fontName, 'bold');
//   doc.setFontSize(12);
//   doc.text('TOTAL DUE:', rightAlignX - width, summaryY);
//   doc.text(`$${total.toFixed(2)}`, rightAlignX, summaryY, { align: 'right' });

//   summaryY += 40;
//   doc.setFont(fontName, 'normal');
//   doc.setFontSize(10);
//   doc.text('Thank you for your purchase!', pageWidth / 2, summaryY, { align: 'center' });
//   summaryY += 15;
//   doc.text('BASO - Make your steps comfortable', pageWidth / 2, summaryY, { align: 'center' });

//   return doc;
// };

// const loadImage = (url: string): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.crossOrigin = 'anonymous';
//     img.src = url
//     img.onload = () => {
//       const canvas = document.createElement('canvas');
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext('2d');
//       if (!ctx) reject('Canvas error');
//       ctx?.drawImage(img, 0, 0);
//       resolve(canvas.toDataURL('image/png'));
//     };
//     img.onerror = (err) => reject(err);
//   });
// };

// const removeAccents = (str: string): string => {
//   if (!str) return '';
//   return str
//     .normalize("NFD") // Tách ký tự và dấu
//     .replace(/[\u0300-\u036f]/g, "") // Xóa các dấu
//     .replace(/đ/g, "d") // Xử lý chữ 'đ'
//     .replace(/Đ/g, "D"); // Xử lý chữ 'Đ'
// };
import { IOrder, IOrderCoupon, IOrderItem } from '@/interfaces/order';
import { IPayment } from '@/interfaces/payment';
import { IUserProfile } from '@/interfaces/user';
import { IProductVariant } from '@/interfaces/variant';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Định nghĩa kiểu Props (không thay đổi)
type Props = {
  order: IOrder;
  orderItems: IOrderItem[];
  orderCoupon?: IOrderCoupon;
  customer?: IUserProfile;
  variant?: IProductVariant[];
  payment?: IPayment;
  logoUrl?: string;
};

// Hàm tải font (không thay đổi)
const loadFontAsBase64 = async (url: string): Promise<string> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch font: ${response.statusText}`);
  }
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// Hàm tải hình ảnh (không thay đổi)
const loadImage = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject('Canvas error');
        return;
      }
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = (err) => reject(err);
  });
};

// Hàm bỏ dấu tiếng Việt (không thay đổi)
const removeAccents = (str: string): string => {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

/**
 * === HÀM TẠO PDF ĐÃ ĐƯỢC NÂNG CẤP ===
 */
export const generateInvoicePdf = async (data: Props) => {
  console.log('Generating invoice with data:', data);
  const { order, orderItems, orderCoupon, customer, variant, payment, logoUrl } = data;

  const doc = new jsPDF('p', 'pt', 'a4');
  const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;

  // === ĐỊNH NGHĨA MÀU SẮC ===
  const PRIMARY_COLOR = '#212529'; // Màu chữ chính (đen)
  const SECONDARY_COLOR = '#6c757d'; // Màu chữ phụ (xám)
  const BORDER_COLOR = '#dee2e6'; // Màu viền
  const BRAND_COLOR = '#E5398D'; // Ước tính màu hồng-tím từ logo FE
  const HEADER_BG_COLOR = '#FCE4EC'; // Đổi màu nền header bảng (hồng nhạt hơn brand color)
  const ALT_ROW_COLOR = '#FCE4EC'; // Màu hàng xen kẽ

  doc.setTextColor(PRIMARY_COLOR);

  // === TẢI FONT ===
  let fontName = 'helvetica';
  try {
    const robotoRegularBase64 = await loadFontAsBase64('/fonts/Roboto-Regular.ttf');
    const robotoBoldBase64 = await loadFontAsBase64('/fonts/Roboto-Bold.ttf');
    
    doc.addFileToVFS('Roboto-Regular.ttf', robotoRegularBase64);
    doc.addFileToVFS('Roboto-Bold.ttf', robotoBoldBase64);
    
    doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
    doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');
    
    fontName = 'Roboto';
    console.log('Roboto font loaded successfully.');
  } catch (fontError) {
    console.error('Không tải được font. Chữ tiếng Việt sẽ dùng font mặc định.', fontError);
  }
  doc.setFont(fontName, 'normal');

  // === PHẦN HEADER ===
  let startY = margin;

  // Thêm logo
  if (logoUrl) {
    try {
      const imgData = await loadImage(logoUrl);
      // Thay đổi kích thước logo cho phù hợp
      doc.addImage(imgData, 'PNG', margin, startY, 50, 64); 
    } catch (err) {
      console.warn('Không thể tải logo:', err);
      doc.setFont(fontName, 'bold');
      doc.setFontSize(20);
      doc.text('BASO', margin, startY + 20); // Fallback text
      doc.setFont(fontName, 'normal');
    }
  } else {
      doc.setFont(fontName, 'bold');
      doc.setFontSize(20);
      doc.text('BASO', margin, startY + 20); // Fallback text
      doc.setFont(fontName, 'normal');
  }

  // Thông tin hóa đơn (phải)
  doc.setFont(fontName, 'bold');
  doc.setFontSize(24);
  doc.setTextColor(BRAND_COLOR); // <-- Thay đổi
  doc.text('INVOICE', pageWidth - margin, startY + 15, { align: 'right' });
  doc.setTextColor(PRIMARY_COLOR); // <-- Reset màu

  doc.setFont(fontName, 'normal');
  doc.setFontSize(10);
  doc.setTextColor(SECONDARY_COLOR); // Màu xám cho chi tiết
  
  doc.text(`Order ID: ${order?.id}`, pageWidth - margin, startY + 35, { align: 'right' });
  const orderDate = new Date().toLocaleDateString('vi-VN');
  doc.text(`Date: ${orderDate}`, pageWidth - margin, startY + 50, { align: 'right' });

  startY += 80; // Tăng khoảng cách

  // === PHẦN THÔNG TIN CỬA HÀNG & KHÁCH HÀNG ===
  doc.setDrawColor(BRAND_COLOR);
  doc.line(margin, startY, pageWidth - margin, startY); // Vẽ đường kẻ ngang
  startY += 20;

  const infoCol1X = margin;
  const infoCol2X = pageWidth / 2 + 10;

  doc.setFont(fontName, 'bold');
  doc.setFontSize(11);
  doc.setTextColor(BRAND_COLOR); // <-- Thay đổi
  doc.text('STORE INFO:', infoCol1X, startY);
  doc.text('CUSTOMER:', infoCol2X, startY);
  doc.setTextColor(PRIMARY_COLOR); // <-- Reset màu
  
  startY += 20;
  doc.setFont(fontName, 'normal');
  doc.setFontSize(10);
  doc.setTextColor(SECONDARY_COLOR);

  // Cột Store
  doc.text('Baso', infoCol1X, startY);
  doc.text('123 ABC Street, XYZ Ward,', infoCol1X, startY + 15);
  doc.text('Ho Chi Minh City, Vietnam', infoCol1X, startY + 30);
  doc.text('support@baso.com', infoCol1X, startY + 45);

  // Cột Customer
  doc.text(removeAccents(customer?.fullName || 'N/A'), infoCol2X, startY);
  doc.text(customer?.email || 'N/A', infoCol2X, startY + 15);
  doc.text(customer?.phone || 'N/A', infoCol2X, startY + 30);
  
  // Xử lý địa chỉ giao hàng (nếu có)
  const shippingAddress = order.shippingAddressId === 'collect_in_store' 
    ? 'Collect in store' 
    : 'Shipping to customer address'; // Giả định
  doc.text(shippingAddress, infoCol2X, startY + 45, { maxWidth: contentWidth / 2 - 20 });
  
  startY += 70; // Tăng khoảng cách

  // === PHẦN THANH TOÁN ===
  doc.setFont(fontName, 'bold');
  doc.setFontSize(11);
  doc.setTextColor(BRAND_COLOR); // <-- Thay đổi
  const widthMethod = doc.getTextWidth('PAYMENT METHOD:') + 10;
  doc.text('PAYMENT METHOD:', margin, startY);
  doc.setTextColor(PRIMARY_COLOR); // <-- Reset màu
  
  doc.setFont(fontName, 'normal');
  doc.setFontSize(10);
  doc.setTextColor(SECONDARY_COLOR);
  const method = payment?.method.split('-')[0].toUpperCase() || 'N/A';
  doc.text(method, margin + widthMethod, startY);
  
  startY += 30; // Tăng khoảng cách

  // === BẢNG SẢN PHẨM ===
  const tableData = orderItems.map((item, index) => {
    const variantData = variant?.find(v => v.id === item.variantId);
    const productName = removeAccents(variantData?.product?.productName || 'N/A');
    const price = variantData?.product?.price ?? 0;
    const totalItem = price * item.quantity;
    return [
      index + 1,
      productName,
      item.quantity,
      `$${price.toFixed(2)}`,
      `$${totalItem.toFixed(2)}`
    ];
  });

  autoTable(doc, {
    startY: startY,
    head: [['#', 'Product', 'Quantity', 'Price', 'Total']],
    body: tableData,
    theme: 'grid', // 'grid' có viền rõ ràng
    styles: {
      font: fontName,
      fontStyle: 'normal',
      fontSize: 10,
      textColor: PRIMARY_COLOR,
    },
    headStyles: {
      fillColor: HEADER_BG_COLOR, // Màu nền header (đã đổi thành #f8f9fa)
      textColor: BRAND_COLOR, // <-- Thay đổi (từ trắng -> đen)
      fontStyle: 'bold',
      fontSize: 11,
    },
    alternateRowStyles: {
      fillColor: ALT_ROW_COLOR, // Màu hàng xen kẽ
    },
    didDrawPage: (data) => {
      // Thêm số trang
      doc.setFontSize(10);
      doc.setTextColor(SECONDARY_COLOR);
      doc.text(`Page ${doc.internal.pages.length - 1}`, data.settings.margin.left, pageHeight - 10);
    }
  });

  // === PHẦN TỔNG CỘNG (TOTALS) ===
  const finalY = (doc as any).lastAutoTable?.finalY ?? (pageHeight - 200);
  let summaryY = finalY + 30; // Tăng khoảng cách

  const shippingCost = order.shippingAddressId === 'collect_in_store' ? 0.00 : 60000.00;
  const discount = orderCoupon?.discountApplied ?? 0;
  const total = payment?.amount ?? 0;
  const subtotal = total - shippingCost + discount; // Tính lại subtotal

  const labelX = pageWidth - margin - 100; // Căn phải cho nhãn
  const valueX = pageWidth - margin;     // Căn phải cho giá trị

  doc.setFont(fontName, 'normal');
  doc.setFontSize(10);
  doc.setTextColor(PRIMARY_COLOR);

  // Subtotal
  doc.text('Subtotal:', labelX, summaryY, { align: 'right' });
  doc.text(`$${subtotal.toFixed(2)}`, valueX, summaryY, { align: 'right' });
  summaryY += 20;

  // Discount
  if (orderCoupon) {
    doc.text('Discount:', labelX, summaryY, { align: 'right' });
    doc.setTextColor('#dc3545'); // Màu đỏ cho giảm giá
    doc.text(`-$${discount.toFixed(2)}`, valueX, summaryY, { align: 'right' });
    summaryY += 20;
    doc.setTextColor(PRIMARY_COLOR);
  }

  // Shipping
  doc.text('Shipping:', labelX, summaryY, { align: 'right' });
  doc.text(`$${shippingCost.toFixed(2)}`, valueX, summaryY, { align: 'right' });
  summaryY += 20;

  // Đường kẻ ngang
  doc.setDrawColor(BRAND_COLOR);
  doc.line(labelX - 40, summaryY, valueX, summaryY); // Kẻ đường
  summaryY += 15;

  // TOTAL DUE
  doc.setFont(fontName, 'bold');
  doc.setFontSize(14); // Tăng cỡ chữ
  doc.setTextColor(BRAND_COLOR); // <-- Thay đổi
  doc.text('TOTAL DUE:', labelX, summaryY, { align: 'right' });
  doc.text(`$${total.toFixed(2)}`, valueX, summaryY, { align: 'right' });
  doc.setTextColor(PRIMARY_COLOR); // <-- Reset màu

  // === PHẦN FOOTER ===
  const footerY = pageHeight - margin - 20;
  doc.setDrawColor(BORDER_COLOR);
  doc.line(margin, footerY, pageWidth - margin, footerY); // Kẻ đường footer

  summaryY = footerY + 20;
  doc.setFont(fontName, 'normal');
  doc.setFontSize(10);
  doc.setTextColor(SECONDARY_COLOR);
  doc.text('Thank you for your purchase!', pageWidth / 2, summaryY, { align: 'center' });
  summaryY += 15;
  doc.setFont(fontName, 'bold');
  doc.text('BASO - Make your steps comfortable', pageWidth / 2, summaryY, { align: 'center' });

  // Trả về file PDF
  return doc;
};