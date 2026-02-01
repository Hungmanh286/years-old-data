export type NavigateFunction = (page: string) => void;

export interface PageProps {
  onNavigate: NavigateFunction;
}
