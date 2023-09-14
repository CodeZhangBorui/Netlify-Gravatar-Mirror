/**
 *
 * @param {Request} request
 * @param {*} context
 */
export default async function (request) {
    if (request.method === "GET") {
        try {
            const url = await request.url;
            console.log("Request URL: ", url, ", proxied to: https://gravatar.com/avatar/" + url.split("/avatar/")[1]);
            const res = await fetch("https://gravatar.com/avatar/" + url.split("/avatar/")[1], {
                method: "GET",
            });
            const resp = new Response(
                await res.arrayBuffer(),
                {
                    status: 200,
                }
            );
            resp.headers.set("Access-Control-Allow-Origin", "*");
            resp.headers.set("Access-Control-Allow-Methods", "GET");
            resp.headers.set("Access-Control-Allow-Headers", "Content-Type");
            resp.headers.set("Access-Control-Max-Age", `${86400 * 30}`);
            return resp;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
    return new Response("Gravatar only supports GET requests!");
}