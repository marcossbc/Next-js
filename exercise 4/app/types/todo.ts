export type Todo ={
    _id: string;
    completed: boolean;
    title: string;
    createdAt: Date;
    updatedAt?: Date;


}

export type CreateTodo = {
    title: string;
    completed?: boolean;
};

export type UpdateTodo = {
    title?: string;
    completed?: boolean;
}

export type DeleteTodo = {  
    _id: string;
}