import { z } from "zod";
export declare const userSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
}, "strict", z.ZodTypeAny, {
    name: string;
    email: string;
}, {
    name: string;
    email: string;
}>;
export type User = z.infer<typeof userSchema>;
//# sourceMappingURL=users.d.ts.map