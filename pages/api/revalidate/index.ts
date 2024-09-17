import { NextApiRequest, NextApiResponse } from "next";
import { createHandler } from "@/lib/api/handler";

const handler = createHandler();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.APP_ENV !== "test") {
    return res.status(401).json({ message: "endpoint only available for tests" })
  }

  if(req.query.secret !== process.env.REVALIDATION_SECRET){
    return res.status(401).json({ message: "invalid revalidation secret" })
  }
  
  //Revalidate pages that can have ISR data updates
  // revalidate on-demand
  await res.revalidate("/bands");
  await res.revalidate("/shows");
  return res.status(200).end();
});

export default handler;