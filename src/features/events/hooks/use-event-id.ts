import { useParams } from "next/navigation"
import { Id } from "../../../../convex/_generated/dataModel"

export const useEventId = () => {
    const params = useParams()
    return params.eventId as Id<"events">
}