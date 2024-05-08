import * as cheerio from "cheerio";
import { formatDateDE, trimWhitespace } from "./helper";

/**
 * Get the data of the latest events in the region
 * @param {Object} filter
 * @param {string} filter.fromDate
 * @param {string} filter.toDate
 * @param {number} filter.page
 * @returns {Promise<{
 *  id: number,
 *  name: string,
 *  description: string,
 *  date: string,
 *  time: string,
 *  place: string,
 *  imageLink: String
 * }[]>}
 */
export default async function fetchEvents(filter) {
  /** Handling the filter input */
  const fromDate = filter.fromDate || formatDateDE(new Date());
  const toDate = filter.toDate || formatDateDE(new Date());
  const page = filter.page || 0;
  const url = `https://www.mannheim.de/de/veranstaltungen?date_from=${fromDate}&date_to=${toDate}&sort_by=field_event_date&sort_order=ASC&page=${page}`;
  /** Fetching the web page */
  const response = await fetch(url);
  const htmlString = await response.text();
  /** Extracting the wanted data from the web page */
  return extractData(htmlString);
}

/**
 * This function extracts data from a given html string
 * @param {String} htmlString
 * @returns {{
 *  id: number,
 *  name: string,
 *  description: string,
 *  date: string,
 *  time: string,
 *  place: string,
 *  imageLink: String
 * }[]}
 */
function extractData(htmlString) {
  const $ = cheerio.load(htmlString);

  /** Searching for the event elements */
  const eventElements = $("ul.teaser-list").children("li");

  /** Return if no event could be found */
  if (eventElements.length === 0) {
    return [];
  }

  const parsedEvents = [];
  /** Iterate over each event element and extract data from it */
  eventElements.each((i, eventElement) => {
    const $eventElement = $(eventElement);

    /**
     * Unfortunately, the meta information is stored in a
     * list without a name for each element. Therefore, it is
     * iterated over the individual meta information tags
     * and it is assumed that the order of these is always the same.
     */
    const metaInfos = [];
    $eventElement
      .find("ul.teaser__meta")
      .children("li")
      .each((n, element) => {
        metaInfos.push(trimWhitespace($(element).text()));
      });

    /**
     * Creating a new event object and
     * adding it to the finished event objects
     */
    parsedEvents.push({
      id: i, // TODO Add a real ID using an index as an id is bad :(
      name: $eventElement?.find("h3")?.text(),
      description: $eventElement?.find("div.teaser__text p")?.text(),
      date: metaInfos?.[0] || "",
      time: metaInfos?.[1] || "",
      place: metaInfos?.[2] || "",
      imageLink: `https://www.mannheim.de/${$eventElement?.find("img")?.attr("src")}`,
    });
  });

  return parsedEvents;
}
