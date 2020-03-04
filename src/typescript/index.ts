import Router from "./router/Router";
import RouteArguments from "./router/RouteArguments";
import RouteHome from "./routes/RouteHome";
import RouteAbout from "./routes/RouteAbout";
import RouteConfig from "./routes/RouteConfig";
import RouteProjects from "./routes/RouteProjects";
import RouteUsers from "./routes/RouteUsers";
import RouteUsersId from "./routes/RouteUsersId";
import RouteUsersIdAbout from "./routes/RouteUsersIdAbout";
import RouteUsersIdPhotos from "./routes/RouteUsersIdPhotos";
import RouteTest from "./routes/RouteTest";
import RouteNotFound from "./routes/RouteNotFount";

import '../scss/styles.scss';

Router.init({
    routes: [
        {   path: '/',
            route: RouteHome,
        },
        {   path: '/about',
            route: RouteAbout,
        },
        {   path: '/config',
            route: RouteConfig,
        },
        {   path: '/projects',
            route: RouteProjects,
        },
        {   path: '/users',
            route: RouteUsers,
        },
        {   path: '/users/:userId',
            route: RouteUsersId,
        },
        {   path: '/users/:userId/about',
            route: RouteUsersIdAbout,
        },
        {   path: '/users/:userId/photos',
            route: RouteUsersIdPhotos,
        },
        {   path: '/test',
            route: RouteTest,
        },
    ],

    default: RouteNotFound,

    postRoute: function(args: RouteArguments)
    {
    }
});
