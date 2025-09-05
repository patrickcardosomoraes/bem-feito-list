import { useState } from "react";
import { Plus, Check, Trash2, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();

  const addTodo = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Ops!",
        description: "Digite algo para adicionar uma tarefa.",
        variant: "destructive",
      });
      return;
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date(),
    };

    setTodos([newTodo, ...todos]);
    setInputValue("");
    toast({
      title: "Tarefa adicionada!",
      description: "Nova tarefa criada com sucesso.",
    });
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast({
      title: "Tarefa removida",
      description: "A tarefa foi excluída com sucesso.",
    });
  };

  const pendingTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="min-h-screen bg-gradient-secondary py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
              <CheckSquare className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              MinhasTarefas
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Organize suas tarefas de forma simples e eficiente
          </p>
        </div>

        {/* Add Todo Form */}
        <Card className="p-6 mb-8 shadow-card border-0 bg-card/80 backdrop-blur-sm">
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Adicione uma nova tarefa..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTodo()}
              className="flex-1 border-border/50 focus:border-primary bg-background/50"
            />
            <Button 
              onClick={addTodo}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 px-6"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </Card>

        {/* Stats */}
        {todos.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="p-4 text-center border-0 bg-accent/50">
              <div className="text-2xl font-bold text-primary">{pendingTodos.length}</div>
              <div className="text-sm text-muted-foreground">Pendentes</div>
            </Card>
            <Card className="p-4 text-center border-0 bg-success/10">
              <div className="text-2xl font-bold text-success">{completedTodos.length}</div>
              <div className="text-sm text-muted-foreground">Concluídas</div>
            </Card>
          </div>
        )}

        {/* Todo Lists */}
        <div className="space-y-6">
          {/* Pending Todos */}
          {pendingTodos.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                Tarefas Pendentes
              </h2>
              <div className="space-y-3">
                {pendingTodos.map((todo) => (
                  <Card 
                    key={todo.id} 
                    className="p-4 border-0 bg-card shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in"
                  >
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleTodo(todo.id)}
                        className="w-8 h-8 p-0 rounded-full border-border hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-200"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <span className="flex-1 text-foreground">{todo.text}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTodo(todo.id)}
                        className="w-8 h-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Completed Todos */}
          {completedTodos.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                Tarefas Concluídas
              </h2>
              <div className="space-y-3">
                {completedTodos.map((todo) => (
                  <Card 
                    key={todo.id} 
                    className="p-4 border-0 bg-card/50 shadow-card opacity-75 animate-fade-in"
                  >
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleTodo(todo.id)}
                        className="w-8 h-8 p-0 rounded-full bg-success border-success text-success-foreground hover:bg-success/80"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <span className="flex-1 text-muted-foreground line-through">
                        {todo.text}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTodo(todo.id)}
                        className="w-8 h-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {todos.length === 0 && (
            <Card className="p-12 text-center border-0 bg-card/50">
              <CheckSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Nenhuma tarefa ainda
              </h3>
              <p className="text-muted-foreground">
                Comece adicionando sua primeira tarefa acima!
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}