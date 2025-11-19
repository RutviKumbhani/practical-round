import axios from "axios";
import xml2js from "xml2js";

export async function fetchJobsFromUrl(url) {
  const { data: xml } = await axios.get(url);

  const json = await xml2js.parseStringPromise(xml, {
    explicitArray: false,
    mergeAttrs: true,
  });

  return json.rss.channel.item.map((job) => ({
    externalId: job.guid,
    title: job.title,
    link: job.link,
    description: job.description,
    category: job.category,
    pubDate: job.pubDate,
  }));
}
