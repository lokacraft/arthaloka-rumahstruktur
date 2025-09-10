import {z} from "zod"

const formDataSchema = z.object({
    nama: z.string().min(1, "Name is required"),
    email: z.email("Invalid Email Adress"),
    judul: z.string().min(1, "Subject is required"),
    pesan: z.string().min(1, "Message is required"),
});

export default formDataSchema;