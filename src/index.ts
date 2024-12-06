import { ResponseBuilder, Kv } from "@fermyon/spin-sdk";

const encoder = new TextEncoder()
const decoder = new TextDecoder()

export async function handler(req: Request, res: ResponseBuilder) {
    console.log(req);
    
    // grab a querystring; this only handles one key/value
    let queryString = req.url.slice(req.url.indexOf("?")+1)
    let vals = queryString.split('=')
    console.log(vals)
    let store = Kv.openDefault()
    store.set(vals[0], vals[1])
    let myValue = store.get(vals[0]) ?? encoder.encode("nothing was returned from the kvstore")
    const byteA = myValue;
    const s = new TextDecoder().decode(byteA);
    console.log(s)
    res.send("hello universe from Azure CosmosDB using wasi:key-value with \"" + vals[0] + "\" and AKS Workload Identity" +  "...." + s  + " .....");
    
}

