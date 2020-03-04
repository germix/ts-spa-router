import RouteArguments from "../router/RouteArguments";
import init from "./init";

/**
 * @author Germán Martínez
 */
function RouteUsersId(args: RouteArguments)
{
    init(args, "User: " + args.pathParameters['userId']);
}
export default RouteUsersId;
