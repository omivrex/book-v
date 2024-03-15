export type Notification = {
    type: "CREATE" | "UPDATE" | "DELETE";
    message: string;
    time: number;
};
