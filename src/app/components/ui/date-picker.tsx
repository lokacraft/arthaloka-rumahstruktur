"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useState } from "react";

interface DatePickerProps {
  date?: Date;
  setDate: (date: Date | undefined) => void;
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          {date ? format(date, "PPP") : <span>Pilih tanggal</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={date}
          onSelect={(d) => {
            setDate(d); // simpan tanggal
            if (d) setOpen(false); // 👈 tutup otomatis setelah pilih
          }}
          disabled={(d) =>
            d > new Date("2100-01-01") || d < new Date("1900-01-01")
          }
          className="p-2 text-sm [&_.rdp-day]:h-6 [&_.rdp-day]:w-10 [&_.rdp-day]:text-base [&_.rdp-caption_label]:text-sm"
        />
      </PopoverContent>
    </Popover>
  );
}
