import RouteArguments from "../router/RouteArguments";
import init from "./init";

/**
 * @author Germán Martínez
 */
function RouteUsersIdPhotos(args: RouteArguments)
{
    init(args, "Photos of user " + args.pathParameters['userId']);
}
export default RouteUsersIdPhotos;
