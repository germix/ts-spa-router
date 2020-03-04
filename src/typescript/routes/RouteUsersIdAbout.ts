import RouteArguments from "../router/RouteArguments";
import init from "./init";

/**
 * @author Germán Martínez
 */
function RouteUsersIdAbout(args: RouteArguments)
{
    init(args, "About user " + args.pathParameters['userId']);
}
export default RouteUsersIdAbout;
