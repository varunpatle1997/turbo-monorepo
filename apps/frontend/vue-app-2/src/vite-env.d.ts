/// <reference types="vite/client" />

declare const __VITE_API_BASE_URL__: string;

declare module "*.vue" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}
