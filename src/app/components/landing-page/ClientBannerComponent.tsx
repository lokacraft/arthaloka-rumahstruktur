"use client"
import { useContact } from '@/contexts/ContactContext';
import React from 'react'
import BottomBanner from "@/app/components/BottomBanner";

function ClientBannerComponent() {
      const { contactData, isLoading } = useContact();
      return (
    <>
      {contactData && !isLoading && (
          <BottomBanner
            title={
              <>
                Siap Berkolaborasi <br />
                dengan Kami?
              </>
            }
            description={
              <>
                Konsultasikan Kebutuhan anda  <br /> dengan WhatsApp dibawah ini <br />
              </>
            }
            buttonHref={`https://wa.me/${contactData.whatsAppNumber}?text=${encodeURIComponent(contactData.ctaWhatsAppMessage)}`}
            buttonText="WhatsApp Kami Sekarang!"
          />

      )}
    </>
  )
}

export default ClientBannerComponent