'use server'; 

import { Resend } from 'resend';
import { z } from 'zod';
import { EmailTemplate } from '@/components/email/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.YOUR_EMAIL_ADDRESS;
const toEmail = process.env.TO_EMAIL_ADDRESS;

const contactFormSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  phone: z.string().optional(),
  message: z.string().min(1, { message: "Tin nhắn không được để trống" }),
});

export async function sendContactEmail(formData: {
  email: string;
  phone?: string;
  message: string;
}) {
  if (!toEmail) {
    return { success: false, error: 'Thiếu cấu hình email người nhận' };
  }

  const validation = contactFormSchema.safeParse(formData);
  if (!validation.success) {
    const firstError = validation.error.errors[0]?.message || "Dữ liệu không hợp lệ";
    return { success: false, error: firstError };
  }

  const { email, phone, message } = validation.data;

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `Tin nhắn liên hệ mới từ ${email}`,
      react: EmailTemplate({ email, phone, message }),
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error: 'Lỗi khi gửi email' };
    }

    // Thành công!
    return { success: true, message: 'Email đã được gửi thành công!' };
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, error: 'Lỗi máy chủ nội bộ' };
  }
}