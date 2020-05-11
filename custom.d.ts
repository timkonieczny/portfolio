declare module "*.glsl" {
    const content: any;
    export default content;
}

declare module "*.php" {
    const content: any;
    export default content;
}

declare module "worker-loader!*" {
    class WebpackWorker extends Worker {
        constructor();
    }

    export default WebpackWorker;
}