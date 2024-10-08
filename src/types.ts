export type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "in-progress" | "completed";
};
