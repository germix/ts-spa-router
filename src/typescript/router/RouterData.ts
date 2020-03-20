import Route from "./Route";
import RouteArguments from "./RouteArguments";

/**
 * @author Germán Martínez
 */
interface RouterData
{
    routes: {
        path: string;
        route: Route;
    }[]
    ,
    default: Route;
    postRoute(args: RouteArguments): void;
}
export default RouterData;
