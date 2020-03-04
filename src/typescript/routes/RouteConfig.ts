import RouteArguments from "../router/RouteArguments";
import init from "./init";

/**
 * @author Germán Martínez
 */
function RouteConfig(args: RouteArguments)
{
    init(args, "Config");
}
export default RouteConfig;
