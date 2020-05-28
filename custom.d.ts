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

declare module "easing-functions" {
    const content: any;
    export default content
}

declare module "Loop" {
    const content: any;
    export default content
}

declare module "*.webp" {
    const content: any;
    export default content;
}

declare module "*.jpg" {
    const content: any;
    export default content;
}