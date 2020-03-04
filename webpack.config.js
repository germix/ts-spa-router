const net = require('net');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function checkPort(port, callback)
{
    const check = () =>
    {
        const server = net.createServer().listen(port, 'localhost');
        server.on('listening', function()
        {
            server.close();
            callback(port);
        });
        server.on('error', err =>
        {
            if(err.code === 'EADDRINUSE')
            {
                port++;
                check();
            }
        });
    }
    check();
}

module.exports = (env, argv) =>
{
    const inProduction = 'production' === argv.mode;
    const params = {

        //
        // Mode
        //
        mode: inProduction ? 'production' : 'development',

        //
        // Devtool
        //
        devtool: inProduction ? 'source-source-map' : 'cheap-module-source-map',

        //
        // Entry
        //
        entry: './src/typescript/index.ts',

        //
        // Output
        //
        output:
        {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'public'),
        },

        //
        // Modules
        //
        module:
        {
            //
            // Rules
            //
            rules:
            [
                // Rule: Typescript
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                // Rule: Styles
                {
                    test: /\.css$/i,
                    use:
                    [
                        // Creates `style` nodes from JS strings
                        'style-loader',
                        // Translates CSS into CommonJS
                        'css-loader',
                    ],
                },
                // Rule: Styles
                {
                    test: /\.s[ac]ss$/i,
                    use:
                    [
                        // Creates `style` nodes from JS strings
                        'style-loader',
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                },
                            }
                        }
                    ],
                },
                // Other rules ...
            ],
        },

        //
        // Resolve
        //
        resolve:
        {
            extensions: [ '.ts', '.js' ],
        },

        //
        // Plugins
        //
        plugins : [
            
            new Dotenv({
                path: (inProduction ? './.env' : '.env.local'),
                safe: false,
                systemvars: true,
                silent: true,
                defaults: false
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'src/index.html',
                hash: true,
                inject: false,
                minify: {
                    removeComments: inProduction ? true : false,
                    collapseWhitespace: inProduction ? true : false,
                }
            }),
        ],

        //
        // Development server
        //
        devServer:
        {
            index : 'index.html',
            contentBase: path.resolve(__dirname, "public"),
            port: 7000,
            compress: true,
            historyApiFallback: true
        }
    };

    return new Promise((done, reject) =>
    {
        checkPort(params.devServer.port, (serverPort) =>
        {
            params.devServer.port = serverPort;
            done(params);
        });
    });
}
