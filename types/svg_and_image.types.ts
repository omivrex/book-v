declare module "*.svg" {
    const content: any;
    export default content;
}
declare module "*.png" {
    const content: any;
    export default content;
}
declare module "*.jpg" {
    const content: any;
    export default content;
}
// Add the custom.d.ts to tsconfig.json as below
// "include": ["src/components", "src/custom.d.ts"]''
