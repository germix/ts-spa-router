import Route from "./Route";

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
    postRoute(path): void;
}
export default RouterData;
