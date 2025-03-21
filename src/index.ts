import { ResponseBuilder, Kv } from "@fermyon/spin-sdk";

const encoder = new TextEncoder()
const decoder = new TextDecoder()

export async function handler(req: Request, res: ResponseBuilder) {
    res.headers.set("Content-Type", "text/html");
    res.headers.set("charset","utf-8");
    console.log(req);
    let store = Kv.openDefault()
    let status = 200
    let start = "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\"></head><body>"
    let body
    let end = "</body></html>"

    try {
      store = Kv.openDefault()
      store.getKeys()
    }
    catch (error){
        res.statusCode = 500
        res.send(start + "<H1>There was an error reaching the key value store.<H1>" + end)
    }

    // grab a querystring; this only handles one key/value
    if (req.url.indexOf("?") == -1){
      console.log("there's no querystring");
      res.send("No querystring values were found. Please enter a querystring with one key and one value.");
    }
    
    let queryString = req.url.slice(req.url.indexOf("?")+1)
    let byteA;
    let s;
    let vals = queryString.split('=')
    console.log(vals)
    store.set(vals[0], vals[1])
    let myValue = store.get(vals[0]) ?? encoder.encode("nothing was returned from the kvstore")
    byteA = myValue;
    s = new TextDecoder().decode(byteA);
    console.log(s)
  
    let allKeys = store.getKeys();
    let allKeyString = "<H1>Keys:</H1> "
    const byteList = allKeys;
    allKeys.forEach(element => {
        console.log(element);
        allKeyString += "<BR/>" + element;     
    });

    let allValuesString = "<H1>Values:</H1> " 
    allKeys.forEach(element => {
      console.log(element);
      let currentValue = store.get(element) ?? encoder.encode("nothing was returned from the kvstore");
      allValuesString += "<BR/>" + new TextDecoder().decode(currentValue);

    });

    console.log(allKeyString);
    body = start + "<H2>Hello universe from Azure CosmosDB with \"" 
      + vals[0] + "\" and AKS Workload Identity" +  " value \"" + s + "\"<br/><br/></h1><h3>" + allKeyString 
      + "</H3>" 
      + "<H3>"
      + allValuesString
      + "</H3>"
      + end;
    res.send(body);
    console.log(vals);
}

