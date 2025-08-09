import TerserPlugin from 'terser-webpack-plugin';
import process from 'process';

export default {
    entry: './src/client/index.js',
    output: {
        filename: '1f3683f88c67cc62729d1b56caefd50b.js',
        path: process.cwd() + '/public',
    },
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                compress: true,
                mangle: true,
            },
        })],
    },
};
