export interface GenerateRequest {
  prompt: string;
}

export interface GenerateResponse {
  projectId: string;
  status: 'processing';
}

export interface ProjectSummary {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}
