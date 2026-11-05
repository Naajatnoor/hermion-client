
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

import { Pencil, Save, Loader2 } from "lucide-react";

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
  event: EventData;
  onUpdated: (updatedEvent: EventData) => void;
}

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

const EditEventDialog = ({
  event,
  onUpdated,
}: EditEventDialogProps) => {
  const [form, setForm] = useState<EventData>(event);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const update = (field: keyof EventData, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);

    if (value) {
      // Dialog open hole latest event data load hobe
      setForm({ ...event });
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { _id, ...updatedData } = form;

      const res = await fetch(
        `${API_URL}/update-event/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update event");
      }

      onUpdated(form);
      setOpen(false);

      alert("Event updated successfully!");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            <Pencil size={16} />
            Edit
          </Button>
        }
      >
        Edit Event
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto border-[#e5e9e2] bg-[#F7F5ED] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#174C3C]">
            Edit Event
          </DialogTitle>

          <DialogDescription className="text-[#68766E]">
            Update your event information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">

          {/* Event Title */}
          <div className="grid gap-2">
            <Label htmlFor={`title-${event._id}`}>
              Event Title
            </Label>

            <Input
              id={`title-${event._id}`}
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Enter event title"
              required
            />
          </div>

          {/* Event Type */}
          <div className="grid gap-2">
            <Label htmlFor={`type-${event._id}`}>
              Event Type
            </Label>

            <Input
              id={`type-${event._id}`}
              value={form.eventType}
              onChange={(e) =>
                update("eventType", e.target.value)
              }
              placeholder="e.g. Winter Relief"
              required
            />
          </div>

          {/* Date + Location */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor={`date-${event._id}`}>
                Event Date
              </Label>

              <Input
                id={`date-${event._id}`}
                type="date"
                value={form.eventDate?.slice(0, 10)}
                onChange={(e) =>
                  update("eventDate", e.target.value)
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor={`location-${event._id}`}>
                Location
              </Label>

              <Input
                id={`location-${event._id}`}
                value={form.location}
                onChange={(e) =>
                  update("location", e.target.value)
                }
                placeholder="Event location"
                required
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div className="grid gap-2">
            <Label htmlFor={`thumbnail-${event._id}`}>
              Thumbnail URL
            </Label>

            <Input
              id={`thumbnail-${event._id}`}
              type="url"
              value={form.thumbnail}
              onChange={(e) =>
                update("thumbnail", e.target.value)
              }
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor={`description-${event._id}`}>
              Description
            </Label>

            <Textarea
              id={`description-${event._id}`}
              value={form.description}
              onChange={(e) =>
                update("description", e.target.value)
              }
              placeholder="Describe your event..."
              className="min-h-32 resize-none"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-[#e1e7df] pt-5">
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="bg-[#174C3C] text-white hover:bg-[#103b2e]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2 size-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEventDialog;
