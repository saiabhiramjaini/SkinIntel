import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ProcessStepProps {
  step: number;
  title: string;
  description: string;
}

export const ProcessStep: React.FC<ProcessStepProps> = ({ step, title, description }) => (
    <div className="relative">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full border-2 border-indigo-200">
        <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
          {step}
        </div>
      </div>
      <Card className="border border-slate-200 bg-white shadow-sm pt-8 h-full">
        <CardHeader>
          <CardTitle className="text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-slate-600">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
  