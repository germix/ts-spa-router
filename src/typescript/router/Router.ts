import RouterData from "./RouterData";
import RouteArguments from "./RouteArguments";
import Route from "./Route";

/**
 * @author Germán Martínez
 */
class Router
{
    private static www: string = window.location.protocol + '//' + window.location.host;
    private static data: RouterData;

    /**
     * Initialize router.
     * 
     * @param data Router initialization parameters
     */
    public static init(data: RouterData)
    {
        document.addEventListener('click', (event) =>
        {
            const elem = <Element>event.target;

            if(elem.matches('a'))
            {
                const href = elem.getAttribute('href');

                if(href.length > 0 && (href[0] === '/' || href[0] === '#' || href[0] === '?'))
                {
                    event.preventDefault();
                    this.push(href);
                }
            }
        }, false);

        window.onpopstate = (event) =>
        {
            if(event.state === null)
            {
                this.replace('/');
            }
            else
            {
                this.replace(event.state.url);
            }
        };
        this.data = data;

        this.replace(window.location.href.replace(this.www, ''));
    }

    /**
     * Push a new route.
     * 
     * @param url Route url
     */
    public static push(url: string)
    {
        this.execUrl(url, true);
    }

    /**
     * Replace the current route.
     * 
     * @param url Route url
     */
    public static replace(url: string)
    {
        this.execUrl(url, false);
    }

    private static execUrl(url: string, push: boolean)
    {
        if(!(url.length > 0 && (url[0] === '/' || url[0] === '#' || url[0] === '?')))
        {
            return;
        }

        let data;
        let redirectTo;

        do
        {
            // Parse
            data = this.parseUrl(url);

            // Call route
            redirectTo = this.findAndCallRoute(data);

            if(redirectTo != null)
                url = redirectTo;
        }
        while(null != redirectTo);

        if(this.data.postRoute !== null)
        {
            this.data.postRoute(data);
        }

        if(push)
            window.history.pushState({ url }, "", url);
        else
            window.history.replaceState({ url }, "", url);
    }

    private static parseUrl(url: string) : RouteArguments
    {
        let pathPos = 0;
        let hashStart = url.indexOf('#');
        let queryStart = url.indexOf('?');

        //
        // Path component
        //
        let pathEnd = url.length;
        if(hashStart !== -1 && hashStart < pathEnd) pathEnd = hashStart;
        if(queryStart !== -1 && queryStart < pathEnd) pathEnd = queryStart;

        let path = url.substr(pathPos, pathEnd);
        if(path !== '' && path[path.length-1] == '/')
        {
            path = path.substring(pathPos, url.length-1);
        }

        //
        // Hash component
        //
        let hash = '';
        if(hashStart !== -1)
        {
            if(hashStart < queryStart)
                queryStart = -1;
            hash = url.substr(hashStart+1, url.length);
        }

        //
        // Query component
        //
        let query = '';
        let queryParameters = [];
        if(queryStart !== -1)
        {
            let queryEnd = url.length;
            if(hashStart !== -1)
                queryEnd = hashStart;

            query = url.substring(queryStart+1, queryEnd);

            let splits = query.split('&');

            for(let i = 0; i < splits.length; i++)
            {
                let q = splits[i];
                let s = q.split('=');
                let name = s[0];
                let value = s[1];

                queryParameters[name] = value;
            }
        }

        return {
            path: path,
            hash: hash,
            pathParts: path.split('/').filter(function(el)
            {
                return el != null && el != '';
            }),
            pathParameters: [],
            queryParameters: queryParameters,
        };
    }

    private static runRoute(route: Route, args: RouteArguments)
    {
        let newPath: any = route(args);
        if((typeof newPath === 'string') || (newPath instanceof String))
        {
            return newPath;
        }
        return null;
    }

    private static findAndCallRoute(args: RouteArguments)
    {
        for(let i = 0; i < this.data.routes.length; i++)
        {
            var found = true;
            let parts = this.data.routes[i].path.split('/').filter(function(el)
            {
                return el != null && el != '';
            });

            if(args.pathParts.length !== parts.length)
            {
                found = false;
            }
            else
            {
                for(let k = 0; k < args.pathParts.length; k++)
                {
                    if(parts[k][0] == ':')
                    {
                        let key = parts[k].substr(1);
                        let value = args.pathParts[k];

                        args.pathParameters[key] = value;
                    }
                    else if(args.pathParts[k] !== parts[k])
                    {
                        found = false;
                    }
                }
            }
            if(found)
            {
                return this.runRoute(this.data.routes[i].route, args);
            }
        }
        if(this.data.default !== null)
        {
            return this.runRoute(this.data.default, args);
        }
        return null;
    }
}
export default Router;
