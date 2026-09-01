"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Eye, CheckCircle, XCircle, Trash2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Booking } from "@/types/booking";

interface BookingActionsProps {
  booking: Booking;
  onView: (booking: Booking) => void;
  onUpdateStatus: (id: string, status: Booking["bookingStatus"]) => void;
  onDelete: (id: string) => void;
}

type ActionType = "complete" | "cancel" | "delete" | null;

export function BookingActions({ booking, onView, onUpdateStatus, onDelete }: BookingActionsProps) {
  const [actionType, setActionType] = useState<ActionType>(null);

  const handleConfirmAction = () => {
    if (actionType === "complete") {
      onUpdateStatus(booking.id, "Completed");
    } else if (actionType === "cancel") {
      onUpdateStatus(booking.id, "Cancelled");
    } else if (actionType === "delete") {
      onDelete(booking.id);
    }
    setActionType(null);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4 text-zinc-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[170px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onView(booking)} className="cursor-pointer">
            <Eye className="mr-2 h-4 w-4" /> View Details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {booking.bookingStatus !== "Completed" && (
            <DropdownMenuItem 
              onClick={() => setActionType("complete")}
              className="cursor-pointer text-emerald-600 focus:text-emerald-700 focus:bg-emerald-50 dark:focus:bg-emerald-950/40"
            >
              <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" /> Mark Completed
            </DropdownMenuItem>
          )}
          {booking.bookingStatus !== "Cancelled" && (
            <DropdownMenuItem 
              onClick={() => setActionType("cancel")}
              className="cursor-pointer text-amber-600 focus:text-amber-700 focus:bg-amber-50 dark:focus:bg-amber-950/40"
            >
              <XCircle className="mr-2 h-4 w-4 text-amber-500" /> Cancel Booking
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => setActionType("delete")}
            className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/40"
          >
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modern Confirmation Modal */}
      <AlertDialog open={!!actionType} onOpenChange={(open) => !open && setActionType(null)}>
        <AlertDialogContent className="max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
          <AlertDialogHeader>
            <div className="flex items-center gap-3">
              {actionType === "complete" && (
                <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
              {actionType === "cancel" && (
                <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-600">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              )}
              {actionType === "delete" && (
                <div className="p-2 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600">
                  <Trash2 className="w-5 h-5" />
                </div>
              )}
              <AlertDialogTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {actionType === "complete" && "Mark Appointment Completed?"}
                {actionType === "cancel" && "Cancel this Booking?"}
                {actionType === "delete" && "Delete Booking Permanently?"}
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-zinc-600 dark:text-zinc-400 text-sm pt-2 text-left">
              {actionType === "complete" && (
                <>Are you sure you want to mark the appointment for <strong className="text-foreground font-semibold">{booking.customer.name}</strong> ({booking.service.name}) as completed?</>
              )}
              {actionType === "cancel" && (
                <>Are you sure you want to cancel the booking for <strong className="text-foreground font-semibold">{booking.customer.name}</strong>? The status will be updated to Cancelled.</>
              )}
              {actionType === "delete" && (
                <>Are you sure you want to permanently delete the booking record for <strong className="text-foreground font-semibold">{booking.customer.name}</strong>? This action cannot be undone.</>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="pt-4 gap-2">
            <AlertDialogCancel className="cursor-pointer border-zinc-200 dark:border-zinc-800">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmAction}
              className={`cursor-pointer ${
                actionType === "complete" 
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                  : actionType === "cancel" 
                  ? "bg-amber-600 hover:bg-amber-700 text-white" 
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              {actionType === "complete" && "Confirm Completion"}
              {actionType === "cancel" && "Confirm Cancellation"}
              {actionType === "delete" && "Yes, Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
