export type Todo ={
    _id: string;
    completed: boolean;
    title: string;
    priority: "low" | "medium" | "high";
    createdAt: Date;
    updatedAt?: Date;


}

export type CreateTodo = {
    title: string;
    completed?: boolean;
    priority?: "low" | "medium" | "high";
};

export type UpdateTodo = {
    title?: string;
    completed?: boolean;
    priority?: "low" | "medium" | "high";
}

export type DeleteTodo = {  
    _id: string;
}

export type BulkAction = {
  ids: string[];
};