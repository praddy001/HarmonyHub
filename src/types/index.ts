export interface Module {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  colorLight: string;
  topics: Topic[];
  duration: string;
  units: number;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  enrolledModules: string[];
  progress: Record<string, number>;
}
