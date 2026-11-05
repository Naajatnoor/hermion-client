"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, CalendarDays, MapPin, Image as ImageIcon } from "lucide-react";

export interface EventData {
  _id: string;
  title: string;
  eventType: string;
  eventDate: string;
  location: string;
  thumbnail: string;
  description: string;
  creatorEmail: string;
}

interface EditEventDialogProps {
  event: EventData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedEvent: EventData) => void;
}

export default function EditEventDialog({
  event,
  open,
  onOpenChange,
  onSave,
}: EditEventDialogProps) {
  const [formData, setFormData] = useState<EventData | null>(event);

  useEffect(() => {
    setFormData(event);
  }, [event]);

  if (!formData) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) =>
      prev ? { ...prev, [name]: value } : prev
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-[#e5e9e2] bg-[#F7F5ED] p-0 sm:max-w-[600px]">
        <div className="p-6 sm:p-8">
          <DialogHeader className="mb-7">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8EFE8] text-[#174C3C]">
              <Pencil size={22} />
            </div>

            <DialogTitle className="text-2xl font-bold text-[#174C3C]">
              Edit Event
            </DialogTitle>

            <DialogDescription className="text-[#68766E]">
              Update your event information below.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Event Title */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#26352E]">
                Event Title
              </label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
                required
                className="h-11 border-[#dce3d9] bg-white focus-visible:ring-[#174C3C]"
              />
            </div>

            {/* Event Type */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#26352E]">
                Event Type
              </label>
              <Input
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                placeholder="e.g. Winter Relief"
                required
                className="h-11 border-[#dce3d9] bg-white focus-visible:ring-[#174C3C]"
              />
            </div>

            {/* Date and Location */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#26352E]">
                  <CalendarDays size={15} />
                  Event Date
                </label>
                <Input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate?.slice(0, 10)}
                  onChange={handleChange}
                  required
                  className="h-11 border-[#dce3d9] bg-white focus-visible:ring-[#174C3C]"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#26352E]">
                  <MapPin size={15} />
                  Location
                </label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Event location"
                  required
                  className="h-11 border-[#dce3d9] bg-white focus-visible:ring-[#174C3C]"
                />
              </div>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#26352E]">
                <ImageIcon size={15} />
                Thumbnail URL
              </label>
              <Input
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
                className="h-11 border-[#dce3d9] bg-white focus-visible:ring-[#174C3C]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#26352E]">
                Description
              </label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your event..."
                rows={5}
                required
                className="resize-none border-[#dce3d9] bg-white focus-visible:ring-[#174C3C]"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 border-t border-[#e1e7df] pt-5">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-[#dce3d9] text-[#26352E] hover:bg-[#E8EFE8]"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-[#174C3C] text-white hover:bg-[#103b2e]"
              >
                <Pencil size={15} className="mr-2" />
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
