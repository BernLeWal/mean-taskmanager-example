import * as mongodb from "mongodb";

export interface Task {
    name: string;
    category: string;
    state: "open" | "busy" | "done";
    _id?: mongodb.ObjectId;
}