import RouteArguments from "../router/RouteArguments";
import printArguments from "./printArguments";
import Router from "../router/Router";

function init(args: RouteArguments, label)
{
    let s = `
    <h1>`+label+`</h1>
    <a href="/">Home</a>
    <br/>
    <a href="/about">About</a>
    <br/>
    <a href="/config">Config</a>
    <br/>
    <a href="/projects">Projects</a>
    <br/>
    <a href="/users/1">User 1</a>
    <br/>
    <a href="/users/1/about">About user 1</a>
    <br/>
    <a href="/users/1/photos">Photos of user 1</a>
    <br/>
    <a href="/test#abc">Test /test#abc</a>
    <br/>
    <a href="/test?s=1">Test /test?s=1</a>
    <br/>
    <a href="/test?a=1&b=2">Test /test?a=1&b=2</a>
    <br/>
    <a href="/test?a=1&b=2#aaa">Test /test?a=1&b=2#aaa</a>
    <br/>
    <a href="/test#aaa?a=1&b=2">Test /test#aaa?a=1&b=2</a>
    <br/>
    <button id="push-route">Push route</button>
    <br/>
    <button id="replace-route">Replace route</button>
    <br/>
    `;

    document.body.innerHTML = s;

    printArguments(args);

    document.getElementById('push-route').onclick = () =>
    {
        let x;
        if(args.queryParameters['x'] === undefined)
            x = 1;
        else
            x = parseInt(args.queryParameters['x'])+1;

        Router.push("/test?x=" + x);
    };
    document.getElementById('replace-route').onclick = () =>
    {
        let x;
        if(args.queryParameters['x'] === undefined)
            x = 1;
        else
            x = parseInt(args.queryParameters['x'])+1;

        Router.replace("/test?x=" + x);
    };
}
export default init;
