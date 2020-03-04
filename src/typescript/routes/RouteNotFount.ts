import RouteArguments from "../router/RouteArguments";
import printArguments from "./printArguments";

/**
 * @author Germán Martínez
 */
function RouteNotFound(args: RouteArguments)
{
    document.body.innerHTML = 'NOT FOUND';

    printArguments(args);
}
export default RouteNotFound;
