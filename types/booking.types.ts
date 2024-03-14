export interface Availability {
    name: string;
    height: number;
    day: string;
    from: number;
    to: number;
    description?: string;
}

export interface Availabilities {
    [date: string]: Availability[];
}
