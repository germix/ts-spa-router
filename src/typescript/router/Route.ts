import RouteArguments from "./RouteArguments";

/**
 * @author Germán Martínez
 */
interface Route
{
    (args: RouteArguments) : void;
}
export default Route;
