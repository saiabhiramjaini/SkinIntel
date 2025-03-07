import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

import { FC } from "react";

interface FeatureCardProps {
  icon: FC<{ className?: string }>;
  title: string;
  description: string;
  content: string;
}

export const FeatureCard: FC<FeatureCardProps> = ({ icon: Icon, title, description, content }) => (
    <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600">{content}</p>
      </CardContent>
    </Card>
  );
  