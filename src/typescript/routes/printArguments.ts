import RouteArguments from "../router/RouteArguments";

function printArguments(args: RouteArguments)
{
    let s ='';

    s += '<h3>Arguments</h3>';

    // Path
    s += 'Path: ' + args.path;
    s += '<br/>';
    s += '<br/>';

    // Path parts
    s += 'Path parts: ';
    s += '<br/>';
    args.pathParts.forEach((p) =>
    {
        s += '&nbsp&nbsp&nbsp&nbsp';
        s += p + '<br/>';
    });
    s += '<br/>';

    // Path parameters
    s += 'Path parameters: ';
    s += '<br/>';
    for(let key in args.pathParameters)
    {
        s += '&nbsp&nbsp&nbsp&nbsp';
        s += key;
        s += ': ';
        s += args.pathParameters[key];
        s += '<br/>';
    }
    s += '<br/>';

    // Hash
    s += 'Hash: ' + args.hash;
    s += '<br/>';
    s += '<br/>';

    // Query parameters
    s += 'Query parameters: ';
    s += '<br/>';
    for(let key in args.queryParameters)
    {
        s += '&nbsp&nbsp&nbsp&nbsp';
        s += key;
        s += ': ';
        s += args.queryParameters[key];
        s += '<br/>';
    }
    s += '<br/>';

    document.body.innerHTML += s;
}
export default printArguments;
