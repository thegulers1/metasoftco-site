"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"

export type CalendarProps = React.HTMLAttributes<HTMLDivElement> & {
    mode?: "single" | "range" | "multiple"
    selected?: Date
    onSelect?: (date: Date) => void
}

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps & { showOutsideDays?: boolean }) {
    // Simplified calendar for demo purposes
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const selectedDay = props.selected?.getDate() || 11;

    return (
        <div className={cn("p-3 bg-white dark:bg-black rounded-md border", className)} {...props}>
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium">May 2022</span>
                <div className="flex gap-1">
                    <ChevronLeftIcon className="h-4 w-4 opacity-50" />
                    <ChevronRightIcon className="h-4 w-4 opacity-50" />
                </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                    <div key={d} className="text-neutral-500 font-normal">{d}</div>
                ))}
                {days.map(d => (
                    <div
                        key={d}
                        className={cn(
                            "h-8 w-8 flex items-center justify-center rounded-md transition-colors",
                            d === selectedDay ? "bg-black text-white dark:bg-white dark:text-black" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        )}
                    >
                        {d}
                    </div>
                ))}
            </div>
        </div>
    )
}
Calendar.displayName = "Calendar"

export { Calendar }
