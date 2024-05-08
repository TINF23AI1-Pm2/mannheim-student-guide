import { useEffect, useState } from "react";
import fetchEvents from "./fetchEvents";

/**
 * Abstracts the loading state logic of
 * fetching for the latest events in the region
 * @returns {{events: any[], loading: boolean, setFilter: Function}}
 */
export default function useEventsInMannheim() {
  const [events, setEvents] = useState();
  const [filter, setFilter] = useState({});

  useEffect(() => {
    const fetchNewEvents = async () => {
      const newEventData = await fetchEvents(filter);
      setEvents(newEventData);
    };

    setEvents(undefined);
    fetchNewEvents();
  }, [filter]);

  return { events, loading: events === undefined, setFilter };
}
