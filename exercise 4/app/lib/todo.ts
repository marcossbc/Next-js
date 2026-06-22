import { ObjectId } from "mongodb";
import { Todo, UpdateTodo, CreateTodo } from "../types/todo";
import { GetTodoCollection } from "./db";

export async function fetchTodos(search?: string): Promise<Todo[]> {
  try {
    const collection = await GetTodoCollection();

    const pipeline: any[] = [];

    // SEARCH (only if exists)
    if (search && search.trim() !== "") {
      pipeline.push({
        $match: {
          title: {
            $regex: search,
            $options: "i",
          },
        },
      });
    }

    // PRIORITY CALC
    pipeline.push({
      $addFields: {
        priorityOrder: {
          $switch: {
            branches: [
              { case: { $eq: ["$priority", "high"] }, then: 3 },
              { case: { $eq: ["$priority", "medium"] }, then: 2 },
              { case: { $eq: ["$priority", "low"] }, then: 1 },
            ],
            default: 0,
          },
        },
      },
    });

    // SORT
    pipeline.push({
      $sort: {
        priorityOrder: -1,
        createdAt: -1,
      },
    });

    const todos = await collection.aggregate(pipeline).toArray();

    return todos.map((todo) => ({
      _id: todo._id.toString(),
      title: todo.title,
      completed: todo.completed,
      priority: todo.priority || "medium",
      createdAt: todo.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: todo.updatedAt?.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}

export async function fetchTodoById(id: string): Promise<Todo | null> {
  try {
    const collection = await GetTodoCollection();

    const todo = await collection.findOne({
      _id: new ObjectId(id),
    });

    if (!todo) {
      return null;
    }

    return {
      _id: todo._id.toString(),
      title: todo.title,
      completed: todo.completed,
      priority: todo.priority || "medium",
      createdAt: todo.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: todo.updatedAt?.toISOString(),
    } as Todo;
  } catch (error) {
    console.error("Error fetching todo by id:", error);

    return null;
  }
}

export async function createTodo(todo: CreateTodo): Promise<string | null> {
  try {
    const collection = await GetTodoCollection();

    const result = await collection.insertOne({
      title: todo.title,

      completed: false,

      priority: todo.priority ,

      createdAt: new Date(),

      updatedAt: new Date(),
    });

    return result.insertedId.toString();
  } catch (error) {
    console.error("Error creating todo:", error);

    return null;
  }
}

export async function updateTodo(
  id: string,
  todo: UpdateTodo,
): Promise<boolean> {
  try {
    const collection = await GetTodoCollection();

    const result = await collection.updateOne(
      {
        _id: new ObjectId(id),
      },

      {
        $set: {
          ...todo,
          updatedAt: new Date(),
        },
      },
    );

    return result.modifiedCount > 0;
  } catch (error) {
    console.error("Error updating todo:", error);

    return false;
  }
}

export async function deleteTodo(id: string): Promise<boolean> {
  try {
    const collection = await GetTodoCollection();

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    return result.deletedCount > 0;
  } catch (error) {
    console.error("Error deleting todo:", error);

    return false;
  }
}
