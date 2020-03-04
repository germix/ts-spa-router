/**
 * @author Germán Martínez
 */
interface RouteArguments
{
    path: string,
    hash: string,
    pathParts: any[],
    pathParameters: any[],
    queryParameters: any[],
}
export default RouteArguments;
