// src/components/ui/booking-form.jsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getUpcomingAvailability } from "@/data/availability";

const BookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  date: z.string().min(1, "Pick a date"),
  time: z.string().min(1, "Pick a time"),
  note: z.string().max(1000).optional(),
});

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState("");
  const avail = useMemo(() => getUpcomingAvailability(14), []);
  const dates = avail.map((d) => d.dateISO);
  const timesForSelected = useMemo(() => {
    const found = avail.find((d) => d.dateISO === selectedDate);
    return found?.slots ?? [];
  }, [avail, selectedDate]);

  const form = useForm({
    resolver: zodResolver(BookingSchema),
    defaultValues: { name: "", email: "", date: "", time: "", note: "" },
  });

  const onSubmit = async (values) => {
    try {
      const promise = fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }).then(async (res) => {
        const data = await res.json();
        if (!res.ok || !data.ok) throw new Error(data.message || "Booking failed");
        return data;
      });

      toast.promise(promise, {
        loading: "Submitting your request...",
        success: "Request sent! I’ll confirm by email shortly.",
        error: (err) => err?.message || "Something went wrong.",
      });

      await promise;
      form.reset();
      setSelectedDate("");
    } catch (e) {
      console.error(e);
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md w-full">
        <FormField name="name" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl><Input placeholder="Your name" autoComplete="name" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField name="email" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl><Input type="email" placeholder="you@example.com" autoComplete="email" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField name="date" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Date</FormLabel>
            <FormControl>
              <select
                className="w-full border rounded-md px-3 py-2 bg-background"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                  setSelectedDate(e.target.value);
                  form.setValue("time", "");
                }}
              >
                <option value="">Select a date</option>
                {dates.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField name="time" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Time</FormLabel>
            <FormControl>
              <select
                className="w-full border rounded-md px-3 py-2 bg-background"
                value={field.value}
                onChange={field.onChange}
                disabled={!selectedDate}
              >
                <option value="">{selectedDate ? "Select a time" : "Pick a date first"}</option>
                {timesForSelected.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField name="note" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Notes (optional)</FormLabel>
            <FormControl><Textarea rows={4} placeholder="Anything you'd like to add?" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Request booking"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
