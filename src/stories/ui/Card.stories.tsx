import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card, CardTitle, CardDescription, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '../Button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area where you can place any content.</p>
      </CardContent>
      <CardFooter>
        <Button label="Action" />
      </CardFooter>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-[300px] p-6">
      <h3 className="text-lg font-semibold">Simple Card</h3>
      <p className="text-sm text-muted-foreground mt-2">
        A simple card without separate header/content sections.
      </p>
    </Card>
  ),
};

export const WithoutFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>No Footer Card</CardTitle>
        <CardDescription>This card doesn't have a footer section</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content without footer actions.</p>
      </CardContent>
    </Card>
  ),
};