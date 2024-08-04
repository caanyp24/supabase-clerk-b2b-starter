import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function OnboardingPage() {
  return (
    <div>
      <Card className="w-[680px]">
        <CardHeader>
          <CardTitle>Onboarding</CardTitle>
          <CardDescription>
            Complete the onboarding process to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm font-medium">Company Name</p>
          <Input />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Complete</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
